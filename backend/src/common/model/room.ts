import { Player } from './player';

/**
 * Room where the users joins and play games
 */
export interface Room {
  /** Unique identifier */
  id: string;
  /** Room name */
  name: string;
  /** Players joined */
  players: Player[];
}
