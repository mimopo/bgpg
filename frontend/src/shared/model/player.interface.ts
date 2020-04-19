import { Card } from './card.interface';

export interface Player {
  /** Players unique identifier */
  id: string;
  /** Player nickname */
  name: string;
  /** Number of cards in hand */
  hand: number;
  /** Number of cards */
  cards: Card[];
}
