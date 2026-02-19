import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('AdvancedDatabaseAdapter - fault injection and recovery', () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it('should recover from transaction failure and allow subsequent operations', async () => {
    await adapter.create('recover-1', { foo: 'bar' });
    const ops = [
      { type: 'update', id: 'recover-1', value: { foo: 'baz' } },
      { type: 'update', id: 'missing', value: { foo: 'fail' } },
    ] as Array<{ type: 'update' | 'create' | 'delete'; id: string; value?: any }>;
    const result = await adapter.transaction(ops);
    expect(result.success).toBe(false);
    // Adapter should still work after failure
    await adapter.update('recover-1', { foo: 'recovered' });
    const item = await adapter.read('recover-1');
    expect(item).toEqual({ foo: 'recovered' });
  });

  it('should not corrupt state after multiple failures', async () => {
    await adapter.create('recover-2', { foo: 'init' });
    for (let i = 0; i < 5; i++) {
      const ops = [
        { type: 'update', id: 'recover-2', value: { foo: `fail-${i}` } },
        { type: 'update', id: 'missing', value: { foo: 'fail' } },
      ] as Array<{ type: 'update' | 'create' | 'delete'; id: string; value?: any }>;
      const result = await adapter.transaction(ops);
      expect(result.success).toBe(false);
      expect(await adapter.read('recover-2')).toEqual({ foo: 'init' });
    }
  });
});
