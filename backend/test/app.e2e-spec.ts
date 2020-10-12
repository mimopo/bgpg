import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { connect } from 'socket.io-client';

import { AppModule } from '../src/app.module';

describe('MainGateway (e2e)', () => {
  let app: INestApplication;
  let client: SocketIOClient.Socket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    client = connect(`http://localhost:${port}`, { autoConnect: false });
  });

  afterEach(() => {
    client.removeAllListeners();
    client.close();
  });

  afterAll(async () => {
    await app.close();
  });

  it('connect', async done => {
    client.on('connect', () => {
      done();
    });
    client.connect();
  });
});
