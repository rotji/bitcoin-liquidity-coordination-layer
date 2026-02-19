import { describe, it, expect } from '@jest/globals';
import { QuoteLiquidity } from '../../src/core/use-cases/QuoteLiquidity';
import { Pool } from '../../src/core/entities/Pool';

describe('QuoteLiquidity', () => {
  it('should return the correct quote for input amount', () => {
    const pool = new Pool('pool-1', 'proto-1', 'BTC', 'ETH', 100, 200, 0.003, new Date());
    const quoteLiquidity = new QuoteLiquidity(pool);
    const quote = quoteLiquidity.quote(10);
    expect(quote).toBe(20); // 10 * (200 / 100)
  });
});
