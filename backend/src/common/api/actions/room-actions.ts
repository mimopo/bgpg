import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { Room } from '../../model/room';

/**
 * Available actions to perform into the Room
 */
export interface RoomActions {
  /**
   * Update a room data
   *
   * @param room
   */
  changeName(room: Room): Room;

  /**
   * Changes the current game
   *
   * @param gameUrl
   */
  changeGame(gameUrl: string): Game;

  /**
   * Leave room
   */
  leave(): void;

  /**
   * Accept player joining into the room
   *
   * @param playerId
   */
  acceptPlayer(playerId: Player['id']): void;
}
