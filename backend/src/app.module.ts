import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { Player } from './entities/player.entity';
import { Room } from './entities/room.entity';
import { MainGateway } from './gateways/main.gateway';
import { NameService } from './services/name/name.service';
import { PlayerService } from './services/player/player.service';
import { RoomService } from './services/room/room.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Room, Player])],
  controllers: [],
  providers: [MainGateway, RoomService, PlayerService, NameService],
})
export class AppModule {}
