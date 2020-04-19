import { Test, TestingModule } from '@nestjs/testing';
import { TokenGateway } from './token.gateway';

describe('TokenGateway', () => {
  let gateway: TokenGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenGateway],
    }).compile();

    gateway = module.get<TokenGateway>(TokenGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
