enum Errors {
  validation = "validation",
  unexpected = "unexpected",
}

/**
 * Server Error Message
 */
export class Error {
  /** Error codes available */
  static errors = Errors;
  /** Error code */
  error!: Error;
  /** Error message */
  message!: string;
}