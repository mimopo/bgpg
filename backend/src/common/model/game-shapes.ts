/**
 * Game shapes
 *
 * This interface is converted to json-schema using typescript-json-schema
 * @see https://github.com/YousefED/typescript-json-schema#readme
 */
export interface GameShapes {
  /** Game board (background). It must be a valid SVG shape. */
  board: string;
  /** Available token shapes. It must be a valid SVG shape. */
  tokens: { [isoCode: string]: string };
}
