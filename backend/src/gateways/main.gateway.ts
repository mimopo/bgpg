import { ClassSerializerInterceptor, Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { classToPlain } from 'class-transformer';
import { Server, Socket } from 'socket.io';

import { Game } from '../common/model/game';
import { Room } from '../common/model/room';
import { PlayerService } from '../services/player/player.service';
import { RoomService } from '../services/room/room.service';

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway()
export class MainGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server!: Server;
  private readonly logger = new Logger('MainGateway');

  constructor(private roomService: RoomService, private playerService: PlayerService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.verbose(`Client connected    - ${client.id}`);
    const player = await this.playerService.create(client.id);
    this.emit(this.server, 'hello', player);
  }

  async handleDisconnect(client: Socket) {
    this.logger.verbose(`Client disconnected - ${client.id}`);
    try {
      const player = await this.playerService.find(client.id);
      if (player.roomId) {
        this.emit(client.in(player.roomId), 'playerLeft', player.id);
      }
      await this.playerService.remove(player.id);
    } catch (e) {}
  }

  @SubscribeMessage('createRoom')
  async createRoom(@ConnectedSocket() client: Socket): Promise<Room> {
    const room = await this.roomService.create();
    await this.join(room.id, client);
    return room;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): Promise<Room> {
    const room = await this.roomService.find(roomId);
    const player = await this.playerService.find(client.id);
    await this.playerService.joinRoom(player, roomId);
    await this.join(roomId, client);
    this.emit(client.in(roomId), 'playerJoined', player);
    return room;
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(@ConnectedSocket() client: Socket): Promise<void> {
    const player = await this.playerService.find(client.id);
    const roomId = player.roomId;
    if (!roomId) {
      throw new Error(`Player isn't in a room`);
    }
    await this.playerService.leaveRoom(player);
    this.emit(client.in(roomId), 'playerLeft', player.id);
    return this.leave(roomId, client);
  }

  getGames(search?: string): Promise<Pick<Game, 'id' | 'title' | 'url'>[]> {
    throw new Error('Method not implemented. Your search is ' + search);
  }

  private async join(roomId: string, client: Socket): Promise<void> {
    return new Promise((resolve, reject) => {
      client.join(roomId, e => {
        e ? reject(e) : resolve();
      });
    });
  }

  private async leave(roomId: string, client: Socket): Promise<void> {
    return new Promise((resolve, reject) => {
      client.leave(roomId, (e: any) => {
        e ? reject(e) : resolve();
      });
    });
  }

  private emit(socket: { emit: Socket['emit'] | Server['emit'] }, event: string, data?: any, ack?: () => void): boolean {
    const message = data !== null && typeof data === 'object' ? classToPlain(data) : data;
    if (ack) {
      return !!socket.emit(event, message, ack);
    } else {
      return !!socket.emit(event, message);
    }
  }
}
