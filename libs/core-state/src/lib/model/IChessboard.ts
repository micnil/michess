import { IReadOnlyChessboard } from './IReadOnlyChessboard';
import { MovePayload } from './MovePayload';

export interface IChessboard extends IReadOnlyChessboard {
  movePiece(movePayload: MovePayload): IChessboard;
}
