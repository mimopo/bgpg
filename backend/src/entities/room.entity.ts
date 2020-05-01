import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Type, Transform } from 'class-transformer';

import { RoomDto } from '@mimopo/bgpg-core';

@Entity()
export class Room extends RoomDto {
  @Type(() => ObjectID)
  @Transform(v => `${v}`)
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  game: string;

  @Column()
  name: string;

  @Column()
  created: Date = new Date();
}
