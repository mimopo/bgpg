import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Transform, Type } from 'class-transformer';

import { Room as IRoom } from '../common/model/room';
import { Resource } from '../common/model/resource';

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
