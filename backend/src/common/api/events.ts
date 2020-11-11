import { HandEvents } from './hand-events';
import { RoomEvents } from './room-events';
import { StackEvents } from './stack-events';

/**
 * Represents all Events available.
 * Event interfaces should have only methods that returns void (should extend EventsType)
 */
export interface Events extends HandEvents, RoomEvents, StackEvents {}
