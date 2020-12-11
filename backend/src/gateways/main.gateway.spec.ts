/* eslint-disable @typescript-eslint/no-explicit-any */

import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';

import { Player } from '../entities/player.entity';
import { Room } from '../entities/room.entity';
import { PlayerService } from '../services/player/player.service';
import { RoomService } from '../services/room/room.service';
import { SocketUtils } from '../utils/socket-utils';
import { MainGateway } from './main.gateway';

jest.mock('../services/player/player.service');
jest.mock('../services/room/room.service');

describe('MainGateway', () => {
  let gateway: MainGateway;
  let module: TestingModule;
  let client: any;

  const mockPlayerServiceFind = (mock: Partial<Player>) => {
    jest.spyOn(module.get(PlayerService), 'find').mockResolvedValue(mock as Player);
  };

  beforeAll(() => {
    Logger.overrideLogger(['error']);
    jest.spyOn(SocketUtils, 'emit').mockImplementation();
    jest.spyOn(SocketUtils, 'join').mockImplementation();
    jest.spyOn(SocketUtils, 'leave').mockImplementation();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [MainGateway, PlayerService, RoomService],
    }).compile();

    gateway = module.get(MainGateway);
    client = {
      id: 'socketId',
      in: jest.fn(),
    };
    jest.clearAllMocks();
    jest.spyOn(module.get(RoomService), 'create').mockResolvedValue(new Room());
    jest.spyOn(module.get(RoomService), 'find').mockResolvedValue(new Room());
    jest.spyOn(module.get(PlayerService), 'create').mockResolvedValue(new Player());
    jest.spyOn(module.get(PlayerService), 'find').mockResolvedValue(new Player());
    jest.spyOn(module.get(PlayerService), 'findByRoomId').mockResolvedValue([]);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('handleConnection: creates a Player', (done) => {
    gateway.handleConnection(client).then(() => {
      expect(module.get(PlayerService).create).toBeCalledWith(client.id);
      done();
    });
  });

  it('handleConnection: emits hello', (done) => {
    gateway.handleConnection(client).then(() => {
      expect(SocketUtils.emit).toHaveBeenLastCalledWith(null, 'hello', expect.any(Player));
      done();
    });
  });

  it('handleDisconnect: emits playerLeft if its in a room', (done) => {
    mockPlayerServiceFind({ id: 'playerId', roomId: new ObjectId() } as Player);
    gateway.handleDisconnect(client).then(() => {
      expect(SocketUtils.emit).toHaveBeenLastCalledWith(undefined, 'playerLeft', 'playerId');
      done();
    });
  });

  it('handleDisconnect: removes the Player', (done) => {
    mockPlayerServiceFind({ id: 'playerId' } as Player);
    gateway.handleDisconnect(client).then(() => {
      expect(module.get(PlayerService).remove).toBeCalledWith('playerId');
      done();
    });
  });

  it('createRoom: creates a Room', (done) => {
    gateway.createRoom(client).then(() => {
      expect(module.get(RoomService).create).toBeCalled();
      done();
    });
  });

  it('createRoom: joins into the Socket room', (done) => {
    const service = module.get(RoomService);
    const roomId = new ObjectId();
    jest.spyOn(service, 'create').mockResolvedValue({ id: roomId } as Room);
    gateway.createRoom(client).then(() => {
      expect(SocketUtils.join).toBeCalledWith(client, `${roomId}`);
      done();
    });
  });

  it('createRoom: returns a Room', () => {
    return expect(gateway.createRoom(client)).resolves.toBeInstanceOf(Room);
  });

  it('joinRoom: joins to the socket room', (done) => {
    gateway.joinRoom(client, 'success').then(() => {
      expect(SocketUtils.join).toHaveBeenLastCalledWith(client, expect.any(String));
      done();
    });
  });

  it('joinRoom: emits playerJoined with a Player', (done) => {
    gateway.joinRoom(client, 'success').then(() => {
      expect(SocketUtils.emit).toHaveBeenLastCalledWith(undefined, 'playerJoined', expect.any(Player));
      done();
    });
  });

  it('joinRoom: returns a Room', () => {
    jest.spyOn(module.get(PlayerService), 'findByRoomId').mockResolvedValue([]);
    return expect(gateway.joinRoom(client, 'success')).resolves.toEqual(expect.any(Room));
  });

  it('leaveRoom: returns true', () => {
    mockPlayerServiceFind({ id: 'playerId', roomId: 'roomId' } as any);
    return expect(gateway.leaveRoom(client)).resolves.toBe(true);
  });

  it('leaveRoom: throws exception if the player isnt in a room', () => {
    return expect(gateway.leaveRoom(client)).rejects.toBeDefined();
  });

  it('leaveRoom: emits playerLeft with a player id', (done) => {
    mockPlayerServiceFind({ id: 'playerId', roomId: 'roomId' } as any);
    gateway.leaveRoom(client).then(() => {
      expect(SocketUtils.emit).toHaveBeenLastCalledWith(undefined, 'playerLeft', expect.any(String));
      done();
    });
  });

  it('leaveRoom: leaves the socket room', (done) => {
    mockPlayerServiceFind({ id: 'playerId', roomId: 'roomId' } as any);
    gateway.leaveRoom(client).then(() => {
      expect(SocketUtils.leave).toHaveBeenLastCalledWith(client, expect.any(String));
      done();
    });
  });

  it('leaveRoom: leaves the the room', (done) => {
    const service = module.get(PlayerService);
    mockPlayerServiceFind({ id: 'playerId', roomId: 'roomId' } as any);
    gateway.leaveRoom(client).then(() => {
      expect(jest.spyOn(service, 'leaveRoom')).toBeCalled();
      done();
    });
  });

  it('getGames: throws exception', async () => {
    return expect(gateway.getGames(client)).rejects.toBeDefined();
  });

  it('updatePlayer: returns true', async () => {
    const service = module.get(PlayerService);
    jest.spyOn(service, 'update').mockResolvedValue(new Player());
    return expect(gateway.updatePlayer(client, { id: 'foo', name: 'bar' })).resolves.toBe(true);
  });

  it('updatePlayer: emits player updated if player is in a room', (done) => {
    const service = module.get(PlayerService);
    const playerMock = { id: 'foo', roomId: 'bar' };
    jest.spyOn(service, 'update').mockResolvedValue(playerMock as any);
    gateway.updatePlayer(client, playerMock).then(() => {
      expect(SocketUtils.emit).toHaveBeenLastCalledWith(undefined, 'playerUpdated', playerMock);
      done();
    });
  });
});
