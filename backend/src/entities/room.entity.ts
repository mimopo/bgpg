import { RoomDto } from '@mimopo/bgpg-core';
import { Type, Transform, Exclude, Expose } from 'class-transformer';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Exclude()
@Entity()
export class Room extends RoomDto {
  @Type(() => ObjectID)
  @Transform(v => `${v}`)
  @ObjectIdColumn()
  @Expose()
  id: ObjectID;

  @Column()
  @Expose()
  game: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  created: Date = new Date();
}
