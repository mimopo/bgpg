import { ErrorResponse } from '../../model/error-response';

/**
 * Available error-related events
 */
export interface ErrorEvents {
  /**
   * Exception emitted when no ack provided
   * @see WsExceptionFilter
   */
  exception(error: ErrorResponse): void;
}
