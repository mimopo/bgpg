import { Test, TestingModule } from '@nestjs/testing';
import { Socket } from 'socket.io';

import { Room } from '../entities/room.entity';
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

class SocketMock implements Partial<Socket> {
  join(room: any, callback?: any): any {
    if (callback) {
      callback();
    }
    return this;
  }
}

describe('MainGateway', () => {
  let gateway: MainGateway;
  let client: Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainGateway, { provide: RoomService, useClass: RoomServiceMock }],
    }).compile();

    gateway = module.get<MainGateway>(MainGateway);
    client = new SocketMock() as Socket;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

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
