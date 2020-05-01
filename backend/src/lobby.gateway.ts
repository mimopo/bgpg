import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { OnModuleDestroy, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { Socket, Server } from 'socket.io';

import { RoomDto } from '@mimopo/bgpg-core';

import { Room } from './entities/room.entity';
import { Player } from './entities/player.entity';
import { Token } from './entities/token.entity';
import { Game } from './model/game.class';
import { Dice } from './entities/dice.entity';
import { Session } from './entities/session.entity';
import { WsExceptionFilter } from 'src/ws-exception.filter';

const LOBBY = 'lobby';

@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(new WsExceptionFilter())
@WebSocketGateway()
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleDestroy {
  @WebSocketServer() private server: Server;

  constructor(
    @InjectRepository(Room) private readonly rooms: Repository<Room>,
    @InjectRepository(Player) private readonly players: Repository<Player>,
    @InjectRepository(Token) private readonly tokens: Repository<Token>,
    @InjectRepository(Dice) private readonly dices: Repository<Dice>,
    @InjectRepository(Session) private readonly sessions: Repository<Session>,
  ) {
    // TODO: Remove room creation
    this.rooms.findOne(1).then(v => {
      if (!v) {
        this.mockRoom();
        this.mockRoom();
      }
    });
  }

  /**
   * Register player's session
   */
  async handleConnection(client: Socket) {
    // TODO: Detect user instead of create a new one
    const player = new Player();
    player.name = 'Player #' + client.client.id.substr(0, 5);
    await this.players.save(player);
    // Create session
    const session = new Session();
    session.socket = client.id;
    session.player = player.id;
    await this.sessions.save(session);
  }

  /**
   * Destroy player's session
   */
  async handleDisconnect(socket: Socket) {
    const session = await this.getSession(socket);
    if (session.room) {
      this.server.in(LOBBY).emit('room.left', session.room);
      this.server.in(`${session.room}`).emit('room.left', session.player);
    }
    await this.sessions.delete(session);
  }

  /**
   * Disconnect socket clients and destroy all sessions
   */
  async onModuleDestroy() {
    await new Promise(resolve => this.server.close(() => resolve()));
    await this.sessions.clear();
  }

  @SubscribeMessage('room.create')
  async create(socket: Socket, room: RoomDto) {
    console.log(room);
    // console.log(room, plainToClass(RoomDto, room));
    return this.mockRoom(room);
  }

  /**
   * Join a room
   */
  @SubscribeMessage('join')
  async joinRoom(socket: Socket, roomId: string) {
    const room = await this.rooms.findOneOrFail(roomId);
    await this.join(socket, room);
    const sessions = await this.sessions.find({ room: room.id });
    const players = await this.players.findByIds(sessions.map(s => s.player));
    return {
      room: room,
      players: players,
      tokens: await this.tokens.find({ room: room.id }),
      dices: await this.dices.find({ room: room.id }),
    };
  }

  /**
   * Go to lobby
   */
  @SubscribeMessage(LOBBY)
  async lobby(socket: Socket): Promise<any[]> {
    await this.join(socket);
    const rooms = await this.rooms.find({
      take: 100,
      order: {
        created: 'DESC',
      },
    });
    // TODO: Optimize queries and write a DTO
    const players = await Promise.all(
      rooms.map(r =>
        this.sessions.count({
          room: r.id,
        }),
      ),
    );
    return rooms.map((r, i) => Object.assign({ players: players[i] }, r));
  }

  /**
   * Join a room and leave the previous room
   */
  private async join(socket: Socket, room?: Room) {
    const session = await this.getSession(socket);
    // Leave
    await this.socketLeave(socket, session.room);
    if (session.room) {
      this.server.in(LOBBY).emit('room.left', session.room);
      this.server.in(`${session.room}`).emit('room.left', session.player);
    }
    // Join
    session.room = room ? room.id : null;
    await this.sessions.save(session);
    await this.socketJoin(socket, session.room);
    if (session.room) {
      this.server.in(LOBBY).emit('room.join', session.room);
      socket.in(`${session.room}`).emit('room.join', session.player);
    }
  }

  /**
   * Get player session
   */
  private async getSession(socket: Socket): Promise<Session> {
    try {
      return await this.sessions.findOneOrFail({ socket: socket.id });
    } catch (e) {
      socket.disconnect();
      throw e;
    }
  }

  /**
   * Leave socket.io room
   */
  private async socketLeave(socket: Socket, roomId?: ObjectID): Promise<void> {
    await new Promise((resolve, reject) => {
      socket.leave(`${roomId}` || LOBBY, (error: any) => {
        return error ? reject(error) : resolve();
      });
    });
  }

  /**
   * Join socket.io room
   */
  private async socketJoin(socket: Socket, roomId?: ObjectID): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.join(`${roomId}` || LOBBY, (error: any) => {
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
    const game = new Game(require(__dirname + '/../static/games/parchis.json'));
    const promises: Promise<any>[] = [];
    for (let id in game.template.tokens) {
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
    for (let id in game.template.dices) {
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
}
