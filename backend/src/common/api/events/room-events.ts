import { Game } from '../../model/game';
import { ModelUpdate } from '../../types/model-update';
import { Player } from '../../model/player';

/**
 * Available events to listen into the Room
 */
export interface RoomEvents {
  /**
   * Another player joined into the room
   *
   * @param player
   */
  playerJoined(player: Player): void;

  /**
   * Another player left the room
   *
   * @param playerId
   */
  playerLeft(playerId: Player['id']): void;

  /**
   * Another player has updated their data (position, name, avatar...)
   *
   * @param player A partial Player object with the updated properties
   */
  playerUpdated(player: ModelUpdate<Player>): void;

  /**
   * Game changed by another player
   *
   * @param game
   */
  gameChanged(game: Game): void;

  /**
   * Room name changed by another player
   *
   * @param game
   */
  nameChanged(game: Game): void;

  /**
   * Log message
   *
   * @param message
   */
  log(message: string): void;
}
