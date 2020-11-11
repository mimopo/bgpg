import { HandActions } from './hand-actions';
import { MainActions } from './main-actions';
import { RoomActions } from './room-actions';
import { StackActions } from './stack-actions';

/**
 * Represents all Actions available.
 * Actions interfaces should have only methods that can return any value.
 */
export interface Actions extends HandActions, MainActions, RoomActions, StackActions {}
