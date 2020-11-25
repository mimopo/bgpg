import { ModelUpdate } from '../../types/model-update';
import { Token } from '../../model/token';

/**
 * Available Game events
 */
export interface GameEvents {
  /**
   * Token updated by another player (moved, flipped, rolled, rotation, etc.)
   * @param token A partial Token object with the updated properties
   */
  tokenUpdated(token: ModelUpdate<Token>): void;
}
