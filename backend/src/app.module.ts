import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiceGateway } from './dice.gateway';
import { Dice } from './entities/dice.entity';
import { Player } from './entities/player.entity';
import { Room } from './entities/room.entity';
import { Session } from './entities/session.entity';
import { Token } from './entities/token.entity';
import { LobbyGateway } from './lobby.gateway';
import { TokenGateway } from './token.gateway';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Room, Player, Token, Dice, Session])],
  controllers: [],
  providers: [LobbyGateway, DiceGateway, TokenGateway],
})
export class AppModule {}
