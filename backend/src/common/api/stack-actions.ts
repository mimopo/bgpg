import { Stack } from '../model/stack';
import { Token } from '../model/token';

type PullResponse = { token: Token; stack: Stack };
type DivideResponse = { modified: Stack; created: Stack };

/**
 * Available actions to perform with stacks
 */
export interface StackActions {
  /**
   * Randomize tokens
   * @param stackId
   */
  stackShuffle(stackId: Stack['id']): Promise<Stack>;

  /**
   * Move all tokens from one stack to another, then delete the source stack
   * @param destinationId Destination stack id
   * @param sourceId Source stack id
   */
  stackCombine(destinationId: Stack['id'], sourceId: Stack['id']): Promise<Stack>;

  /**
   * Create a new stack getting elements from existing stack
   * @param stackId
   * @param length The number of tokens to get, positive to get them from top or negative to get them from bottom
   */
  stackDivide(stackId: Stack['id'], length: number): Promise<DivideResponse>;

  /**
   * Flip and set all tokens face up or face down
   * @param stackId
   * @param faceUp If true set all the tokens face up, face down otherwise
   */
  stackFlip(stackId: Stack['id'], faceUp: boolean): Promise<Stack>;

  /**
   * Add token to stack
   * @param stackId
   * @param tokenId
   * @param toTop If true the token will be added on top, on the bottom otherwise
   * @param index Index where the token will be added, 0 by default
   */
  stackPush(stackId: Stack['id'], tokenId: Token['id'], toTop?: boolean, index?: number): Promise<Stack>;

  /**
   * Get token from stack
   * @param stackId
   * @param fromTop If true the token will be added on top, on the bottom otherwise
   * @param index Index where the token will be added, 0 by default
   */
  stackPull(stackId: Stack['id'], fromTop?: boolean, index?: number): Promise<PullResponse>;
}
