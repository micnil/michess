import { BotInfoV1, GameDetailsV1 } from '@michess/api-schema';
import { logger } from '@michess/be-utils';
import { assertDefined } from '@michess/common-utils';
import {
  Chessboard,
  FenParser,
  FenStr,
  Move,
  MoveOption,
} from '@michess/core-board';
import {
  CacheRepository,
  GameRepository,
  UserRepository,
} from '@michess/infra-db';
import { Job, Queue, Worker } from 'bullmq';
import { GameplayService } from '../../games/service/GameplayService';
import { LlmConfig } from '../../llm/config/LlmConfig';
import { LlmClientFactory } from '../../llm/service/LlmClientFactory';
import { BotRegistry } from '../config/BotRegistry';

type BotMoveJobData = {
  gameId: string;
  botId: string;
};

export class BotService {
  private unsubscribe?: () => void;
  private botMoveQueue: Queue<BotMoveJobData>;
  private botMoveWorker: Worker<BotMoveJobData>;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
    private readonly gameplayService: GameplayService,
    private readonly cacheRepository: CacheRepository,
    private readonly llmConfig: LlmConfig,
  ) {
    const connectionOptions = { connection: this.cacheRepository.client };

    this.botMoveQueue = new Queue(`bot-move`, connectionOptions);
    this.botMoveWorker = new Worker<BotMoveJobData>(
      `bot-move`,
      this.processBotMove.bind(this),
      connectionOptions,
    );
  }

  async initialize(): Promise<void> {
    logger.info('Initializing bot users...');

    const bots = BotRegistry.index();

    for (const bot of bots) {
      const existingUser = await this.userRepository.findUserById(bot.id);

      if (!existingUser) {
        await this.userRepository.createUser({
          id: bot.id,
          name: bot.name,
          username: bot.username,
          email: `${bot.username}@bot.michess.com`,
          emailVerified: true,
          role: 'bot',
          isAnonymous: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        logger.info({ botId: bot.id, botName: bot.name }, 'Bot user created');
      } else {
        await this.userRepository.updateUser(bot.id, {
          id: bot.id,
          name: bot.name,
          username: bot.username,
          email: `${bot.username}@bot.michess.com`,
          emailVerified: true,
          role: 'bot',
          isAnonymous: false,
          updatedAt: new Date(),
        });

        logger.debug({ botId: bot.id }, 'Bot user already exists, updated');
      }
    }

    logger.info({ count: bots.length }, 'Bot initialization complete');

    this.unsubscribe = this.gameplayService.subscribe(
      (event) => {
        this.handleGameUpdate(event.data).catch((err) => {
          logger.error({ error: err }, 'Error in bot move handler');
        });
      },
      ['move_made', 'game_joined'],
    );
  }

  async close(): Promise<void> {
    logger.info('Closing bot service');
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    await this.botMoveQueue.close();
    await this.botMoveWorker.close();
  }

  async listBots(): Promise<BotInfoV1[]> {
    const botUsers = await this.userRepository.listBots();

    return botUsers.map((botUser) => {
      const botConfig = BotRegistry.get(botUser.id);

      return {
        id: botUser.id,
        name: botUser.name,
        username: botUser.username ?? botUser.id,
        description: botConfig?.description ?? '',
      };
    });
  }

  async handleGameUpdate(gameDetails: GameDetailsV1): Promise<void> {
    if (
      gameDetails.status !== 'IN_PROGRESS' &&
      gameDetails.status !== 'READY'
    ) {
      return;
    }

    const chessboard = Chessboard.fromPosition(
      FenParser.toChessPosition(
        gameDetails.initialPosition ?? FenStr.standardInitial(),
      ),
      gameDetails.moves.map((m) => Move.fromUci(m.uci)),
    );
    const currentPlayer = gameDetails.players[chessboard.position.turn];

    if (!currentPlayer || !currentPlayer.isBot) {
      return;
    }

    logger.info(
      {
        gameId: gameDetails.id,
        botId: currentPlayer.id,
        botName: currentPlayer.name,
      },
      'Bot turn detected, queuing move generation',
    );

    // Queue the bot move job
    await this.botMoveQueue.add('generate-move', {
      gameId: gameDetails.id,
      botId: currentPlayer.id,
    });
  }

  private async processBotMove(job: Job<BotMoveJobData>): Promise<void> {
    const { gameId, botId } = job.data;

    logger.info(
      {
        gameId,
        botId,
        jobId: job.id,
      },
      'Processing bot move job',
    );

    try {
      await this.playBotMove(gameId, botId);
    } catch (error) {
      logger.error(
        {
          err: error,
          gameId,
          botId,
          jobId: job.id,
        },
        'Failed to generate bot move',
      );
      throw error;
    }
  }

  private async playBotMove(gameId: string, botId: string): Promise<void> {
    const botConfig = BotRegistry.get(botId);
    if (!botConfig) {
      throw new Error(`Bot configuration not found for bot ${botId}`);
    }

    // Load game from database
    const game = await this.gameRepository.findGameWithRelationsById(gameId);
    assertDefined(game, `Game ${gameId} not found`);

    // Build chessboard from game state
    const moves = game.moves.map((m) => Move.fromUci(m.uci));
    const initialPosition = FenParser.toChessPosition(FenStr.standardInitial());

    const chessboard = Chessboard.fromPosition(initialPosition, moves);

    // Get available move options
    const moveOptions = chessboard.moveOptions;

    if (moveOptions.length === 0) {
      throw new Error('No legal moves available');
    }

    const llmClient = LlmClientFactory.create(
      botConfig,
      this.llmConfig.geminiApiKey,
    );

    // Get FEN position for compact representation
    const fen = FenParser.toFenStr(chessboard.position);

    // Format available moves for the LLM
    const availableMoves = moveOptions
      .map((opt) => Move.toUci(MoveOption.toMove(opt)))
      .join(' ');

    const systemPrompt = `You are a chess AI. Respond with only a single UCI move from the legal moves list. No explanation.`;

    const userPrompt = `Position: ${fen}
Legal moves: ${availableMoves}
Move:`;

    const response = await llmClient.generateResponse({
      systemPrompt,
      userPrompt,
      temperature: botConfig.temperature,
    });

    logger.info(
      {
        gameId,
        botId,
        response: {
          finishReason: response.finishReason,
          content: response.content,
          contentLength: response.content?.length,
        },
      },
      'LLM response received',
    );

    if (response.finishReason === 'error' || !response.content.trim()) {
      logger.error(
        {
          gameId,
          botId,
          finishReason: response.finishReason,
          content: response.content,
        },
        'LLM failed to generate a valid response',
      );
      throw new Error('LLM failed to generate a valid response');
    }

    // Extract UCI move from response (take first word, clean it up)
    const uciMove = response.content.trim().split(/\s+/)[0].toLowerCase();

    // Validate that the move is in the available moves
    const isValidMove = moveOptions.some(
      (opt) => Move.toUci(MoveOption.toMove(opt)) === uciMove,
    );

    if (!isValidMove) {
      logger.warn(
        {
          gameId,
          botId,
          suggestedMove: uciMove,
          availableMoves,
        },
        'LLM suggested invalid move, choosing random legal move',
      );
      // Fallback to random legal move
      const randomMove =
        moveOptions[Math.floor(Math.random() * moveOptions.length)];
      const fallbackUci = Move.toUci(MoveOption.toMove(randomMove));

      await this.gameplayService.makeMove(botId, {
        gameId,
        uci: fallbackUci,
      });
      return;
    }

    logger.info(
      {
        gameId,
        botId,
        uciMove,
      },
      'Bot generated move',
    );

    // Make the move through GameplayService
    await this.gameplayService.makeMove(botId, {
      gameId,
      uci: uciMove,
    });
  }
}
