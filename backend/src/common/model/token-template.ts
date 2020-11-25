/**
 * Token Template
 *
 * This interface is converted to json-schema using typescript-json-schema
 * @see https://github.com/YousefED/typescript-json-schema#readme
 */
export interface TokenTemplate {
  /**
   * Token type
   *
   * @minLength 1
   */
  type: string;

  /**
   * Token's name
   */
  name?: string;

  /**
   * Token's description
   */
  description?: string;

  /**
   * Token faces.
   * These IDs must exists on the the shapes.svg file.
   *
   * @items.minLength 1
   */
  faces: string[];

  /**
   * Initial face to show
   *
   * @minLength 1
   */
  face: string;

  /**
   * Initial horizontal position
   *
   * @minimum 0
   * @TJS-type integer
   */
  x: number;

  /**
   * Initial vertical position
   *
   * @minimum 0
   * @TJS-type integer
   */
  y: number;

  /**
   * How many tokens of this type there are
   *
   * @minimum 1
   * @TJS-type integer
   */
  quantity: number;

  /**
   * The token can be flipped (cards, tiles, etc.)
   * false by default
   */
  canFlip?: boolean;

  /**
   * The token can be rolled (dices, roulettes, etc.)
   * false by default
   */
  canRoll?: boolean;

  /**
   * The token can be moved
   * false by default
   */
  canMove?: boolean;

  /**
   * The token can be rotated
   * false by default
   */
  canRotate?: boolean;
}
