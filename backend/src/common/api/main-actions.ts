import { Game } from '../model/game';
import { Room } from '../model/room';

/**
 * Available actions to perform outside the room
 */
export interface MainActions {
  /**
   * Create an empty room
   */
  createRoom(): Promise<Room>;

  /**
   * Join into a room
   * @param roomId
   */
  joinRoom(roomId: Room['id']): Promise<Room>;

  /**
   * List available games
   * @param search Optional query string to filter the list
   */
  getGames(search?: string): Promise<Pick<Game, 'id' | 'title' | 'url'>[]>;
}
