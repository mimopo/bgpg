import { Player } from '../model/player';

/**
 * Available events outside the room
 */
export interface MainEvents {
  /**
   * Sends the player his profile
   * @param player
   */
  hello(player: Player): void;
}
