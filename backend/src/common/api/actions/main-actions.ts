import { Game } from '../../model/game';
import { ModelUpdate } from '../../types/model-update';
import { Room } from '../../model/room';
import { JoinResponse } from '../../model/join-response';
import { Player } from '../../model/player';

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
  joinRoom(roomId: Room['id']): JoinResponse;

  /**
   * List available games
   *
   * @param search Optional query string to filter the list
   */
  getGames(search?: string): Pick<Game, 'id' | 'title' | 'url'>[];
}
