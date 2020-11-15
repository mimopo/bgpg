import { ClassSerializerInterceptor, Logger, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { Server, Socket } from 'socket.io';

import { MainActions } from '../common/api/main-actions';
import { Game } from '../common/model/game';
import { Player } from '../common/model/player';
import { Room } from '../common/model/room';
import { Gateway } from '../common/types/gateway';
import { ModelUpdate } from '../common/types/model-update';
import { WsExceptionFilter } from '../filters/ws-exception.filter';
import { PlayerService } from '../services/player/player.service';
import { RoomService } from '../services/room/room.service';
import { SocketUtils } from '../utils/socket-utils';

@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(WsExceptionFilter)
@WebSocketGateway()
export class MainGateway implements OnGatewayConnection, OnGatewayDisconnect, Gateway<MainActions> {
  @WebSocketServer() private server!: Server;
  private readonly logger = new Logger('MainGateway');

  constructor(private roomService: RoomService, private playerService: PlayerService) {}

  async handleConnection(client: Socket) {
    this.logger.verbose(`Client connected    - ${client.id}`);
    const player = await this.playerService.create(client.id);
    SocketUtils.emit(this.server, 'hello', player);
  }

  async handleDisconnect(client: Socket) {
    this.logger.verbose(`Client disconnected - ${client.id}`);
    try {
      const player = await this.playerService.find(client.id);
      if (player.roomId) {
        SocketUtils.emit(client.in(player.roomId), 'playerLeft', player.id);
      }
      await this.playerService.remove(player.id);
    } catch (e) {}
  }

  @SubscribeMessage('createRoom')
  async createRoom(client: Socket): Promise<Room> {
    const room = await this.roomService.create();
    await SocketUtils.join(client, room.id);
    return room;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, roomId: string): Promise<Room> {
    const room = await this.roomService.find(roomId);
    const player = await this.playerService.find(client.id);
    await this.playerService.joinRoom(player, roomId);
    await SocketUtils.join(client, roomId);
    SocketUtils.emit(client.in(roomId), 'playerJoined', player);
    return room;
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket): Promise<void> {
    const player = await this.playerService.find(client.id);
    const roomId = player.roomId;
    if (!roomId) {
      throw new Error(`Player isn't in a room`);
    }
    await this.playerService.leaveRoom(player);
    SocketUtils.emit(client.in(roomId), 'playerLeft', player.id);
    return SocketUtils.leave(client, roomId);
  }

  async getGames(client: Socket, search?: string): Promise<Pick<Game, 'id' | 'title' | 'url'>[]> {
    throw new Error('Method not implemented. Search: ' + search);
  }

  async updatePlayer(client: Socket, update: ModelUpdate<Player>): Promise<void> {
    const player = await this.playerService.update(update);
    if (player.roomId) {
      SocketUtils.emit(client.in(player.roomId), 'playerUpdated', update);
    }
  }
}
