import { ArgumentsHost, BadRequestException, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Socket } from 'socket.io';

import { ErrorEnum } from '../common/model/error-enum';
import { ErrorResponse } from '../common/model/error-response';

/**
 * Transforms any exception into an ErrorResponse
 */
@Catch()
export class WsExceptionFilter<T> extends BaseWsExceptionFilter {
  private readonly logger = new Logger('WsExceptionFilter');

  /**
   * Catch the exception and send error to de client
   */
  catch(exception: T, host: ArgumentsHost) {
    let error: ErrorResponse;
    if (exception instanceof BadRequestException) {
      const response: any = exception.getResponse();
      error = {
        error: ErrorEnum.validation,
        message: response.message.map((m: string) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ') + '.',
      };
    } else {
      let message = 'Internal Server Error';
      if (exception instanceof WsException || exception instanceof EntityNotFoundError) {
        message = exception.message;
      } else {
        if (exception instanceof Error) {
          this.logger.error(exception.message, exception.stack);
        } else {
          this.logger.error(exception);
        }
      }
      error = {
        error: ErrorEnum.unexpected,
        message: message,
      };
    }
    this.ack(error, host);
  }

  /**
   * Sends the error to the client
   */
  private ack(error: ErrorResponse, host: ArgumentsHost) {
    const socket: Socket = host.switchToWs().getClient();
    const args = host.getArgs();
    const ack = args[args.length - 1];
    if (typeof ack === 'function') {
      // Return the error as response
      ack(error);
    } else {
      // Emit error to the client, "error" is a reserved event so we need to use "exception"
      socket.emit('exception', error);
    }
  }
}
