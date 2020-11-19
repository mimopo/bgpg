import { DeleteResult } from 'typeorm';

/**
 * Mock implementation for typeorm repository
 */
export class RepositoryMock<T = any> {
  async save(entity: T): Promise<T> {
    return entity;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
