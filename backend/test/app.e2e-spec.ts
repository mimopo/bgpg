import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as io from 'socket.io-client';
import { Connection } from 'typeorm';

import { AppModule } from '../src/app.module';
import { Room } from '../src/common/model/room';

const port = process.env.PORT || 3000;
const client = () => io.connect(`http://localhost:${port}`, { transports: ['websocket'] });

describe('MainGateway (e2e)', () => {
  let app: INestApplication;
  let client1: SocketIOClient.Socket;
  let client2: SocketIOClient.Socket;

  beforeAll(async () => {
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

  it('connect', done => {
    client1.once('connect', () => done());
  });

  it('createRoom: creates a room', done => {
    client1.emit('createRoom', null, (room: Room) => {
      expect(room).toMatchObject<Room>({ id: expect.any(String), name: expect.any(String), players: expect.any(Array) });
      done();
    });
  });

  it('joinRoom: joins room', done => {
    client1.emit('createRoom', null, (created: Room) => {
      client2.emit('joinRoom', created.id, (room: Room) => {
        expect(room).toMatchObject(created);
        done();
      });
    });
  });
});
