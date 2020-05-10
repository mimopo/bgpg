import { IsNotEmpty, Matches, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RoomDto {
  @IsMongoId()
  @IsOptional()
  id?: any;

  @IsNotEmpty()
  @Matches(new RegExp(/^[a-z0-9-]+$/), { message: 'game must have only lowercase letters, numbers and hyphens' })
  game!: string;

  @IsNotEmpty()
  name!: string;

  @Type(() => Date)
  created?: Date;
}
