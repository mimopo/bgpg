import { ErrorEnum } from './error-enum';

/**
 * Server Error Message
 */
export interface ErrorResponse {
  /** Error code */
  error: ErrorEnum;
  /** Error message */
  message: string;
}
