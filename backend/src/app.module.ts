import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { MainGateway } from './gateways/main.gateway';
import { Room } from './entities/room.entity';
import { RoomService } from './services/room/room.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Room])],
  controllers: [],
  providers: [MainGateway, RoomService],
})
export class AppModule {}
