interface Entity {
  id: string;
}

export function removeRecord<T extends Entity>(collection: T[], record: T) {
  const index = this.getRecordIndex(collection, record);
  if (index !== -1) {
    collection.splice(index, 1);
  }
}

export function replaceRecord<T extends Entity>(collection: T[], record: T) {
  const index = getRecordIndex(collection, record);
  if (index === -1) {
    collection.push(record);
  } else {
    collection[index] = record;
  }
}

export function getRecordIndex<T extends Entity>(collection: T[], record: T): number {
  const r = collection.find((p) => p.id === record.id);
  return r ? collection.indexOf(r) : -1;
}
