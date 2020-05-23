import { TokenDto } from '@mimopo/bgpg-core';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { Column, Entity, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Exclude()
@Entity()
export class Token extends TokenDto {
  @Type(() => ObjectID)
  @Transform(v => `${v}`)
  @ObjectIdColumn()
  @Expose()
  id: ObjectID;

  // TODO: Review this column type
  @Index()
  @Column('varchar')
  room: ObjectID;

  @Column()
  @Expose()
  shapes: string[];

  @Column()
  @Expose()
  shape: string;

  @Column()
  @Expose()
  x = 0;

  @Column()
  @Expose()
  y = 0;
}
