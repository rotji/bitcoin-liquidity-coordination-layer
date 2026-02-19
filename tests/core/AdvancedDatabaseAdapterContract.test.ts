import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('AdvancedDatabaseAdapter - contract compliance', () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it('should conform to the expected adapter interface', async () => {
    expect(typeof adapter.create).toBe('function');
    expect(typeof adapter.read).toBe('function');
    expect(typeof adapter.update).toBe('function');
    expect(typeof adapter.delete).toBe('function');
    expect(typeof adapter.transaction).toBe('function');
  });

  it('should match the contract for CRUD operations', async () => {
    // Contract: create returns value, read returns value, update returns value, delete returns true
    const value = { foo: 'bar' };
    expect(await adapter.create('contract-1', value)).toEqual(value);
    expect(await adapter.read('contract-1')).toEqual(value);
    expect(await adapter.update('contract-1', { foo: 'baz' })).toEqual({ foo: 'baz' });
    expect(await adapter.delete('contract-1')).toBe(true);
    expect(await adapter.read('contract-1')).toBeUndefined();
  });

  it('should match the contract for transaction results', async () => {
    await adapter.create('contract-2', { foo: 'bar' });
    const ops = [
      { type: 'update', id: 'contract-2', value: { foo: 'baz' } },
      { type: 'delete', id: 'contract-2' },
    ] as Array<{ type: 'update' | 'create' | 'delete'; id: string; value?: any }>;
    const result = await adapter.transaction(ops);
    expect(result.success).toBe(true);
    expect(Array.isArray(result.results)).toBe(true);
    expect(await adapter.read('contract-2')).toBeUndefined();
  });
});
