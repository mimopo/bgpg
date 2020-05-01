import { ArgumentsHost, Catch, BadRequestException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { ErrorDto, ValidationErrorDto } from '@mimopo/bgpg-core';

@Catch()
export class WsExceptionFilter<T> extends BaseWsExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    let error: ErrorDto;
    if (exception instanceof BadRequestException) {
      const response: any = exception.getResponse();
      // TODO: Improve this error handling
      error = <ValidationErrorDto>{
        error: ErrorDto.errors.validation,
        message: response.message.map((m: string) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ') + '.',
      };
    } else {
      error = {
        error: ErrorDto.errors.unexpected,
        message: exception instanceof WsException ? exception.message : 'Internal Server Error',
      };
    }
    this.ack(error, host);
  }

  private ack(error: ErrorDto, host: ArgumentsHost) {
    const socket: Socket = host.switchToWs().getClient();
    const args = host.getArgs();
    const ack = args[args.length - 1];
    if (typeof ack === 'function') {
      ack(error);
    } else {
      socket.emit('exception', {});
    }
  }
}
