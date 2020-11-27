import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Player as IPlayer } from '../common/model/player';

@Entity()
export class Player implements IPlayer {
  /** Internal id, typeorm needs a column with the @ObjectIdColumn() */
  @ObjectIdColumn()
  @Exclude()
  _id!: string;

  /** Player id will match with the socket client id */
  @Column({ unique: true })
  id!: string;

  @Column()
  name!: string;

  @Column()
  avatar?: string;

  /** Room where the player is */
  @Index()
  @Column('varchar')
  @Exclude()
  roomId?: string;

  x?: number;

  y?: number;
}
