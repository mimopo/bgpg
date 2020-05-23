import { TokenDto } from '@mimopo/bgpg-core';
import { UseFilters, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { classToPlain } from 'class-transformer';
import { Socket, Namespace } from 'socket.io';
import { Repository } from 'typeorm';

import { Token } from './entities/token.entity';
import { WsExceptionFilter } from './ws-exception.filter';

@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(new WsExceptionFilter())
@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway()
export class TokenGateway {
  constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) {}

  @SubscribeMessage('token')
  async handleMessage(client: Socket, update: TokenDto) {
    // TODO: Validate data & securize
    const token = await this.tokenRepository.findOneOrFail(update.id);
    token.x = update.x;
    token.y = update.y;
    token.shape = update.shape;
    await this.tokenRepository.save(token);
    console.log(token);
    this.emit(client.in(`${token.room}`), 'token', token);
  }

  private emit(socket: Socket | Namespace, event: string, data?: any, ack?: () => void): boolean {
    const message = data !== null && typeof data === 'object' ? classToPlain(data) : data;
    if (ack) {
      return socket.emit(event, message, ack);
    } else {
      return socket.emit(event, message);
    }
  }
}
