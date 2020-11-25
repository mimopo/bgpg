/* eslint-disable @typescript-eslint/no-explicit-any */

import { Socket } from 'socket.io';

/**
 * Prepends a Socket client parameter to every method of T
 *
 * Example:
 *
 * ```typescript
 * interface A {
 *   foo(bar: string): string;
 * }
 * ```
 *
 * Gateway<A> will be:
 *
 * ```typescript
 * interface A {
 *   foo(client: Socket, bar: string): string;
 * }
 * ```
 */
export type Gateway<T extends Record<string, any>> = {
  [K in keyof T]: (client: Socket, ...args: Parameters<T[K]>) => Promise<ReturnType<T[K]>>;
};
