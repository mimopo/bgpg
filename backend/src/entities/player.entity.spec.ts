import { classToPlain, plainToClass } from 'class-transformer';

import { Player as PlayerDto } from '../common/model/player';
import { Player } from './player.entity';

describe('MainGateway', () => {
  it('serialization', async () => {
    const plain: Required<PlayerDto> = {
      id: '5fca83864eafd25e47a3200d',
      name: 'name',
      avatar: 'avatar',
      x: 1,
      y: 2,
    };
    const entity = plainToClass(Player, plain, { excludeExtraneousValues: true });
    expect(entity).toBeInstanceOf(Player);
    expect(classToPlain(entity)).toEqual(plain);
  });
});
