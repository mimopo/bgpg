import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';

import { RepositoryMock } from '../../mocks/repository-mock';
import { Room } from '../../entities/room.entity';
import { RoomService } from './room.service';

describe('findOneOrFailRoomService', () => {
  let service: RoomService;
  let repository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useClass: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get(RoomService);
    repository = module.get(getRepositoryToken(Room));
    jest.clearAllMocks();
  });

  it('to be defined', () => {
    expect(service).toBeDefined();
  });

  it('create: returns a Room', () => {
    return expect(service.create()).resolves.toBeInstanceOf(Room);
  });

  it('find: returns a Room', () => {
    jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(new Room());
    return expect(service.find('success')).resolves.toBeInstanceOf(Room);
  });

  it('find: throws exceptions when roomId not found', () => {
    jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(new Error());
    return expect(service.find('fail')).rejects.toBeDefined();
  });
});
