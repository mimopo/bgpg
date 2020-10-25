import { Player } from 'src/common/model/player';
import { Room as IRoom } from 'src/common/model/room';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Room implements IRoom {
  @ObjectIdColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  players: Player[] = [];
}
