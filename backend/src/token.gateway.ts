import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class TokenGateway {
  @WebSocketServer() private server: Server;

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
