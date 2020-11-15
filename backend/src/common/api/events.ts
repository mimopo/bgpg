import { ErrorEvents } from './error-events';
import { HandEvents } from './hand-events';
import { MainEvents } from './main-events';
import { RoomEvents } from './room-events';
import { StackEvents } from './stack-events';

/**
 * Represents all Events available.
 * Event interfaces should have only methods that returns void and have only one parameter
 *
 * ```ts
 * (arg: any) => void
 * ```
 */
export interface Events extends MainEvents, HandEvents, RoomEvents, StackEvents, ErrorEvents {}
