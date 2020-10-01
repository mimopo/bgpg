/**
 * Represents a Player in a Room
 */
export interface Player {
  /** Unique identifier */
  id: string;
  /** Player's name */
  name: string;
  /** Avatar url */
  avatar?: string;
  /** Pointers horizontal position */
  x?: number;
  /** Pointers vertical position */
  y?: number;
}
