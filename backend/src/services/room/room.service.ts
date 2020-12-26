import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Repository } from 'typeorm/repository/Repository';

import { Room } from '../../entities/room.entity';
import { NameService } from '../name/name.service';
import { PlayerService } from '../player/player.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly repository: Repository<Room>,
    private readonly playerService: PlayerService,
    private nameService: NameService,
  ) {}

  create(): Promise<Room> {
    const room = new Room();
    room.name = this.nameService.generateName();
    return this.repository.save(room);
  }

  async find(id: string): Promise<Room> {
    if (!id) {
      throw new EntityNotFoundError(Room, { id });
    }
    const room = await this.repository.findOneOrFail(id);
    const [players, tokens] = await Promise.all([this.playerService.findByRoomId(room.id), Promise.resolve([])]);
    room.players = players;
    room.tokens = tokens;
    return room;
  }
}
