import { ObjectID } from 'typeorm';
import { ObjectId } from 'mongodb';

export type EntityId = string | number | ObjectID;

export function toObjectId(value: EntityId): ObjectID {
  if (typeof value === 'string' || typeof value === 'number') {
    return new ObjectIdAdapter(value);
  }
  return value;
}

class ObjectIdAdapter extends ObjectId {
  generate(time?: number) {
    return ObjectId.generate(time).toString();
  }
}
