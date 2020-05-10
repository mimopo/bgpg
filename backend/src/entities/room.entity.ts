import { RoomDto } from '@mimopo/bgpg-core';
import { Type, Transform } from 'class-transformer';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

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
