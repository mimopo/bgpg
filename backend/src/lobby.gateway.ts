import { RoomDto, PlayerDto } from '@mimopo/bgpg-core';
import { OnModuleDestroy, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WsException } from '@nestjs/websockets';
import { classToPlain, deserialize } from 'class-transformer';
import { validate } from 'class-validator';
import { Server, Socket, Namespace } from 'socket.io';
import { ObjectID, Repository } from 'typeorm';

import { Dice } from './entities/dice.entity';
import { Player } from './entities/player.entity';
import { Room } from './entities/room.entity';
import { Token } from './entities/token.entity';
import { Game } from './model/game.class';
import { WsExceptionFilter } from './ws-exception.filter';

@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(new WsExceptionFilter())
@WebSocketGateway()
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleDestroy {
  @WebSocketServer() private server: Server;

  constructor(
    @InjectRepository(Room) private readonly rooms: Repository<Room>,
    @InjectRepository(Token) private readonly tokens: Repository<Token>,
    @InjectRepository(Dice) private readonly dices: Repository<Dice>,
    @InjectRepository(Player) private readonly players: Repository<Player>,
  ) {}

  /**
   * Register player's session
   */
  async handleConnection(socket: Socket) {
    const profile = deserialize(PlayerDto, socket.handshake.query.player);
    const invalid = profile && (await validate(profile));
    const player = new Player();
    const name = invalid ? profile.name : 'Player #' + socket.id.substr(0, 5);
    player.socket = socket.id;
    player.name = name;
    await this.players.save(player);
    this.emit(socket, 'login', classToPlain(player));
    console.log(player);
  }

  /**
   * Destroy player's session
   */
  async handleDisconnect(socket: Socket) {
    const session = await this.getPlayer(socket);
    if (session.room) {
      this.emit(this.server.in(`${session.room}`), 'room.left', session.id);
    }
    await this.players.delete(session);
  }

  /**
   * Disconnect socket clients and destroy all sessions
   */
  async onModuleDestroy() {
    await new Promise(resolve => this.server.close(() => resolve()));
    await this.players.clear();
  }

  @SubscribeMessage('player.profile')
  async profile(socket: Socket, profile: PlayerDto): Promise<PlayerDto> {
    const player = await this.getPlayer(socket);
    player.name = profile.name;
    return this.players.save(player);
  }

  @SubscribeMessage('room.create')
  async create(socket: Socket, room: RoomDto): Promise<RoomDto> {
    return this.mockRoom(room);
  }

  /**
   * Join a room
   */
  @SubscribeMessage('room.join')
  async joinRoom(socket: Socket, roomId: string) {
    const room = await this.rooms.findOneOrFail(roomId);
    await this.join(socket, room);
    return {
      room: room,
      players: await this.players.find({ room: room.id }),
      tokens: await this.tokens.find({ room: room.id }),
      dices: await this.dices.find({ room: room.id }),
    };
  }

  /**
   * Leave a room
   */
  @SubscribeMessage('room.leave')
  async leaveRoom(socket: Socket): Promise<true> {
    const session = await this.getPlayer(socket);
    if (session.room) {
      session.room = null;
      await this.players.save(session);
      await this.socketLeave(socket, session.room);
      this.emit(this.server.in(`${session.room}`), 'room.left', session.id);
    }
    return true;
  }

  /**
   * Join a room and leave the previous room
   */
  private async join(socket: Socket, room?: Room) {
    const session = await this.getPlayer(socket);
    // Leave
    if (session.room) {
      await this.socketLeave(socket, session.room);
      this.emit(this.server.in(`${session.room}`), 'room.left', session.id);
    }
    // Join
    session.room = room ? room.id : null;
    await this.players.save(session);
    await this.socketJoin(socket, session.room);
    if (session.room) {
      this.emit(socket.in(`${session.room}`), 'room.join', session.id);
    }
  }

  /**
   * Get player
   */
  private async getPlayer(socket: Socket): Promise<Player> {
    try {
      return await this.players.findOneOrFail({ socket: socket.id });
    } catch (e) {
      socket.disconnect();
      throw e;
    }
  }

  /**
   * Leave socket.io room
   */
  private async socketLeave(socket: Socket, roomId: ObjectID): Promise<void> {
    await new Promise((resolve, reject) => {
      socket.leave(`${roomId}`, (error: any) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  /**
   * Join socket.io room
   */
  private async socketJoin(socket: Socket, roomId: ObjectID): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.join(`${roomId}`, (error: any) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  // TODO: Delete mock
  private async mockRoom(r?: RoomDto) {
    const room = new Room();
    room.game = r.game;
    room.name = r.name;
    await this.rooms.save(room);
    let data: Game;
    try {
      data = require(__dirname + '/../static/games/' + r.game + '.json');
    } catch (e) {
      throw new WsException('Game not available.');
    }
    const game = new Game(data);
    const promises: Promise<any>[] = [];
    for (const id in game.template.tokens) {
      const template = game.template.tokens[id];
      for (let i = 0; i < template.quantity; i++) {
        const token = new Token();
        token.room = room.id;
        token.shapes = template.shapes;
        token.shape = template.shape;
        token.x = template.x;
        token.y = template.y;
        promises.push(this.tokens.save(token));
      }
    }
    for (const id in game.template.dices) {
      const template = game.template.dices[id];
      for (let i = 0; i < template.quantity; i++) {
        const dice = new Dice();
        dice.room = room.id;
        dice.shape = template.shape;
        dice.shapes = template.shapes;
        promises.push(this.dices.save(dice));
      }
    }
    await Promise.all(promises);
    return room;
  }

  private emit(socket: Socket | Namespace, event: string, data?: any, ack?: () => void): boolean {
    const message = data !== null && typeof data === 'object' ? classToPlain(data) : data;
    return socket.emit(event, message, ack);
  }
}
