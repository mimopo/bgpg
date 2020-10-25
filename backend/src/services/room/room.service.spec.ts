import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import { Repository } from 'typeorm';

import { Room } from '../../entities/room.entity';
import { RoomService } from './room.service';

class RoomRepository implements Partial<Repository<any>> {
  async save(room: any) {
    if (!room.id) {
      room.id = 'id';
    }
    return room;
  }
  async findOneOrFail(roomId: any) {
    if (roomId === 'fail') {
      throw new Error();
    }
    const room = new Room();
    room.id = roomId;
    return room;
  }
}

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useClass: RoomRepository,
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('to be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() returns a Room', () => {
    return expect(service.create()).resolves.toBeInstanceOf(Room);
  });

  it('find() returns a Room', () => {
    return expect(service.find('success')).resolves.toBeInstanceOf(Room);
  });

  it('find() returns a Room with the same id', () => {
    const id = 'success';
    return expect(service.find(id)).resolves.toHaveProperty('id', id);
  });

  it('find() throws exceptions when roomId not found', () => {
    return expect(service.find('fail')).rejects.toBeDefined();
  });
});
