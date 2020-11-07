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
import { Server, Socket } from 'socket.io';

import { Game } from '../common/model/game';
import { Room } from '../common/model/room';
import { PlayerService } from '../services/player/player.service';
import { RoomService } from '../services/room/room.service';
import { SocketUtils } from '../utils/socket-utils';

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway()
export class MainGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server!: Server;
  private readonly logger = new Logger('MainGateway');

  constructor(private roomService: RoomService, private playerService: PlayerService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.verbose(`Client connected    - ${client.id}`);
    const player = await this.playerService.create(client.id);
    SocketUtils.emit(this.server, 'hello', player);
  }

  async handleDisconnect(client: Socket) {
    this.logger.verbose(`Client disconnected - ${client.id}`);
    const player = await this.playerService.find(client.id);
    if (player.roomId) {
      try {
        SocketUtils.emit(client.in(player.roomId), 'playerLeft', player.id);
      } catch (e) {}
    }
    await this.playerService.remove(player.id);
  }

  @SubscribeMessage('createRoom')
  async createRoom(@ConnectedSocket() client: Socket): Promise<Room> {
    const room = await this.roomService.create();
    await SocketUtils.join(client, room.id);
    return room;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): Promise<Room> {
    const room = await this.roomService.find(roomId);
    const player = await this.playerService.find(client.id);
    await this.playerService.joinRoom(player, roomId);
    await SocketUtils.join(client, roomId);
    SocketUtils.emit(client.in(roomId), 'playerJoined', player);
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
    SocketUtils.emit(client.in(roomId), 'playerLeft', player.id);
    return SocketUtils.leave(client, roomId);
  }

  async getGames(search?: string): Promise<Pick<Game, 'id' | 'title' | 'url'>[]> {
    throw new Error('Method not implemented. Search: ' + search);
  }
}
