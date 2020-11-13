import { Game } from '../model/game';
import { Player } from '../model/player';
import { Room } from '../model/room';
import { Token } from '../model/token';
import { ModelUpdate } from '../types/model-update';

/**
 * Available actions to perform into the Room
 */
export interface RoomActions {
  /**
   * Updates the player's data
   */
  updatePlayer(player: Partial<Player>): void;

  /**
   * Update a room data
   * @param room
   */
  update(room: Room): Room;

  /**
   * Changes the current game
   * @param game
   */
  changeGame(game: Game): void;

  /**
   * Leave room
   */
  leave(): void;

  /**
   * Accept player joining into the room
   * @param playerId
   */
  acceptPlayer(playerId: Player['id']): void;

  /**
   * Roll a token, it will get a random face.
   * @param tokenId
   * @returns Token properties changed
   */
  roll(tokenId: Token['id']): ModelUpdate<Token>;

  /**
   * Flip a token, it will change the face to it's next face.
   * @param tokenId
   */
  flip(tokenId: Token['id']): ModelUpdate<Token>;

  /**
   * Move token
   * @param tokenId
   * @param x Horizontal position
   * @param y Vertical position
   */
  move(tokenId: Token['id'], x: number, y: number): void;

  /**
   * Rotate token
   * @param tokenId
   * @param degrees Rotation status in degrees, from 0 to 359
   */
  rotate(tokenId: Token['id'], degrees: number): void;
}
