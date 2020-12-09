import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { Player } from '../common/model/player';
import { Resource } from '../common/model/resource';
import { Room as RoomDto } from '../common/model/room';
import { Token } from '../common/model/token';
import { EntityModel } from '../common/types/entity';

@Entity()
@Exclude()
export class Room implements EntityModel<RoomDto> {
  @Expose()
  @ObjectIdColumn()
  @Transform((v) => `${v}`)
  @Type(() => ObjectId)
  id!: ObjectId;

  @Column()
  @Expose()
  name!: string;

  @Column()
  @Expose()
  game?: Resource;

  @Expose()
  players: Player[] = [];

  @Expose()
  tokens: Token[] = [];
}
