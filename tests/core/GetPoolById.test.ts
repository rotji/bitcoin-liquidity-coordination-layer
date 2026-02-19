import { describe, it, expect, jest } from "@jest/globals";
import { GetPoolById } from "../../src/core/use-cases/GetPoolById";
import type { DEXAdapter } from "../../src/core/ports/DEXAdapter";
import type { Pool } from "../../src/core/entities/Pool";

describe("GetPoolById", () => {
  it("should fetch pool by id using the port", async () => {
    const mockPool: Pool = new (class PoolMock implements Pool {
      id = "pool-1";
      protocolId = "proto-1";
      tokenA = "BTC";
      tokenB = "ETH";
      reserveA = 100;
      reserveB = 200;
      fee = 0.003;
      lastUpdated = new Date();
    })();
    const mockGetPools = jest.fn(() =>
      Promise.resolve([mockPool]),
    ) as () => Promise<Pool[]>;
    const mockDEXAdapter: DEXAdapter = {
      getPools: mockGetPools,
      getReserves: jest.fn((_: Pool) =>
        Promise.resolve({ reserveA: 0, reserveB: 0 }),
      ) as (pool: Pool) => Promise<{ reserveA: number; reserveB: number }>,
      getFee: jest.fn((_: Pool) => Promise.resolve(0)) as (
        pool: Pool,
      ) => Promise<number>,
    };
    const getPoolById = new GetPoolById(mockDEXAdapter);
    const pool = await getPoolById.execute("pool-1");
    expect(pool).toEqual(mockPool);
    expect(mockGetPools).toHaveBeenCalled();
  });

  it("should return null if pool not found", async () => {
    const mockGetPools = jest.fn(() => Promise.resolve([])) as () => Promise<
      Pool[]
    >;
    const mockDEXAdapter: DEXAdapter = {
      getPools: mockGetPools,
      getReserves: jest.fn((_: Pool) =>
        Promise.resolve({ reserveA: 0, reserveB: 0 }),
      ) as (pool: Pool) => Promise<{ reserveA: number; reserveB: number }>,
      getFee: jest.fn((_: Pool) => Promise.resolve(0)) as (
        pool: Pool,
      ) => Promise<number>,
    };
    const getPoolById = new GetPoolById(mockDEXAdapter);
    const pool = await getPoolById.execute("pool-2");
    expect(pool).toBeNull();
    expect(mockGetPools).toHaveBeenCalled();
  });
});
