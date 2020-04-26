import { Entity, ObjectID, ObjectIdColumn, Column, Index } from 'typeorm';

@Entity()
export class Session {
  @ObjectIdColumn()
  id: ObjectID;

  @Index()
  @Column()
  socket: string;

  // TODO: Review this column type
  @Index()
  @Column('varchar')
  player: ObjectID;

  // TODO: Review this column type
  @Index()
  @Column('varchar')
  room?: ObjectID;
}
