import { ConnectedSocket, MessageBody, OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { Server, Socket } from 'socket.io';

import { Game } from '../common/model/game';
import { Room } from '../common/model/room';

import { RoomService } from '../services/room/room.service';

@WebSocketGateway()
export class MainGateway implements OnGatewayConnection {
  @WebSocketServer() private server!: Server;

  constructor(private roomService: RoomService) {}

  handleConnection(@ConnectedSocket() client: Socket) {}

  @SubscribeMessage('createRoom')
  async createRoom(@ConnectedSocket() client: Socket): Promise<Room> {
    const room = await this.roomService.create();
    return this.join(room, client);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): Promise<Room> {
    const room = await this.roomService.find(roomId);
    return this.join(room, client);
  }

  getGames(search?: string): Promise<Pick<Game, 'id' | 'title' | 'url'>[]> {
    throw new Error('Method not implemented.');
  }

  private async join(room: Room, client: Socket): Promise<Room> {
    return new Promise((resolve, reject) => {
      client.join(room.id, e => {
        e ? reject(e) : resolve(room);
      });
    });
  }
}
