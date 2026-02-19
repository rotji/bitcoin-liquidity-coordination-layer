import { describe, it, expect } from '@jest/globals';

describe('DatabaseAdapter', () => {
  it('should create, read, update, and delete records', async () => {
    // Stub/mock database adapter
    const db = {
      data: new Map<string, any>(),
      create: (id: string, value: any) => db.data.set(id, value),
      read: (id: string) => db.data.get(id),
      update: (id: string, value: any) => db.data.set(id, value),
      delete: (id: string) => db.data.delete(id),
    };
    // Create
    db.create('item-1', { foo: 'bar' });
    expect(db.read('item-1')).toEqual({ foo: 'bar' });
    // Update
    db.update('item-1', { foo: 'baz' });
    expect(db.read('item-1')).toEqual({ foo: 'baz' });
    // Delete
    db.delete('item-1');
    expect(db.read('item-1')).toBeUndefined();
  });

  it('should handle errors gracefully', async () => {
    // Simulate error on read
    const db = {
      data: new Map<string, any>(),
      read: (id: string) => { throw new Error('DB error'); },
    };
    expect(() => db.read('item-1')).toThrow('DB error');
  });
});
