import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { Player } from '../../entities/player.entity';
import { PlayerService } from './player.service';

class PlayerRepositoryMock implements Partial<Repository<any>> {
  async save(player: any) {
    if (!player.id) {
      player.id = 'id';
    }
    return player;
  }
  async findOneOrFail(search: any) {
    const id = search.id;
    if (id === 'fail') {
      throw new Error();
    }
    const player = new Player();
    player.id = id;
    return player;
  }
  async delete(criteria: any): Promise<any> {
    return;
  }
}

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: PlayerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() returns a Player', () => {
    return expect(service.create('socketId')).resolves.toBeInstanceOf(Player);
  });

  it('find() returns a Player', () => {
    return expect(service.find('success')).resolves.toBeInstanceOf(Player);
  });

  it('find() returns a Player with the same id', () => {
    const id = 'success';
    return expect(service.find(id)).resolves.toHaveProperty('id', id);
  });

  it('find() throws exceptions when playerId not found', () => {
    return expect(service.find('fail')).rejects.toBeDefined();
  });

  it('joinRoom() assing a roomId to the Player', () => {
    const player = new Player();
    const roomId = 'roomId';
    return expect(service.joinRoom(player, roomId)).resolves.toHaveProperty('roomId', roomId);
  });

  it('leaveRoom() removes the roomId from the Player', () => {
    const player = new Player();
    player.roomId = 'roomId';
    return expect(service.leaveRoom(player)).resolves.toHaveProperty('roomId', undefined);
  });

  it('leaveRoom() throws an error when the user isnt in a room', () => {
    const player = new Player();
    return expect(service.leaveRoom(player)).rejects.toBeDefined();
  });

  it('remove() resolves the promise', () => {
    return expect(service.remove('id')).resolves.toBeUndefined();
  });
});
