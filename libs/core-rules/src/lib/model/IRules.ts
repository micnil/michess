import { Color } from "@michess/core-models";
import { IChessboard } from "@michess/core-state";

export interface IRules {
  board: IChessboard;
  isTurn(color: Color): boolean
}
