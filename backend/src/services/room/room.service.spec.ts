import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import { Repository } from 'typeorm';

import { Room } from '../../entities/room.entity';
import { RepositoryMock } from '../../mocks/repository-mock';
import { NameService } from '../name/name.service';
import { PlayerService } from '../player/player.service';
import { RoomService } from './room.service';

jest.mock('../player/player.service');
jest.mock('../name/name.service');

describe('findOneOrFailRoomService', () => {
  let service: RoomService;
  let repository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        PlayerService,
        NameService,
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
