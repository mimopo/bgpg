import { Test, TestingModule } from '@nestjs/testing';
import { DiceGateway } from './dice.gateway';

describe('DiceGateway', () => {
  let gateway: DiceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiceGateway],
    }).compile();

    gateway = module.get<DiceGateway>(DiceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
