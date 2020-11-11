import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';

import { Player } from '../../entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(Player) private readonly repository: Repository<Player>) {}

  async create(socketId: string): Promise<Player> {
    const player = new Player();
    player.name = Math.random() + '';
    player.id = socketId;
    return this.repository.save(player);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async find(id: string): Promise<Player> {
    return this.repository.findOneOrFail({ id });
  }

  async joinRoom(player: Player, roomId: string): Promise<Player> {
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