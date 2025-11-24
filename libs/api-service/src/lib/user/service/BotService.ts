import { BotInfoV1, GameDetailsV1 } from '@michess/api-schema';
import { logger } from '@michess/be-utils';
import { Chessboard, FenParser, FenStr, Move } from '@michess/core-board';
import { UserRepository } from '@michess/infra-db';
import { GameplayService } from '../../games/service/GameplayService';
import { LlmConfig } from '../../llm/config/LlmConfig';
import { LlmClientFactory } from '../../llm/service/LlmClientFactory';
import { BotRegistry } from '../config/BotRegistry';

export class BotService {
  private unsubscribe?: () => void;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly gameplayService: GameplayService,
    private readonly llmConfig: LlmConfig,
  ) {}

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
      'Bot turn detected, generating move',
    );

    try {
      await this.generateBotMove(gameDetails, currentPlayer.id);
    } catch (error) {
      logger.error(
        {
          error,
          gameId: gameDetails.id,
          botId: currentPlayer.id,
        },
        'Failed to generate bot move',
      );
    }
  }

  private async generateBotMove(
    gameDetails: GameDetailsV1,
    botId: string,
  ): Promise<void> {
    const botConfig = BotRegistry.get(botId);
    if (!botConfig) {
      throw new Error(`Bot configuration not found for bot ${botId}`);
    }

    const llmClient = LlmClientFactory.create(
      botConfig,
      this.llmConfig.geminiApiKey,
    );

    // Format the game state for the LLM
    const moveHistory =
      gameDetails.moves.length > 0
        ? gameDetails.moves.map((m) => m.uci).join(' ')
        : 'none';

    const systemPrompt = `You are a chess-playing AI with the following personality:
${botConfig.personality}

You must respond with ONLY a single UCI move notation (e.g., "e2e4", "e7e8q" for promotion).
Do not include any explanation, analysis, or additional text.`;

    const userPrompt = `Current position (moves from start): ${moveHistory}
Your color: ${gameDetails.moves.length % 2 === 0 ? 'white' : 'black'}
Choose your next move in UCI notation:`;

    const response = await llmClient.generateResponse({
      systemPrompt,
      userPrompt,
      temperature: botConfig.temperature,
    });

    if (response.finishReason === 'error' || !response.content.trim()) {
      throw new Error('LLM failed to generate a valid response');
    }

    // Extract UCI move from response (take first word, clean it up)
    const uciMove = response.content.trim().split(/\s+/)[0].toLowerCase();

    logger.info(
      {
        gameId: gameDetails.id,
        botId,
        uciMove,
      },
      'Bot generated move',
    );

    // Make the move through GameplayService
    await this.gameplayService.makeMove(botId, {
      gameId: gameDetails.id,
      uci: uciMove,
    });
  }
}
