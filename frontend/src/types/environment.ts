/**
 * App environment configuration
 */
export interface Environment {
  /** Is production environment or not */
  production: boolean;
  /** Server URL */
  server: string;
  /** Socket IO Connection Options */
  connectOptions: SocketIOClient.ConnectOpts;
  /** Server request timeout in ms */
  requestTimeout: number;
}
