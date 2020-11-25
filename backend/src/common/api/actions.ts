import { GameActions } from './actions/game-actions';
import { HandActions } from './actions/hand-actions';
import { MainActions } from './actions/main-actions';
import { RoomActions } from './actions/room-actions';
import { StackActions } from './actions/stack-actions';

/**
 * Represents all Actions available.
 * Actions interfaces should have only methods that can return any value.
 *
 * ```ts
 * (...any[]) => any
 * ```
 */
export interface Actions extends HandActions, MainActions, RoomActions, StackActions, GameActions {}
