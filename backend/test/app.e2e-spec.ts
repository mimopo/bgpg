import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as io from 'socket.io-client';
import { Connection } from 'typeorm';

import { AppModule } from '../src/app.module';
import { JoinResponse } from '../src/common/model/join-response';
import { Player } from '../src/common/model/player';
import { Room } from '../src/common/model/room';

const port = process.env.PORT || 3000;
const client = () => io.connect(`http://localhost:${port}`, { transports: ['websocket'] });

describe('MainGateway (e2e)', () => {
  let app: INestApplication;
  let client1: SocketIOClient.Socket;
  let client2: SocketIOClient.Socket;

  beforeAll(async () => {
    Logger.overrideLogger(['error']);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.listen(port);
  });

  beforeEach(async () => {
    const dbConnection = app.get(Connection);
    await dbConnection.dropDatabase();
    await dbConnection.synchronize();
    client1 = client();
    client2 = client();
  });

  afterEach(() => {
    client1.removeAllListeners();
    client1.close();
    client2.removeAllListeners();
    client2.close();
  });

  afterAll(async () => app.close());

  it('database connection', () => {
    expect(app.get(Connection).isConnected).toBeTruthy();
  });

  // GATEWAY

  it('client connection', (done) => {
    client1.once('connect', () => done());
  });

  it('creates a user when connect', (done) => {
    client1.once('hello', (player: Player) => {
      expect(player).toEqual<Player>({
        id: expect.any(String),
        name: expect.any(String),
      });
      done();
    });
  });

  it('updates the user name', (done) => {
    client1.once('hello', (player: Player) => {
      expect(player).toEqual<Player>({
        id: expect.any(String),
        name: expect.any(String),
      });
      done();
    });
  });

  it('creates a room', (done) => {
    client1.emit('createRoom', (room: Room) => {
      expect(room).toEqual<Room>({ id: expect.any(String), name: expect.any(String) });
      done();
    });
  });

  fit('joins into a room', (done) => {
    client1.once('hello', (player: Player) => {
      client1.emit('createRoom', (created: Room) => {
        client2.emit('joinRoom', created.id, (response: JoinResponse) => {
          expect(response).toEqual({
            room: created,
            players: [player],
            tokens: [],
          });
          done();
        });
      });
    });
  });

  it('another player joins the room', (done) => {
    client1.emit('createRoom', (created: Room) => {
      client1.on('playerJoined', (player: Player) => {
        expect(player).toEqual<Player>({
          id: expect.any(String),
          name: expect.any(String),
        });
        done();
      });
      client2.emit('joinRoom', created.id);
    });
  });

  it('another player leaves the room', (done) => {
    client1.emit('createRoom', (created: Room) => {
      client1.on('playerJoined', (player: Player) => {
        const id = player.id;
        client1.on('playerLeft', (playerId: string) => {
          expect(playerId).toBe(id);
          done();
        });
      });
      client2.emit('joinRoom', created.id, () => {
        client2.emit('leaveRoom');
      });
    });
  });

  it('another player leaves the room when disconnected', (done) => {
    client1.emit('createRoom', (created: Room) => {
      client1.on('playerJoined', (player: Player) => {
        const id = player.id;
        client1.on('playerLeft', (playerId: string) => {
          expect(playerId).toBe(id);
          done();
        });
      });
      client2.emit('joinRoom', created.id, () => {
        client2.disconnect();
      });
    });
  });
});
