/**
 * Make all properties in T optional except "id"
 */
export type PartialModel<T extends { id: any }> = Partial<T> & Pick<T, "id">;
