import { PlayerDto } from '@mimopo/bgpg-core';
import { Type, Transform, Exclude, Expose } from 'class-transformer';
import { Entity, ObjectID, ObjectIdColumn, Column, Index } from 'typeorm';

@Exclude()
@Entity()
export class Player extends PlayerDto {
  @Type(() => ObjectID)
  @Transform(v => `${v}`)
  @ObjectIdColumn()
  @Expose()
  id: ObjectID;

  @Index()
  @Column()
  socket: string;

  @Column()
  @Expose()
  name: string;

  // TODO: Review this column type
  @Index()
  @Column('varchar')
  room?: ObjectID;
}
