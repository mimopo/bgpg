export interface TableItem<T> {
  id: number;
  element: T;
  x: number;
  y: number;
  attributes: Partial<T>;
}
