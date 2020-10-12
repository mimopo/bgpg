/**
 * Exclude "id" property
 */
export type ModelCreate<T extends { id: any }> = Omit<T, 'id'>;
