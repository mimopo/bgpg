/**
 * All TypeORM entities must implement all of its DTO's properties, but class-transformer will take care of the types.
 * After the DTO deserialization, you must get the entity.
 * After the entity serialization, you must get the DTO.
 */
export type EntityModel<DTO> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof DTO]: any;
};
