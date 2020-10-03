import { Game } from "../model/game";
import { Player } from "../model/player";
import { Token } from "../model/token";
import { PartialModel } from "../types";

/**
 * Available events to listen into the Room
 */
export interface RoomEvents {
  /**
   * Another player joined into the room
   * @param player
   */
  playerJoined(player: Player): void;

  /**
   * Another player left the room
   * @param playerId
   */
  playerLeft(playerId: Player["id"]): void;

  /**
   * Another player has updated their data (position, name, avatar...)
   * @param player A partial Player object with the updated properties
   */
  playerUpdated(player: PartialModel<Player>): void;

  /**
   * Game changed by another player
   * @param game
   */
  gameChanged(game: Game): void;

  /**
   * Token updated by another player (moved, flipped, rolled, rotation, etc.)
   * @param token A partial Token object with the updated properties
   */
  tokenUpdated(token: PartialModel<Token>): void;

  /**
   * Log message
   * @param message
   */
  log(message: string): void;
}
