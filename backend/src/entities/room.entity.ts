import { Transform, Type } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { Resource } from '../common/model/resource';
import { Room as IRoom } from '../common/model/room';

@Entity()
export class Room implements IRoom {
  @ObjectIdColumn()
  @Type(() => ObjectID)
  @Transform((v) => `${v}`)
  id!: string;

  @Column()
  name!: string;

  @Column()
  game?: Resource;
}
