import { describe, it, expect } from '@jest/globals';
import { LiquiditySnapshot } from '../../src/core/entities/LiquiditySnapshot';

describe('LiquiditySnapshot', () => {
  it('should create a valid liquidity snapshot', () => {
    const snapshot = new LiquiditySnapshot('pool-1', 12345, 0.5, 1000);
    expect(snapshot.poolId).toBe('pool-1');
    expect(snapshot.blockHeight).toBe(12345);
    expect(snapshot.price).toBe(0.5);
    expect(snapshot.depth).toBe(1000);
  });
});
