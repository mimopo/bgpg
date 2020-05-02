import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';

import { Token } from './entities/token.entity';


@WebSocketGateway()
export class TokenGateway {
  constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) {}

  @SubscribeMessage('token')
  async handleMessage(client: Socket, update: Token) {
    // TODO: Validate data & securize
    const token = await this.tokenRepository.findOneOrFail(update.id);
    token.x = update.x;
    token.y = update.y;
    token.shape = update.shape;
    await this.tokenRepository.save(token);
    client.in(`${update.room}`).emit('token', token);
  }
}
