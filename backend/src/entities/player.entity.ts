import { PlayerDto } from '@mimopo/bgpg-core';
import { Type, Transform, Exclude } from 'class-transformer';
import { Entity, ObjectID, ObjectIdColumn, Column, Index } from 'typeorm';

@Entity()
export class Player extends PlayerDto {
  @Type(() => ObjectID)
  @Transform(v => `${v}`)
  @ObjectIdColumn()
  id: ObjectID;

  @Exclude()
  @Index()
  @Column()
  socket: string;

  @Column()
  name: string;

  // TODO: Review this column type
  @Exclude()
  @Index()
  @Column('varchar')
  room?: ObjectID;
}
