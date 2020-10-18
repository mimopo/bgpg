import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { MainGateway } from './gateways/main.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
