import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { Socket, Server } from 'socket.io';

import { Room } from './entities/room.entity';
import { Player } from './entities/player.entity';
import { Token } from './entities/token.entity';
import { Game } from './model/game.class';
import { Dice } from './entities/dice.entity';

const LOBBY = 'lobby';

@WebSocketGateway()
export class LobbyGateway implements OnGatewayConnection {
  @WebSocketServer() private server: Server;

  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    @InjectRepository(Dice) private readonly diceRepository: Repository<Dice>,
  ) {
    // TODO: Remove room creation
    this.roomRepository.findOne(1).then(v => { 
      if (!v) { 
        this.mockRoom();
        this.mockRoom();
      } 
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    // TODO: Detect user instead of create a new one
    const player = new Player();
    player.name = 'Player #' + client.client.id.substr(0, 5);
    player.socketId = client.client.id;
    this.playerRepository.save(player);
  }

  @SubscribeMessage('join')
  async join(client: Socket, roomId: string) {
    // Join - Leave rooms
    const player = await this.playerRepository.findOneOrFail({ socketId: client.client.id });
    const room = await this.dbJoinRoom(player.id, roomId);
    await this.leaveAllRooms(client);
    await this.joinRoom(client, roomId);
    client.on('disconnect', () => this.dbLeaveRoom(player.id, roomId));
    // Send room update to the other users in the room
    client.in(roomId).emit('room', room);
    // Send room update to the lobby
    this.server.in(LOBBY).emit('room', room);
    // Send tokens to the user
    return {
      room: room,
      tokens: await this.tokenRepository.find({ room: room.id }),
      dices: await this.diceRepository.find({ room: room.id }),
    };
  }

  @SubscribeMessage(LOBBY)
  async lobby(client: Socket): Promise<Room[]> {
    await this.leaveAllRooms(client);
    await this.joinRoom(client, LOBBY);
    return await this.roomRepository.find();
  }

  private async leaveAllRooms(client: Socket) {
    const player = await this.playerRepository.findOneOrFail({ socketId: client.client.id });
    for (let roomId in client.rooms) {
      // await repository.updateOne({ _id: roomId }, { $pull: { players: player.id } });
      if (![client.client.id, LOBBY].includes(roomId)) {
        await this.dbLeaveRoom(player.id, roomId);
      }
      await this.leaveRoom(client, roomId);
    }
  }

  // TODO: Move to a repository
  private async dbJoinRoom(playerId: ObjectID, roomId: string): Promise<Room> {
    const room = await this.roomRepository.findOneOrFail(roomId);
    room.players.push(playerId);
    return this.roomRepository.save(room);
  }

  // TODO: Move to a repository
  private async dbLeaveRoom(playerId: ObjectID, roomId: string): Promise<Room> {
    const room = await this.roomRepository.findOne(roomId);
    if (room) {
      room.players = room.players.filter(p => !p.equals(playerId));
      await this.roomRepository.save(room);
      this.server.in(LOBBY).emit('room', room);
    }
    return room;
  }

  private async leaveRoom(socket: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.leave(roomId, error => {
        return error ? reject(error) : resolve();
      });
    });
  }

  private async joinRoom(socket: Socket, roomId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.join(roomId, error => {
        return error ? reject(error) : resolve();
      });
    });
  }

  // TODO: Delete mock
  private async mockRoom() {
    const room = new Room();
    room.game = 'parchis';
    room.name = 'Room #' + Math.random();
    await this.roomRepository.save(room);
    const game = new Game(require(__dirname + '/../static/games/parchis.json'));
    for (let id in game.template.tokens) {
      const template = game.template.tokens[id];
      for (let i = 0; i < template.quantity; i++) {
        const token = new Token();
        token.room = room.id;
        token.shapes = template.shapes;
        token.shape = template.shape;
        token.x = template.x;
        token.y = template.y;
        this.tokenRepository.save(token);
      }
    }
    for (let id in game.template.dices) {
      const template = game.template.dices[id];
      for (let i = 0; i < template.quantity; i++) {
        const dice = new Dice();
        dice.room = room.id;
        dice.shape = template.shape;
        dice.shapes = template.shapes;
        this.diceRepository.save(dice);
      }
    }
  }
}
