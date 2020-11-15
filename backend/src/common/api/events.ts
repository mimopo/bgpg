import { ErrorEvents } from './events/error-events';
import { HandEvents } from './events/hand-events';
import { MainEvents } from './events/main-events';
import { RoomEvents } from './events/room-events';
import { StackEvents } from './events/stack-events';

/**
 * Represents all Events available.
 * Event interfaces should have only methods that returns void and have only one parameter
 *
 * ```ts
 * (arg: any) => void
 * ```
 */
export interface Events extends MainEvents, HandEvents, RoomEvents, StackEvents, ErrorEvents {}
