import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  game: string;

  @Column()
  name: string;

  @Column()
  created: Date = new Date();
}
