import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as io from 'socket.io-client';

import { AppModule } from '../src/app.module';

describe('MainGateway (e2e)', () => {
  const port = process.env.PORT || 3000;
  let app: INestApplication;
  let client: SocketIOClient.Socket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.listen(port);
  });

  beforeEach(() => {
    client = io.connect(`http://localhost:${port}`, { transports: ['websocket'] });
  });

  afterEach(() => {
    client.removeAllListeners();
    client.close();
  });

  afterAll(async () => app.close());

  it('connect', done => {
    client.once('connect', () => done());
  });
});
