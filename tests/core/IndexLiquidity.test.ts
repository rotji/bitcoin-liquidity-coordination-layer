import { describe, it, expect } from '@jest/globals';
import { IndexLiquidity } from '../../src/core/use-cases/IndexLiquidity';
import { LiquiditySnapshot } from '../../src/core/entities/LiquiditySnapshot';

// Mock DEXAdapter
const mockAdapter = {
  getPools: jest.fn(),
  getReserves: jest.fn(),
};

describe('IndexLiquidity', () => {
  it('should index pools and calculate price/depth', async () => {
    mockAdapter.getPools.mockResolvedValue([
      { id: 'pool-1' },
      { id: 'pool-2' },
    ]);
    mockAdapter.getReserves
      .mockResolvedValueOnce({ reserveA: 100, reserveB: 50 })
      .mockResolvedValueOnce({ reserveA: 200, reserveB: 100 });

    const useCase = new IndexLiquidity(mockAdapter as any);
    const snapshots = await useCase.execute();

    expect(snapshots).toHaveLength(2);
    expect(snapshots[0]).toBeInstanceOf(LiquiditySnapshot);
    expect(snapshots[0].poolId).toBe('pool-1');
    expect(snapshots[0].price).toBe(2);
    expect(snapshots[0].depth).toBe(150);
    expect(snapshots[1].poolId).toBe('pool-2');
    expect(snapshots[1].price).toBe(2);
    expect(snapshots[1].depth).toBe(300);
  });
});
