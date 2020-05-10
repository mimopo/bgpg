import { IsNotEmpty, IsMongoId } from 'class-validator';

export class PlayerDto {
  @IsMongoId()
  id?: any;

  @IsNotEmpty()
  name!: string;
}
