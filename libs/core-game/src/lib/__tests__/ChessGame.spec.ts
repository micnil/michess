import { Color, createChessPositionMock, FenParser } from '@michess/core-board';
import { ChessGame } from '../ChessGame';
import { GameStateMock } from '../model/__mocks__/GameState.mock';
import { ChessGameResultType } from '../model/ChessGameResultType';
import { GameStatusType } from '../model/GameStatusType';

describe('ChessGame', () => {
  describe('getAdditionalActions', () => {
    it('should return three-fold repetition action when applicable', () => {
      const chessGame = ChessGame.fromGameState(GameStateMock.fromPartial());

      expect(
        chessGame
          .getAdditionalActions()
          .filter(
            (action) =>
              action.type === 'accept_draw' &&
              action.reason === 'threefold_repetition'
          )
      ).toHaveLength(0);

      // Bongcloud draw (magnus - hikaru game).
      const almostThreeFoldRepetition = chessGame
        .play('player1', {
          from: 'e2',
          to: 'e4',
        })
        .play('player2', {
          from: 'e7',
          to: 'e5',
        })
        .play('player1', {
          from: 'e1',
          to: 'e2',
        })
        // 1st occurance below
        .play('player2', {
          from: 'e8',
          to: 'e7',
        })
        .play('player1', {
          from: 'e2',
          to: 'e1',
        })
        .play('player2', {
          from: 'e7',
          to: 'e8',
        })
        .play('player1', {
          from: 'e1',
          to: 'e2',
        })
        // 2nd occurance below
        .play('player2', {
          from: 'e8',
          to: 'e7',
        })
        .play('player1', {
          from: 'e2',
          to: 'e1',
        })
        .play('player2', {
          from: 'e7',
          to: 'e8',
        });

      expect(
        almostThreeFoldRepetition
          .getAdditionalActions()
          .filter(
            (action) =>
              action.type === 'accept_draw' &&
              action.reason === 'threefold_repetition'
          )
      ).toHaveLength(0);

      const threeFoldRepetitionGame = almostThreeFoldRepetition
        .play('player1', {
          from: 'e1',
          to: 'e2',
        })
        // 3rd occurance below
        .play('player2', {
          from: 'e8',
          to: 'e7',
        });

      const acceptDrawAction = threeFoldRepetitionGame
        .getAdditionalActions()
        .filter(
          (action) =>
            action.type === 'accept_draw' &&
            action.reason === 'threefold_repetition'
        )[0];

      expect(acceptDrawAction).toBeDefined();

      expect(threeFoldRepetitionGame.getState().result).toBeUndefined();
      const drawnGame = threeFoldRepetitionGame.makeAction(
        'player1',
        acceptDrawAction
      );
      expect(drawnGame.getState().result?.type).toEqual('draw');
    });

    it('should return standard actions when no special conditions are met', () => {
      const position = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e3: { color: 'white', type: 'q' },
        },
        turn: 'white',
      });

      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: position,
          status: 'IN_PROGRESS',
        })
      );
      const actions = chessGame.getAdditionalActions();

      // Should always include offer draw and resign options
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'offer_draw' }),
          expect.objectContaining({ type: 'resign' }),
        ])
      );
    });

    it('should return empty array when game is finished', () => {
      const position = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      const chessGame = ChessGame.fromChessPosition(position).setResult({
        type: 'white_win',
      });

      const actions = chessGame.getAdditionalActions();
      expect(actions).toEqual([]);
    });
  });

  describe('joinGame', () => {
    it('should allow a player to join as white when white slot is empty', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = { id: 'player1', name: 'Player One' };

      const gameWithPlayer = chessGame.joinGame(playerInfo, Color.White);
      const gameState = gameWithPlayer.getState();

      expect(gameState.players.white).toEqual(playerInfo);
      expect(gameState.players.black).toBeUndefined();
      expect(gameState.status).toBe('WAITING');
    });

    it('should allow a player to join as black when black slot is empty', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = { id: 'player1', name: 'Player One' };

      const gameWithPlayer = chessGame.joinGame(playerInfo, Color.Black);
      const gameState = gameWithPlayer.getState();

      expect(gameState.players.black).toEqual(playerInfo);
      expect(gameState.players.white).toBeUndefined();
      expect(gameState.status).toBe('WAITING');
    });

    it('should assign a random available side when no side is specified', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = { id: 'player1', name: 'Player One' };

      const gameWithPlayer = chessGame.joinGame(playerInfo);
      const gameState = gameWithPlayer.getState();

      // Should have assigned the player to either white or black
      const hasWhite = gameState.players.white?.id === playerInfo.id;
      const hasBlack = gameState.players.black?.id === playerInfo.id;
      expect(hasWhite || hasBlack).toBe(true);
      expect(gameState.status).toBe('WAITING');
    });

    it('should set status to READY when both players have joined', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const player1 = { id: 'player1', name: 'Player One' };
      const player2 = { id: 'player2', name: 'Player Two' };

      const gameWithPlayer1 = chessGame.joinGame(player1, Color.White);
      const gameWithBothPlayers = gameWithPlayer1.joinGame(
        player2,
        Color.Black
      );
      const gameState = gameWithBothPlayers.getState();

      expect(gameState.players.white).toEqual(player1);
      expect(gameState.players.black).toEqual(player2);
      expect(gameState.status).toBe('READY');
    });

    it('should throw error when trying to join a side that is already taken', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const player1 = { id: 'player1', name: 'Player One' };
      const player2 = { id: 'player2', name: 'Player Two' };

      const gameWithPlayer1 = chessGame.joinGame(player1, Color.White);

      expect(() => {
        gameWithPlayer1.joinGame(player2, Color.White);
      }).toThrow('Invalid side or side already taken');
    });

    it('should throw error when trying to join a game where all sides are taken', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const player1 = { id: 'player1', name: 'Player One' };
      const player2 = { id: 'player2', name: 'Player Two' };
      const player3 = { id: 'player3', name: 'Player Three' };

      const gameWithPlayer1 = chessGame.joinGame(player1, Color.White);
      const gameWithBothPlayers = gameWithPlayer1.joinGame(
        player2,
        Color.Black
      );

      expect(() => {
        gameWithBothPlayers.joinGame(player3);
      }).toThrow('Invalid side or side already taken');
    });

    it('should preserve existing game state when a player joins', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = { id: 'player1', name: 'Player One' };

      const gameWithPlayer = chessGame.joinGame(playerInfo, Color.White);

      expect(gameWithPlayer.getPosition()).toEqual(chessGame.getPosition());
      expect(gameWithPlayer.getState().movesRecord).toEqual(
        chessGame.getState().movesRecord
      );
      expect(gameWithPlayer.getState().result).toEqual(
        chessGame.getState().result
      );
    });
  });

  describe('play', () => {
    it('should set the result to checkmate when a move results in checkmate', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1'
          ),
          players: {
            white: { id: 'player1', name: 'Player One' },
            black: { id: 'player2', name: 'Player Two' },
          },
          status: 'IN_PROGRESS',
        })
      );

      expect(chessGame.getState().result).toBeUndefined();

      // Scholars mate
      const updatedGame = chessGame.play('player1', {
        from: 'f3',
        to: 'f7',
        promotion: undefined,
      });

      const gameState = updatedGame.getState();
      expect(gameState.result).toBeDefined();
      expect(gameState.result?.type).toBe('white_win');
    });

    it('should set the result to draw when a move results in stalemate', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            '3k4/5K2/8/8/8/8/6Q1/8 w - - 0 1'
          ),
          players: {
            white: { id: 'player1', name: 'Player One' },
            black: { id: 'player2', name: 'Player Two' },
          },
          status: 'IN_PROGRESS',
        })
      );

      expect(chessGame.getState().result).toBeUndefined();

      // Scholars mate
      const updatedGame = chessGame.play('player1', {
        from: 'g2',
        to: 'b7',
        promotion: undefined,
      });

      const gameState = updatedGame.getState();
      expect(gameState.result).toBeDefined();
      expect(gameState.result?.type).toBe<ChessGameResultType>('draw');
      expect(gameState.status).toBe<GameStatusType>('ENDED');
    });
  });
});
