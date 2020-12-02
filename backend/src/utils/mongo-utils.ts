import { ObjectId } from 'mongodb';
import { ObjectID } from 'typeorm';

class ObjectIdAdapter extends ObjectId {
  generate(time?: number) {
    return ObjectId.generate(time).toString();
  }
}

export type EntityId = string | number | ObjectID;

export const toObjectId = (value: EntityId): ObjectID => {
  if (typeof value === 'string' || typeof value === 'number') {
    return new ObjectIdAdapter(value);
  }
  return value;
};
