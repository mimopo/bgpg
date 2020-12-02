import { Player } from './player';
import { Room } from './room';
import { Token } from './token';

export interface JoinResponse {
  room: Room;
  players: Player[];
  tokens: Token[];
}
