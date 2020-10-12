/**
 * Make all properties in T optional except "id"
 */
export type ModelUpdate<T extends { id: any }> = Partial<T> & Pick<T, 'id'>;
