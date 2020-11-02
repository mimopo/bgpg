import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';
import { Player } from '../entities/player.entity';

import { Room } from '../entities/room.entity';
import { PlayerService } from '../services/player/player.service';
import { RoomService } from '../services/room/room.service';
import { MainGateway } from './main.gateway';

class RoomServiceMock implements Partial<RoomService> {
  async create() {
    return new Room();
  }
  async find(roomId: string) {
    const room = new Room();
    room.id = roomId;
    return room;
  }
}

class PlayerServiceMock implements Partial<PlayerService> {
  async create() {
    return new Player();
  }
  async joinRoom(player: Player, roomId: string) {
    player.roomId = roomId;
    return player;
  }
  async leaveRoom(player: Player) {
    player.roomId = undefined;
    return player;
  }
  async find() {
    return new Player();
  }
}

class SocketMock {
  join(room: any, callback?: any) {
    if (callback) {
      callback();
    }
    return this;
  }
  in() {
    return this;
  }
  emit(event: any, message: any, ack: any) {
    if (ack) {
      ack();
    }
    return true;
  }
}

describe('MainGateway', () => {
  let gateway: MainGateway;
  let client: Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainGateway,
        { provide: RoomService, useClass: RoomServiceMock },
        { provide: PlayerService, useClass: PlayerServiceMock },
      ],
    }).compile();

    gateway = module.get<MainGateway>(MainGateway);
    client = new SocketMock() as any;
    // gateway['server'] = jest.fn().mockImplementation(() => {
    //   return { emit: jest.fn().mockReturnThis() };
    // }) as any;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  // it('should emit hello on connection', done => {
  //   gateway.handleConnection(client).then(() => {
  //     expect(gateway['server'].emit).toHaveBeenCalled();
  //     done();
  //   });
  // });

  it('createRoom() returns a Room', async () => {
    return gateway.createRoom(client).then(room => expect(room).toBeInstanceOf(Room));
  });

  it('joinRoom() returns a Room', async () => {
    return gateway.joinRoom('success', client).then(room => expect(room).toBeInstanceOf(Room));
  });

  it('joinRoom() returns a Room with the same id', async () => {
    const roomId = 'success';
    return gateway.joinRoom('success', client).then(room => expect(room.id).toBe(roomId));
  });
});
