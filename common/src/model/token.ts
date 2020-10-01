/**
 * Any object on the game.
 * Cards, tiles, dices, tokens...
 */
export interface Token {
  /** Unique identifier */
  id: string;
  /** Current face to show */
  face: string;
  /** How many faces has the token */
  facesCount: number;
  /** Horizontal position */
  x: number;
  /** Vertical position */
  y: number;
  /** Rotation status in degrees, from 0 to 359 */
  rotation: number;
  /** The token can be flipped (cards, tiles, etc.) */
  canFlip: boolean;
  /** The token can be rolled (dices, roulettes, etc.) */
  canRoll: boolean;
  /** The token can be moved */
  canMove: boolean;
  /** The token can be rotated */
  canRotate: boolean;
}
