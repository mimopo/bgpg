enum ErrorEnum {
  validation = 'validation',
  unexpected = 'unexpected',
}

/**
 * Server Error Message
 */
export class ErrorResponse {
  /** Error codes available */
  static errors = ErrorEnum;
  /** Error code */
  error!: ErrorEnum;
  /** Error message */
  message!: string;
}
