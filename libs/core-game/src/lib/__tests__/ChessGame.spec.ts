import { Color, createChessPositionMock, FenParser } from '@michess/core-board';
import { ChessGame } from '../ChessGame';
import { GameStateMock } from '../model/__mocks__/GameState.mock';
import { PlayerInfoMock } from '../model/__mocks__/PlayerInfo.mock';
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
              action.reason === 'threefold_repetition',
          ),
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
              action.reason === 'threefold_repetition',
          ),
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
            action.reason === 'threefold_repetition',
        )[0];

      expect(acceptDrawAction).toBeDefined();

      expect(threeFoldRepetitionGame.getState().result).toBeUndefined();
      const drawnGame = threeFoldRepetitionGame.makeAction(
        'player1',
        acceptDrawAction,
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
        }),
      );
      const actions = chessGame.getAdditionalActions();

      // Should always include offer draw and resign options
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'offer_draw' }),
          expect.objectContaining({ type: 'resign' }),
        ]),
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
        timestamp: Date.now(),
      });

      const actions = chessGame.getAdditionalActions();
      expect(actions).toEqual([]);
    });
  });

  describe('makeAction', () => {
    it('should calculate rating diffs when game ends by resignation', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
              rating: {
                id: 2,
                value: 1600,
                deviation: 180,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
          },
          status: 'IN_PROGRESS',
        }),
      );

      const updatedGame = chessGame.makeAction('player2', { type: 'resign' });

      const whitePlayer = updatedGame.getState().players.white;
      const blackPlayer = updatedGame.getState().players.black;

      expect(whitePlayer?.ratingDiff).toBeDefined();
      expect(blackPlayer?.ratingDiff).toBeDefined();
      expect(whitePlayer?.ratingDiff).toBeGreaterThan(0); // Winner gains rating
      expect(blackPlayer?.ratingDiff).toBeLessThan(0); // Loser loses rating
    });

    it('should calculate equal rating diffs for draw by agreement', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
              rating: {
                id: 2,
                value: 1600,
                deviation: 180,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
          },
          status: 'IN_PROGRESS',
        }),
      );

      // White offers draw
      const gameWithOffer = chessGame.makeAction('player1', {
        type: 'offer_draw',
      });

      // Black accepts
      const drawnGame = gameWithOffer.makeAction('player2', {
        type: 'accept_draw',
      });

      const whitePlayer = drawnGame.getState().players.white;
      const blackPlayer = drawnGame.getState().players.black;

      expect(whitePlayer?.ratingDiff).toBeDefined();
      expect(blackPlayer?.ratingDiff).toBeDefined();
      // In a draw, lower rated player gains, higher rated loses
      expect(whitePlayer?.ratingDiff).toBeGreaterThan(0);
      expect(blackPlayer?.ratingDiff).toBeLessThan(0);
    });
  });

  describe('joinGame', () => {
    it('should allow a player to join as white when white slot is empty', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });

      const gameWithPlayer = chessGame.joinGame(playerInfo, Color.White);
      const gameState = gameWithPlayer.getState();

      expect(gameState.players.white).toEqual(playerInfo);
      expect(gameState.players.black).toBeUndefined();
      expect(gameState.status).toBe('WAITING');
    });

    it('should allow a player to join as black when black slot is empty', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });

      const gameWithPlayer = chessGame.joinGame(playerInfo, Color.Black);
      const gameState = gameWithPlayer.getState();

      expect(gameState.players.black).toEqual(playerInfo);
      expect(gameState.players.white).toBeUndefined();
      expect(gameState.status).toBe('WAITING');
    });

    it('should assign a random available side when no side is specified', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });

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
      const player1 = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });
      const player2 = PlayerInfoMock.fromPartial({
        id: 'player2',
        name: 'Player Two',
      });

      const gameWithPlayer1 = chessGame.joinGame(player1, Color.White);
      const gameWithBothPlayers = gameWithPlayer1.joinGame(
        player2,
        Color.Black,
      );
      const gameState = gameWithBothPlayers.getState();

      expect(gameState.players.white).toEqual(player1);
      expect(gameState.players.black).toEqual(player2);
      expect(gameState.status).toBe('READY');
    });

    it('should throw error when trying to join a side that is already taken', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const player1 = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });
      const player2 = PlayerInfoMock.fromPartial({
        id: 'player2',
        name: 'Player Two',
      });

      const gameWithPlayer1 = chessGame.joinGame(player1, Color.White);

      expect(() => {
        gameWithPlayer1.joinGame(player2, Color.White);
      }).toThrow('Invalid side or side already taken');
    });

    it('should throw error when trying to join a game where all sides are taken', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const player1 = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });
      const player2 = PlayerInfoMock.fromPartial({
        id: 'player2',
        name: 'Player Two',
      });
      const player3 = PlayerInfoMock.fromPartial({
        id: 'player3',
        name: 'Player Three',
      });

      const gameWithPlayer1 = chessGame.joinGame(player1, Color.White);
      const gameWithBothPlayers = gameWithPlayer1.joinGame(
        player2,
        Color.Black,
      );

      const gameWithP1P2 = gameWithBothPlayers.joinGame(player3);

      const gameState = gameWithP1P2.getState();
      expect(gameState.players.white).toEqual(player1);
      expect(gameState.players.black).toEqual(player2);
      expect(gameState.status).toBe('READY');
    });

    it('should preserve existing game state when a player joins', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);
      const playerInfo = PlayerInfoMock.fromPartial({
        id: 'player1',
        name: 'Player One',
      });

      const gameWithPlayer = chessGame.joinGame(playerInfo, Color.White);

      expect(gameWithPlayer.getPosition()).toEqual(chessGame.getPosition());
      expect(gameWithPlayer.getState().movesRecord).toEqual(
        chessGame.getState().movesRecord,
      );
      expect(gameWithPlayer.getState().result).toEqual(
        chessGame.getState().result,
      );
    });
  });

  describe('play', () => {
    it('should set the result to checkmate when a move results in checkmate', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
          ),
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'IN_PROGRESS',
        }),
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
            '3k4/5K2/8/8/8/8/6Q1/8 w - - 0 1',
          ),
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'IN_PROGRESS',
        }),
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

    it('should pause clock when checkmate occurs', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
          ),
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'IN_PROGRESS',
          timeControl: {
            classification: 'blitz',
            initialSec: 300,
            incrementSec: 0,
          },
        }),
      );

      const clockBeforeMove = chessGame.clock;
      expect(clockBeforeMove).toBeDefined();

      // Scholar's mate
      const updatedGame = chessGame.play('player1', {
        from: 'f3',
        to: 'f7',
        promotion: undefined,
      });

      const clockAfterMove = updatedGame.clock;
      expect(updatedGame.getState().status).toBe('ENDED');
      expect(clockAfterMove?.lastEvent?.type).toBe('pause');
    });

    it('should pause clock when stalemate occurs', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            '3k4/5K2/8/8/8/8/6Q1/8 w - - 0 1',
          ),
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'IN_PROGRESS',
          timeControl: {
            classification: 'rapid',
            initialSec: 600,
            incrementSec: 5,
          },
        }),
      );

      const clockBeforeMove = chessGame.clock;
      expect(clockBeforeMove).toBeDefined();

      const updatedGame = chessGame.play('player1', {
        from: 'g2',
        to: 'b7',
        promotion: undefined,
      });

      const clockAfterMove = updatedGame.clock;
      expect(updatedGame.getState().status).toBe('ENDED');
      expect(updatedGame.getState().result?.type).toBe('draw');
      expect(clockAfterMove?.lastEvent?.type).toBe('pause');
    });

    it('should calculate rating diffs when game ends by checkmate', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
          ),
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
              rating: {
                id: 2,
                value: 1600,
                deviation: 180,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
          },
          status: 'IN_PROGRESS',
        }),
      );

      const updatedGame = chessGame.play('player1', {
        from: 'f3',
        to: 'f7',
        promotion: undefined,
      });

      const whitePlayer = updatedGame.getState().players.white;
      const blackPlayer = updatedGame.getState().players.black;

      expect(whitePlayer?.ratingDiff).toBeDefined();
      expect(blackPlayer?.ratingDiff).toBeDefined();
      expect(whitePlayer?.ratingDiff).toBeGreaterThan(0); // Winner gains rating
      expect(blackPlayer?.ratingDiff).toBeLessThan(0); // Loser loses rating
    });
  });

  describe('Game status transitions', () => {
    it('should transition from READY to IN_PROGRESS on first move', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'READY',
        }),
      );

      expect(chessGame.getState().status).toBe('READY');
      expect(chessGame.getState().startedAt).toBeUndefined();

      const updatedGame = chessGame.play('player1', {
        from: 'e2',
        to: 'e4',
      });

      expect(updatedGame.getState().status).toBe('IN_PROGRESS');
      expect(updatedGame.getState().startedAt).toBeDefined();
    });

    it('should set startedAt timestamp only once', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'READY',
        }),
      );

      const game1 = chessGame.play('player1', { from: 'e2', to: 'e4' });
      const startedAt1 = game1.getState().startedAt;

      const game2 = game1.play('player2', { from: 'e7', to: 'e5' });
      const startedAt2 = game2.getState().startedAt;

      expect(startedAt1).toEqual(startedAt2);
    });
  });

  describe('leaveGame', () => {
    it('should not allow leaving during IN_PROGRESS game', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'IN_PROGRESS',
        }),
      );

      const updatedGame = chessGame.leaveGame('player1');

      // Should return unchanged game
      expect(updatedGame.getState().players.white).toBeDefined();
      expect(updatedGame.getState().status).toBe('IN_PROGRESS');
    });

    it('should not allow leaving after game has ENDED', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'ENDED',
          result: { type: 'white_win', timestamp: Date.now() },
        }),
      );

      const updatedGame = chessGame.leaveGame('player1');

      expect(updatedGame.getState().players.white).toBeDefined();
      expect(updatedGame.getState().status).toBe('ENDED');
    });

    it('should transition READY to WAITING when one player leaves', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'READY',
        }),
      );

      const updatedGame = chessGame.leaveGame('player1');

      expect(updatedGame.getState().players.white).toBeUndefined();
      expect(updatedGame.getState().players.black).toBeDefined();
      expect(updatedGame.getState().status).toBe('WAITING');
    });

    it('should transition WAITING to EMPTY when last player leaves', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: undefined,
          },
          status: 'WAITING',
        }),
      );

      const updatedGame = chessGame.leaveGame('player1');

      expect(updatedGame.getState().players.white).toBeUndefined();
      expect(updatedGame.getState().status).toBe('EMPTY');
    });
  });

  describe('getPlayerGameResult', () => {
    it('should throw error when player is not in game', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'ENDED',
          result: { type: 'white_win', timestamp: Date.now() },
        }),
      );

      expect(() => {
        chessGame.getPlayerGameResult('player3');
      }).toThrow('Player is not part of the game');
    });

    it('should throw error when game has not ended', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }),
          },
          status: 'IN_PROGRESS',
        }),
      );

      expect(() => {
        chessGame.getPlayerGameResult('player1');
      }).toThrow('Game has not ended yet');
    });

    it('should return undefined when opponent has no rating', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
            }), // No rating
          },
          status: 'ENDED',
          result: { type: 'white_win', timestamp: Date.now() },
        }),
      );

      const result = chessGame.getPlayerGameResult('player1');
      expect(result).toBeUndefined();
    });

    it('should return game result with correct score for winner', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
              rating: {
                id: 2,
                value: 1600,
                deviation: 180,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
          },
          status: 'ENDED',
          result: { type: 'white_win', timestamp: Date.now() },
        }),
      );

      const result = chessGame.getPlayerGameResult('player1');
      expect(result).toBeDefined();
      expect(result?.value).toBe(1); // Win
      expect(result?.opponent.value).toBe(1600);
      expect(result?.opponent.deviation).toBe(180);
      expect(result?.opponent.volatility).toBe(0.06);
    });

    it('should return game result with correct score for loser', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
              rating: {
                id: 2,
                value: 1600,
                deviation: 180,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
          },
          status: 'ENDED',
          result: { type: 'white_win', timestamp: Date.now() },
        }),
      );

      const result = chessGame.getPlayerGameResult('player2');
      expect(result).toBeDefined();
      expect(result?.value).toBe(0); // Loss
    });

    it('should return game result with correct score for draw', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          players: {
            white: PlayerInfoMock.fromPartial({
              id: 'player1',
              name: 'Player One',
              rating: {
                id: 1,
                value: 1500,
                deviation: 200,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
            black: PlayerInfoMock.fromPartial({
              id: 'player2',
              name: 'Player Two',
              rating: {
                id: 2,
                value: 1600,
                deviation: 180,
                volatility: 0.06,
                timestamp: new Date(),
              },
            }),
          },
          status: 'ENDED',
          result: { type: 'draw', timestamp: Date.now() },
        }),
      );

      const result1 = chessGame.getPlayerGameResult('player1');
      const result2 = chessGame.getPlayerGameResult('player2');
      expect(result1?.value).toBe(0.5); // Draw
      expect(result2?.value).toBe(0.5); // Draw
    });
  });

  describe('Insufficient material', () => {
    it('should end game in draw when insufficient material (two kings)', () => {
      const chessGame = ChessGame.fromGameState(
        GameStateMock.fromPartial({
          initialPosition: FenParser.toChessPosition(
            '8/8/8/8/8/3k4/8/3K4 w - - 0 1', // Just two kings
          ),
          players: {
            white: PlayerInfoMock.fromId('player1'),
            black: PlayerInfoMock.fromId('player2'),
          },
          status: 'IN_PROGRESS',
        }),
      );

      // This position should already be detected as a draw
      expect(chessGame.getState().result?.type).toBe('draw');
      expect(chessGame.getState().status).toBe('ENDED');
    });
  });
});
