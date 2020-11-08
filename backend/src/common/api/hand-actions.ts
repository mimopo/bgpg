import { Player } from '../model/player';
import { Token } from '../model/token';
import { ActionsType } from '../types/actions-type';

/**
 * Player's hand available actions
 */
export interface HandActions extends ActionsType {
  /**
   * Get one Token from another Player's hand
   * @param playerId
   */
  pullToken(playerId: Player['id']): Promise<Token>;

  /**
   * Add one Token to another Player's hand
   * @param playerId
   */
  pushToken(playerId: Player['id'], token: Token): Promise<void>;
}
