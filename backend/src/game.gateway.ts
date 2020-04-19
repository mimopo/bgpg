import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';
import { Player } from './entities/player.entity';

const LOBBY = 'lobby';

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connections = 0;
  private game: any;
  private room: any;

  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
  ) {}

  async afterInit() {
    // const room = new Room();
    // room.game = 'parchis';
    // room.name = `Room #${Date.now()}`;
    // await this.roomRepository.save(room);
    // this.room = room.id;
    // const config = require(__dirname + '/../assets/games/parchis.json');
    // const game = new Game();
    // game.shapes = config.shapes;
    // game.dices = config.dices;
    // game.deck = [];
    // game.pieces = config.pieces;
    // game.players = [];
    // game.table = [];
    // game.room = room.id;
    // config.pieces.forEach((piece, i) => {
    //   game.table.push({
    //     element: piece,
    //     attributes: {},
    //     x: i * 10,
    //     y: i * 10,
    //     id: i,
    //   });
    // });
    // await this.gameRepository.save(game);
    // this.game = game.id;
    // console.log('Init', this.game);
  }

  async handleConnection(socket: Socket, ...args: any[]) {
    //
    // await this.joinRoom(socket, LOBBY);
    // const player = new Player();
    // player.name = 'Player #' + socket.client.id.substr(0, 5);
    // player.socketId = socket.client.id;
    // await this.playerRepository.save(player);
    // socket.emit('player', player);
    // const rooms = await this.roomRepository.find();
    // socket.emit('rooms', rooms);
    // this.server.emit('player', player);
    // const game = await this.gameRepository.findOne(this.game);
    // const player: Player = {
    //   id: socket.client.id,
    //   name: `Client ${socket.client.id}`,
    //   cards: [],
    //   hand: 0,
    // };
    // game.players.push(player);
    // await this.gameRepository.save(game);

    // this.server.emit('player', player);
    // this.server.emit('game', game);
    // console.log('connected', game.players.length);
  }

  async handleDisconnect(socket: Socket) {

    // console.log('user disconnected');
    // const game = await this.gameRepository.findOne(this.game);
    // this.removeRecord(game.players, socket.client.id);
    // await this.gameRepository.save(game);
  }

  // @SubscribeMessage('join')
  // async join(socket: Socket, roomId: string): Promise<Room> {
  //   const room = await this.roomRepository.findOneOrFail(roomId);
  //   const player = await this.playerRepository.findOneOrFail({ socketId: socket.client.id });
  //   await this.joinRoom(socket, roomId);
  //   try {
  //     room.players.push(player);
  //     await this.roomRepository.save(room);
  //   } catch (error) {
  //     socket.leave(roomId);
  //     throw new Error();
  //   }
  //   console.log('joined', roomId);
  //   socket.in(roomId).emit('player', player);
  //   return room;
  // }

  async leave(socket: Socket, roomId: string) {
    this.joinRoom(socket, LOBBY);
  }
  // @SubscribeMessage('item')
  // async onItem(client: Socket, item: TableItem<any>) {
  //   client.broadcast.emit('item', item);
  //   const game = await this.gameRepository.findOne(this.game);
  //   this.removeRecord(game.table, item.id);
  //   game.table.push(item);
  //   await this.gameRepository.save(game);
  // }

  // @SubscribeMessage('roll')
  // async onRoll(client: Socket, ids: string[]) {
  //   const game = await this.gameRepository.findOne(this.game);
  //   const dices = ids.map(d => game.dices.find(dice => dice.id === d)).filter(d => !!d);
  //   if (ids.length !== dices.length) {
  //     return;
  //   }
  //   dices.forEach(d => {
  //     d.result = Math.floor(Math.random() * d.faces.length);
  //     this.server.emit('dice', d);
  //   });
  //   await this.gameRepository.save(game);
  // }

  private removeRecord(collection: any[], id: any) {
    const r = collection.find(p => p.id === id);
    if (r) {
      const index = collection.indexOf(r);
      collection.splice(index, 1);
    }
  }

  private async joinRoom(socket: Socket, roomId: string): Promise<void> {
    socket.leaveAll();
    return new Promise((resolve, reject) => {
      socket.join(roomId, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private leaveRoom(socket: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.leave(roomId, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

}
