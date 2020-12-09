import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

import { Player as PlayerDto } from '../common/model/player';
import { EntityModel } from '../common/types/entity';

@Entity()
@Exclude()
export class Player implements EntityModel<PlayerDto> {
  /** Internal id, typeorm needs a column with the @ObjectIdColumn() */
  @ObjectIdColumn()
  _id!: ObjectId;

  /** Player id will match with the socket client id */
  @Column({ unique: true })
  @Expose()
  id!: string;

  @Column()
  @Expose()
  name!: string;

  @Column()
  @Expose()
  avatar?: string;

  /** Room where the player is */
  @Index()
  @Column()
  @Exclude()
  roomId?: ObjectId;

  @Expose()
  x?: number;

  @Expose()
  y?: number;
}
