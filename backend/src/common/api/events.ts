import { HandEvents } from './hand-events';
import { RoomEvents } from './room-events';
import { StackEvents } from './stack-events';

/**
 * Represents all Events available
 */
export interface Events extends HandEvents, RoomEvents, StackEvents {}
