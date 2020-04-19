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
  players: ObjectID[] = [];

  @Column()
  created: Date = new Date();
}
