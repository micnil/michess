import { GameErrorCode } from './GameErrorCode';

export class GameError extends Error {
  code: GameErrorCode;
  details?: any;

  constructor(
    code: GameErrorCode,
    message: string,
    errorOptions?: ErrorOptions,
  ) {
    super(message, errorOptions);
    this.code = code;
  }
}
