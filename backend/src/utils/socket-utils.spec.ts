import * as classTransformer from 'class-transformer';
import { Player } from '../entities/player.entity';

import { SocketUtils } from './socket-utils';

describe('SocketUtils', () => {
  const emitter = { emit: jest.fn() } as any;
  const client = { join: jest.fn(), leave: jest.fn() };

  beforeAll(() => {
    jest.spyOn(emitter, 'emit').mockReturnValue(true);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('emit: emits events with data', () => {
    SocketUtils.emit(emitter, 'playerLeft', 'foo');
    expect(emitter.emit).toBeCalledWith('playerLeft', 'foo');
  });

  it('emit: emits serialized objects', () => {
    jest.spyOn(classTransformer, 'classToPlain').mockReturnValue('serialized' as any);
    SocketUtils.emit(emitter, 'playerJoined', new Player());
    expect(emitter.emit).toBeCalledWith('playerJoined', 'serialized');
  });

  it('emit: emits events with ack', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    SocketUtils.emit(emitter, 'playerLeft', 'foo', () => {});
    expect(emitter.emit).toBeCalledWith('playerLeft', 'foo', expect.any(Function));
  });

  it('join: resolves on room join', () => {
    jest.spyOn(client, 'join').mockImplementation((roomId, ack) => ack());
    return expect(SocketUtils.join(client as any, 'roomId')).resolves.toBeFalsy();
  });

  it('join: rejects on room join error', () => {
    jest.spyOn(client, 'join').mockImplementation((roomId, ack) => ack(new Error()));
    return expect(SocketUtils.join(client as any, 'roomId')).rejects.toBeDefined();
  });

  it('leave: resolves on room leave', () => {
    jest.spyOn(client, 'leave').mockImplementation((roomId, ack) => ack());
    return expect(SocketUtils.leave(client as any, 'roomId')).resolves.toBeFalsy();
  });

  it('leave: rejects on room leave error', () => {
    jest.spyOn(client, 'leave').mockImplementation((roomId, ack) => ack(new Error()));
    return expect(SocketUtils.leave(client as any, 'roomId')).rejects.toBeDefined();
  });
});
