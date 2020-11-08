import { Game } from '../model/game';
import { Player } from '../model/player';
import { Room } from '../model/room';
import { Token } from '../model/token';
import { ActionsType } from '../types/actions-type';
import { ModelUpdate } from '../types/model-update';

/**
 * Available actions to perform into the Room
 */
export interface RoomActions extends ActionsType {
  /**
   * Updates the player's data
   */
  updatePlayer(player: Partial<Player>): Promise<void>;

  /**
   * Update a room data
   * @param room
   */
  update(room: Room): Promise<Room>;

  /**
   * Changes the current game
   * @param game
   */
  changeGame(game: Game): Promise<void>;

  /**
   * Leave room
   */
  leave(): Promise<void>;

  /**
   * Accept player joining into the room
   * @param playerId
   */
  acceptPlayer(playerId: Player['id']): Promise<void>;

  /**
   * Roll a token, it will get a random face.
   * @param tokenId
   * @returns Token properties changed
   */
  roll(tokenId: Token['id']): Promise<ModelUpdate<Token>>;

  /**
   * Flip a token, it will change the face to it's next face.
   * @param tokenId
   */
  flip(tokenId: Token['id']): Promise<ModelUpdate<Token>>;

  /**
   * Move token
   * @param tokenId
   * @param x Horizontal position
   * @param y Vertical position
   */
  move(tokenId: Token['id'], x: number, y: number): Promise<void>;

  /**
   * Rotate token
   * @param tokenId
   * @param degrees Rotation status in degrees, from 0 to 359
   */
  rotate(tokenId: Token['id'], degrees: number): Promise<void>;
}
