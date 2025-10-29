import { ChessGameErrorCode } from './ChessGameErrorCode';

export class ChessGameError extends Error {
  code: ChessGameErrorCode;

  constructor(
    code: ChessGameErrorCode,
    message: string,
    errorOptions?: ErrorOptions,
  ) {
    super(message, errorOptions);
    this.code = code;
  }
}
