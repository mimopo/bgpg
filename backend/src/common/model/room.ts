import { Player } from './player';
import { Resource } from './resource';
import { Token } from './token';

/**
 * Room where the users joins and play games
 */
export interface Room {
  /** Unique identifier */
  id: string;
  /** Room name */
  name: string;
  /** Current game */
  game?: Resource;
  /** Players into the room */
  players: Player[];
  /** Tokens current status */
  tokens: Token[];
}
