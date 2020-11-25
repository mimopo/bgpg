/**
 * Exclude "id" property
 */
export type ModelCreate<T extends { id: string }> = Omit<T, 'id'>;
