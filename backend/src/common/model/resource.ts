/**
 * Remote resource
 *
 * This interface is converted to json-schema using typescript-json-schema
 *
 * @see https://github.com/YousefED/typescript-json-schema#readme
 */
export interface Resource {
  /**
   * Remote URL
   *
   * @format uri
   */
  url: string;

  /**
   * File md5 checksum.
   * It ensures all the users loads the same assets.
   *
   * @pattern ^[a-f0-9]{32}$
   */
  md5checksum: string;
}
