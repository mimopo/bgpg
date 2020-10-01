import { Token } from "./token";

/**
 * Player's private tokens
 */
export interface Hand {
    /** Hand's owner */
    playerId: string;
    /** Tokens list */
    tokens: Token[];
}