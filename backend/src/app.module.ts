import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { Room } from './entities/room.entity';
import { MainGateway } from './gateways/main.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Room])],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
