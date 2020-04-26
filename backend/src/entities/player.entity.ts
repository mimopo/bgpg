import { Column, ObjectIdColumn, ObjectID, Entity } from 'typeorm';

@Entity()
export class Player {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
}
