import { Game } from '../../model/game';
import { ModelUpdate } from '../../types/model-update';
import { Player } from '../../model/player';
import { Room } from '../../model/room';

/**
 * Available actions to perform outside the room
 */
export interface MainActions {
  /**
   * Updates the player's data
   */
  updatePlayer(player: ModelUpdate<Player>): void;

  /**
   * Create an empty room
   */
  createRoom(): Room;

  /**
   * Join into a room
   *
   * @param roomId
   */
  joinRoom(roomId: Room['id']): Room;

  /**
   * List available games
   *
   * @param search Optional query string to filter the list
   */
  getGames(search?: string): Pick<Game, 'id' | 'title' | 'url'>[];
}
