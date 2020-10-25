import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
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

  find(id: string): Promise<Room> {
    return this.repository.findOneOrFail(id);
  }
}
