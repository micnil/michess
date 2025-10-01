export class ApiError extends Error {
  code: string;
  details?: any;

  constructor(
    code: string,
    message: string,
    details?: any,
    errorOptions?: ErrorOptions
  ) {
    super(message, errorOptions);
    this.code = code;
    this.details = details;
  }
}
