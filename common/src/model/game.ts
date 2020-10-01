import { Resource } from "./resource";
import { TokenTemplate } from "./token-template";

/**
 * Game box containing all the tokens that you need to play
 *
 * This interface is converted to json-schema using typescript-json-schema
 * @see https://github.com/YousefED/typescript-json-schema#readme
 */
export interface Game {
  /**
   * Unique identifier
   *
   * @minLength 3
   * @maxLength 10
   */
  id?: string;

  /**
   * Name
   *
   * @minLength 3
   * @maxLength 20
   */
  title: string;

  /**
   * URL to the definition file
   *
   * @format uri
   */
  url: string;

  /**
   * Token templates
   *
   * @minProperties 1
   */
  tokens: { [id: string]: TokenTemplate };

  /**
   * URL to the faces file
   *
   * @format uri
   */
  shapes: Resource;

  /**
   * A dictionary of language URLs using the locale as index.
   * 
   * @minProperties 1
   * @todo Improve json-schema definition
   */
  languages: { [isoCode: string]: Resource };

  /**
   * Game version, version must follow semantic versioning and be parseable by node-semver
   *
   * @pattern ^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$
   */
  version: string;

  /**
   * Author's name
   *
   * @minLength 3
   * @maxLength 200
   */
  author: string;

  /**
   * Game's license
   *
   * @minLength 3
   * @maxLength 30
   */
  license: string;

  /**
   * Game's parts licenses.
   * Example: Board image: John Doe, CC BY-SA 3.0, https://wiki.creativecommons.org
   */
  licenses?: string;

  /**
   * Game's website
   *
   * @format uri
   */
  homepage?: string;

  /**
   * Game's help site
   *
   * @format uri
   */
  helpsite?: string;
}
