import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Transform, Type } from 'class-transformer';

import { Room as IRoom } from 'src/common/model/room';

@Entity()
export class Room implements IRoom {
  @ObjectIdColumn()
  @Type(() => ObjectID)
  @Transform(v => `${v}`)
  id!: string;

  @Column()
  name!: string;
}
