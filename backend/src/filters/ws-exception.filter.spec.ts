import { BadRequestException, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { WsExceptionFilter } from './ws-exception.filter';
import { ErrorEnum } from '../common/model/error-enum';

class ArgumentsHostMock {
  constructor(private ack?: (response: any) => void, private socketEmit?: (e: string, d: any) => void | null) {}
  switchToWs() {
    return {
      getClient: () => {
        return {
          emit: this.socketEmit,
        };
      },
    };
  }
  getArgs() {
    return [this.ack];
  }
}

describe('WsExceptionFilter', () => {
  let filter: WsExceptionFilter<any>;
  beforeEach(() => {
    Logger.overrideLogger(['error']);
    filter = new WsExceptionFilter();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('handles BadRequestException using ack', () => {
    const ex = new BadRequestException([]);
    const ack = jest.fn();
    filter.catch(ex, new ArgumentsHostMock(ack) as any);
    expect(ack).toBeCalledWith(expect.anything());
  });

  it('handles BadRequestException as validation error', () => {
    const ex = new BadRequestException(['validation']);
    const ack = jest.fn();
    filter.catch(ex, new ArgumentsHostMock(ack) as any);
    expect(ack).toHaveBeenCalledWith(
      expect.objectContaining({
        error: ErrorEnum.validation,
        message: expect.any(String),
      }),
    );
  });

  it('handles any other exception as unexpected', () => {
    const ex = new Error();
    const ack = jest.fn();
    filter.catch(ex, new ArgumentsHostMock(ack) as any);
    expect(ack).toHaveBeenCalledWith(
      expect.objectContaining({
        error: ErrorEnum.unexpected,
        message: expect.any(String),
      }),
    );
  });

  it('exposes WsException messages', () => {
    const ex = new WsException('foo');
    const ack = jest.fn();
    filter.catch(ex, new ArgumentsHostMock(ack) as any);
    expect(ack).toHaveBeenCalledWith(
      expect.objectContaining({
        error: ErrorEnum.unexpected,
        message: 'foo',
      }),
    );
  });

  it('exposes EntityNotFoundError messages', () => {
    const ex = new EntityNotFoundError('Room', { id: 'foo' });
    const ack = jest.fn();
    filter.catch(ex, new ArgumentsHostMock(ack) as any);
    expect(ack).toHaveBeenCalledWith(
      expect.objectContaining({
        error: ErrorEnum.unexpected,
        message: expect.any(String),
      }),
    );
  });

  it('emits exception event if no ack provided', () => {
    const ex = new WsException('foo');
    const socketEmit = jest.fn();
    filter.catch(ex, new ArgumentsHostMock(undefined, socketEmit) as any);
    expect(socketEmit).toHaveBeenCalledWith(
      'exception',
      expect.objectContaining({
        error: ErrorEnum.unexpected,
        message: 'foo',
      }),
    );
  });
});
