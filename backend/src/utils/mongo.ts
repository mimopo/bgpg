import { ObjectID } from 'mongodb';

export function toObjectId(value: string | ObjectID): ObjectID {
  return typeof value === 'string' ? new ObjectID(value) : value;
}
