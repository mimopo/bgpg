import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Room } from './entities/room.entity';
import { GameGateway } from './game.gateway';
import { Player } from './entities/player.entity';
import { LobbyGateway } from './lobby.gateway';
import { Token } from './entities/token.entity';
import { Dice } from './entities/dice.entity';
import { DiceGateway } from './dice.gateway';
import { TokenGateway } from './token.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Room, Player, Token, Dice]),
  ],
  controllers: [],
  providers: [GameGateway, LobbyGateway, DiceGateway, TokenGateway],
})
export class AppModule {}
