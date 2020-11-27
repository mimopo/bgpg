import { Token } from '../../model/token';

/**
 * Player's hand available events
 */
export interface HandEvents {
  /**
   * Token added by another Player to your hand
   *
   * @param token
   */
  tokenAdded(token: Token): void;

  /**
   * Token removed by another Player from your hand
   *
   * @param tokenId
   */
  tokenRemoved(tokenId: Token['id']): void;
}
