import { CastlingAbility } from '../../../position/model/CastlingAbility';
import { createChessPositionMock } from '../../../mocks/ChessPosition.mock';
import { PiecePlacementsMock } from '../../../mocks/PiecePlacements.mock';
import { FenParser } from '../FenParser';

describe('FenParser', () => {
  describe('toChessPosition', () => {
    it('creates an empty board state', () => {
      const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
      const boardState = FenParser.toChessPosition(emptyBoardFen);

      expect(boardState.pieces).toEqual(PiecePlacementsMock.emptyBoard);
      expect(boardState.castlingAbility).toEqual(
        new Set([
          CastlingAbility.WhiteKing,
          CastlingAbility.WhiteQueen,
          CastlingAbility.BlackKing,
          CastlingAbility.BlackQueen,
        ]),
      );
      expect(boardState.enPassant).toBeUndefined();
      expect(boardState.turn).toEqual('white');
      expect(boardState.ply).toEqual(0);
      expect(boardState.fullMoves).toEqual(1);
    });
    it('creates the start board state', () => {
      const startingFen =
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

      const boardState = FenParser.toChessPosition(startingFen);

      expect(boardState.pieces).toEqual(PiecePlacementsMock.startingBoard);
      expect(boardState.castlingAbility).toEqual(
        new Set([
          CastlingAbility.WhiteKing,
          CastlingAbility.WhiteQueen,
          CastlingAbility.BlackKing,
          CastlingAbility.BlackQueen,
        ]),
      );
      expect(boardState.enPassant).toBeUndefined();
      expect(boardState.turn).toEqual('white');
      expect(boardState.ply).toEqual(0);
      expect(boardState.fullMoves).toEqual(1);
    });
    it('parses a fen string mid game', () => {
      const fen =
        'r3kb1N/ppp3p1/4pn2/3p3p/P1nPbB2/2q5/3N1PPP/R2QKB1R w KQq h6 0 14';
      const boardState = FenParser.toChessPosition(fen);
      // Spot check a few key squares
      expect(boardState.pieces.get('c3')).toEqual({
        type: 'q',
        color: 'black',
      });
      expect(boardState.pieces.get('e8')).toEqual({
        type: 'k',
        color: 'black',
      });
      expect(boardState.pieces.get('d2')).toEqual({
        type: 'n',
        color: 'white',
      });
      expect(boardState.pieces.get('f4')).toEqual({
        type: 'b',
        color: 'white',
      });
      expect(boardState.turn).toEqual('white');
      expect(boardState.ply).toEqual(0);
      expect(boardState.fullMoves).toEqual(14);
      expect(boardState.enPassant).toEqual('h6');
      expect(boardState.castlingAbility).toEqual(
        new Set([
          CastlingAbility.WhiteKing,
          CastlingAbility.WhiteQueen,
          CastlingAbility.BlackQueen,
        ]),
      );
    });
  });

  describe('toFenStr', () => {
    it('serializes an empty board state', () => {
      const chessPosition = createChessPositionMock({
        pieces: PiecePlacementsMock.emptyBoard,
        castlingAbility: new Set([
          CastlingAbility.WhiteKing,
          CastlingAbility.WhiteQueen,
          CastlingAbility.BlackKing,
          CastlingAbility.BlackQueen,
        ]),
        enPassant: undefined,
        turn: 'white',
        ply: 0,
        fullMoves: 1,
      });
      expect(FenParser.toFenStr(chessPosition)).toBe(
        '8/8/8/8/8/8/8/8 w KQkq - 0 1',
      );
    });

    it('serializes the starting position', () => {
      const chessPosition = createChessPositionMock({
        pieces: PiecePlacementsMock.startingBoard,
        castlingAbility: new Set([
          CastlingAbility.WhiteKing,
          CastlingAbility.WhiteQueen,
          CastlingAbility.BlackKing,
          CastlingAbility.BlackQueen,
        ]),
        enPassant: undefined,
        turn: 'white',
        ply: 0,
        fullMoves: 1,
      });
      expect(FenParser.toFenStr(chessPosition)).toBe(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      );
    });

    it('serializes a mid-game position', () => {
      const fen =
        'r3kb1N/ppp3p1/4pn2/3p3p/P1nPbB2/2q5/3N1PPP/R2QKB1R w KQq h6 0 14';
      const chessPosition = FenParser.toChessPosition(fen);
      expect(FenParser.toFenStr(chessPosition)).toBe(fen);
    });
  });
});
