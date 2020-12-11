import { Token } from '../../model/token';
import { ModelUpdate } from '../../types/model-update';

/**
 * Available Game related actions
 */
export interface GameActions {
  /**
   * Roll a token, it will get a random face.
   *
   * @param tokenId
   * @returns Token properties changed
   */
  roll(tokenId: Token['id']): ModelUpdate<Token>;

  /**
   * Flip a token, it will change the face to it's next face.
   *
   * @param tokenId
   */
  flip(tokenId: Token['id']): ModelUpdate<Token>;

  /**
   * Move token
   *
   * @param tokenId
   * @param x Horizontal position
   * @param y Vertical position
   */
  move(tokenId: Token['id'], x: number, y: number): boolean;

  /**
   * Rotate token
   *
   * @param tokenId
   * @param degrees Rotation status in degrees, from 0 to 359
   */
  rotate(tokenId: Token['id'], degrees: number): boolean;
}
