import { Column, Entity, ObjectIdColumn, ObjectID, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Dice {
  @ObjectIdColumn()
  id: ObjectID;

  // TODO: Review this column type
  @Exclude()
  @Index()
  @Column('varchar')
  room: ObjectID;

  @Column()
  shapes: string[];

  @Column()
  shape: string;
}
