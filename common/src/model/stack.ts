/**
 * Stack of tokens, usually cards.
 */
export interface Stack {
    /** Unique identifier */
    id: string;
    /** Number of tokens on this Stack */
    length: number;
    /** Top Token face */
    face: string;
}