import { TokenTranslation } from "./token-translation";

/**
 * Game object translations
 * 
 * This interface is converted to json-schema using typescript-json-schema
 * @see https://github.com/YousefED/typescript-json-schema#readme
 */
export interface GameTranslation {
  /**
   * Name
   *
   * @minLength 3
   * @maxLength 20
   */
  title: string;

  /**
   * A brief description
   *
   * @minLength 10
   * @maxLength 500
   */
  description: string;

  /**
   * Token translations
   */
  tokens: { [id: string]: TokenTranslation };
}
