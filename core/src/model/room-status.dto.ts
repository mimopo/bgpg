import { Type } from 'class-transformer';

import { DiceDto } from './dice.dto';
import { PlayerDto } from './player.dto';
import { RoomDto } from './room.dto';
import { TokenDto } from './token.dto';

export class RoomStatusDto {
  room!: RoomDto;

  @Type(() => PlayerDto)
  players!: PlayerDto[];

  @Type(() => TokenDto)
  tokens!: TokenDto[];

  @Type(() => DiceDto)
  dices!: DiceDto[];
}
