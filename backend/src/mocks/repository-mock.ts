import { DeleteResult } from 'typeorm';

/**
 * Mock implementation for typeorm repository
 */
export class RepositoryMock<T> {
  async save(entity: T): Promise<T> {
    return entity;
  }

  async find(): Promise<void> {
    // Mock this method
  }

  async findOneOrFail(): Promise<void> {
    // Mock this method
  }

  async delete(): Promise<DeleteResult> {
    return {
      raw: 'mock',
      affected: 1,
    };
  }
}
