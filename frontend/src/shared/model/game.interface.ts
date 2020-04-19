import { Card } from './card.interface';
import { Player } from './player.interface';
import { TableItem } from './table-item.interface';
import { Pile } from './pile.interface';
import { Piece } from './piece.interface';
import { Dice } from './dice.interface';

export interface Game {
  /** Shapes to print */
  shapes: Record<string, string>;
  /** Set of cards available */
  deck: Card[];
  /** Pieces available */
  pieces: Piece[];
  /** Players */
  players: Player[];
  /** Set of shared items on the table */
  table: TableItem<Card|Piece>[];
  /** Dices */
  dices: Dice[];
}
