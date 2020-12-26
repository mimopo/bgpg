import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm/repository/Repository';

import { ModelUpdate } from '../../common/types/model-update';
import { Player } from '../../entities/player.entity';
import { NameService } from '../name/name.service';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(Player) private readonly repository: Repository<Player>, private nameService: NameService) {}

  async create(socketId: string): Promise<Player> {
    const player = new Player();
    player.name = this.nameService.generateName();
    player.id = socketId;
    return this.repository.save(player);
  }

  async update(update: ModelUpdate<Player>): Promise<Player> {
    let player = await this.repository.findOneOrFail({ id: update.id });
    player = Object.assign(player, update);
    return this.repository.save(player);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async find(id: string): Promise<Player> {
    return this.repository.findOneOrFail({ id });
  }

  async findByRoomId(roomId: ObjectId): Promise<Player[]> {
    return this.repository.find({ roomId });
  }

  async joinRoom(player: Player, roomId: ObjectId): Promise<Player> {
    player.roomId = roomId;
    return this.repository.save(player);
  }

  async leaveRoom(player: Player): Promise<Player> {
    if (!player.roomId) {
      throw new Error(`Player isn't in a room`);
    }
    player.roomId = undefined;
    return this.repository.save(player);
  }
}
