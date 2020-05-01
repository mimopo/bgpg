import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class RoomDto {
  id?: any;

  @IsNotEmpty()
  game!: string;

  @IsNotEmpty()
  name!: string;

  @Type(() => Date)
  created?: Date;
}
