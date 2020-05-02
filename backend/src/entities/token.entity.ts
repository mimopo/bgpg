import { Column, Entity, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Entity()
export class Token {
  @ObjectIdColumn()
  id: ObjectID;

  // TODO: Review this column type
  @Index()
  @Column('varchar')
  room: ObjectID;

  @Column()
  shapes: string[];

  @Column()
  shape: string;

  @Column()
  x = 0;

  @Column()
  y = 0;
}
