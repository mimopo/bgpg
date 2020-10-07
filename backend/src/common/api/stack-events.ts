import { Stack } from '../model/stack';
import { Token } from '../model/token';
import { PartialModel } from '../types/partial-model';

/**
 * Available stack events to listen
 */
export interface StackEvents {
  /**
   * Stack created
   * @param stack
   */
  stackCreated(stack: Stack): void;

  /**
   * Stack removed
   * @param stackId
   */
  stackRemoved(stackId: Stack['id']): void;

  /**
   * Stack updated
   * @param stack A partial Stack object with the updated properties
   */
  stackUpdated(stack: PartialModel<Stack>): void;

  /**
   * Token added
   * @param stack
   */
  tokenAdded(stack: Token): void;

  /**
   * Token removed
   * @param stackId
   */
  tokenRemoved(stackId: Stack['id']): void;
}
