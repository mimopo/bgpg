import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Repository } from 'typeorm/repository/Repository';

import { Room } from '../../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private readonly repository: Repository<Room>) {}

  create(): Promise<Room> {
    const room = new Room();
    room.name = Math.random() + '';
    return this.repository.save(room);
  }

  async find(id: string): Promise<Room> {
    if (!id) {
      throw new EntityNotFoundError(Room, { id });
    }
    return this.repository.findOneOrFail(id);
  }
}
