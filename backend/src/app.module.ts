import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { MainGateway } from './gateways/main.gateway';
import { Room } from './entities/room.entity';
import { RoomService } from './services/room/room.service';
import { PlayerService } from './services/player/player.service';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Room, Player])],
  controllers: [],
  providers: [MainGateway, RoomService, PlayerService],
})
export class AppModule {}
