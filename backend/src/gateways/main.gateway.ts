import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { Server, Socket } from 'socket.io';

import { Game } from '../common/model/game';
import { Room } from '../common/model/room';

import { RoomService } from '../services/room/room.service';

@WebSocketGateway()
export class MainGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server!: Server;
  private readonly logger = new Logger('MainGateway');

  constructor(private roomService: RoomService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.verbose(`Client connected    - ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.verbose(`Client disconnected - ${client.id}`);
  }

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
    throw new Error('Method not implemented. Your search is ' + search);
  }

  private async join(room: Room, client: Socket): Promise<Room> {
    return new Promise((resolve, reject) => {
      client.join(room.id, e => {
        e ? reject(e) : resolve(room);
      });
    });
  }
}
