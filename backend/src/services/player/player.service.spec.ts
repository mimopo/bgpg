import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm/dist';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { Player } from '../../entities/player.entity';
import { RepositoryMock } from '../../mocks/repository-mock';
import { NameService } from '../name/name.service';
import { PlayerService } from './player.service';

jest.mock('../name/name.service');

describe('PlayerService', () => {
  let service: PlayerService;
  let repository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        NameService,
        {
          provide: getRepositoryToken(Player),
          useClass: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get(PlayerService);
    repository = module.get(getRepositoryToken(Player));
    jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(new Player());
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create: returns a Player', () => {
    return expect(service.create('socketId')).resolves.toBeInstanceOf(Player);
  });

  it('update: returns a Player', () => {
    return expect(service.update({ id: 'id', name: 'foo' })).resolves.toBeInstanceOf(Player);
  });

  it('find: returns a Player', () => {
    return expect(service.find('id')).resolves.toBeInstanceOf(Player);
  });

  it('find: throws exceptions when playerId not found', () => {
    jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(new Error());
    return expect(service.find('id')).rejects.toBeDefined();
  });

  it('findByRoomId: returns an array of Players', () => {
    jest.spyOn(repository, 'find').mockResolvedValue([new Player()]);
    return expect(service.findByRoomId(new ObjectId())).resolves.toEqual(expect.arrayContaining([expect.any(Player)]));
  });

  it('joinRoom: assing a roomId to the Player', () => {
    const roomId = new ObjectId();
    return expect(service.joinRoom(new Player(), roomId)).resolves.toHaveProperty('roomId', roomId);
  });

  it('leaveRoom: removes the roomId from the Player', () => {
    const player = new Player();
    player.roomId = new ObjectId();
    jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(player);
    return expect(service.leaveRoom(player)).resolves.toHaveProperty('roomId', undefined);
  });

  it('remove: resolves the promise', () => {
    return expect(service.remove('id')).resolves.toBeUndefined();
  });

  it('leaveRoom: throws an error when the user isnt in a room', () => {
    const player = new Player();
    return expect(service.leaveRoom(player)).rejects.toBeDefined();
  });
});
