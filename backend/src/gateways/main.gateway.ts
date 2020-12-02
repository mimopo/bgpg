/** eslint import/order: ["error", {"newlines-between": "always"}] */
import { ClassSerializerInterceptor, Logger, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { classToPlain } from 'class-transformer';

import { Game } from '../common/model/game';
import { Gateway } from '../common/types/gateway';
import { MainActions } from '../common/api/actions/main-actions';
import { ModelUpdate } from '../common/types/model-update';
import { Player } from '../common/model/player';
import { PlayerService } from '../services/player/player.service';
import { Room } from '../common/model/room';
import { RoomService } from '../services/room/room.service';
import { SocketUtils } from '../utils/socket-utils';
import { WsExceptionFilter } from '../filters/ws-exception.filter';
import { JoinResponse } from '../common/model/join-response';

/**
 * This Gateway handles the actions that can be performed outside of a room
 */
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(WsExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
@WebSocketGateway()
export class MainGateway implements OnGatewayConnection, OnGatewayDisconnect, Gateway<MainActions> {
  @WebSocketServer() private server!: Server;
  private readonly logger = new Logger('MainGateway');

  constructor(private roomService: RoomService, private playerService: PlayerService) {}

  @SubscribeMessage('updatePlayer')
  async updatePlayer(client: Socket, update: ModelUpdate<Player>): Promise<void> {
    const player = await this.playerService.update(update);
    if (player.roomId) {
      SocketUtils.emit(client.in(player.roomId), 'playerUpdated', update);
    }
  }

  @SubscribeMessage('createRoom')
  async createRoom(client: Socket): Promise<Room> {
    const room = await this.roomService.create();
    const player = await this.playerService.find(client.id);
    await this.playerService.joinRoom(player, room.id);
    await SocketUtils.join(client, room.id);
    return room;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, roomId: string): Promise<JoinResponse> {
    const [player, room, players, tokens] = await Promise.all([
      this.playerService.find(client.id),
      this.roomService.find(roomId),
      this.playerService.findByRoomId(roomId),
      Promise.resolve([]),
    ]);
    await this.playerService.joinRoom(player, roomId);
    await SocketUtils.join(client, roomId);
    SocketUtils.emit(client.in(roomId), 'playerJoined', player);
    return {
      room,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      players: players.map((p) => classToPlain(p)) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tokens: tokens.map((t) => classToPlain(t)) as any,
    };
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

  async handleConnection(client: Socket): Promise<void> {
    this.logger.verbose(`Client connected    - ${client.id}`);
    const player = await this.playerService.create(client.id);
    SocketUtils.emit(this.server, 'hello', player);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    this.logger.verbose(`Client disconnected - ${client.id}`);
    try {
      const player = await this.playerService.find(client.id);
      if (player.roomId) {
        SocketUtils.emit(client.in(player.roomId), 'playerLeft', player.id);
      }
      await this.playerService.remove(player.id);
    } catch (e) {}
  }

  async getGames(client: Socket, search?: string): Promise<Pick<Game, 'id' | 'title' | 'url'>[]> {
    throw new Error('Method not implemented. Search: ' + search);
  }
}
