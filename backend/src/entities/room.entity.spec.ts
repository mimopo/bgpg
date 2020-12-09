import { classToPlain, plainToClass } from 'class-transformer';

import { Room as RoomDto } from '../common/model/room';
import { Room } from './room.entity';

fdescribe('MainGateway', () => {
  it('serialization', () => {
    const plain: Required<RoomDto> = {
      id: '5fca83864eafd25e47a3200d',
      name: 'name',
      game: {
        md5checksum: 'md5',
        url: 'http://hello.world',
      },
      players: [],
      tokens: [],
    };
    const entity = plainToClass(Room, plain, { excludeExtraneousValues: true });
    expect(entity).toBeInstanceOf(Room);
    expect(classToPlain(entity)).toEqual(plain);
  });
});
