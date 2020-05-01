enum Error {
  validation = 'validation',
  unexpected = 'unexpected',
}

export class ErrorDto {
  static errors = Error;
  error!: Error;
  message!: string;
}
