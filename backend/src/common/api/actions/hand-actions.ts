import { Player } from '../../model/player';
import { Token } from '../../model/token';

/**
 * Player's hand available actions
 */
export interface HandActions {
  /**
   * Get one Token from another Player's hand
   * @param playerId
   */
  pullToken(playerId: Player['id']): Token;

  /**
   * Add one Token to another Player's hand
   * @param playerId
   */
  pushToken(playerId: Player['id'], token: Token): void;
}
