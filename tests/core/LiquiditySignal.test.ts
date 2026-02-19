import { describe, it, expect, jest } from "@jest/globals";
import type { LiquiditySignal } from "../../src/core/ports/LiquiditySignal";
import { LiquiditySnapshot } from "../../src/core/entities/LiquiditySnapshot";

describe("LiquiditySignal interface", () => {
  it("should allow mocking all required methods", async () => {
    const mockSnapshot = new LiquiditySnapshot("pool-1", 123, 1.5, 300);
    const mockLiquiditySignal: LiquiditySignal = {
      commitLiquiditySignal: jest.fn((_: LiquiditySnapshot) =>
        Promise.resolve(),
      ),
      getLatestSignal: jest.fn((poolId: string) =>
        Promise.resolve(poolId === "pool-1" ? mockSnapshot : null),
      ),
      getSignalByHeight: jest.fn((poolId: string, height: number) =>
        Promise.resolve(
          poolId === "pool-1" && height === 123 ? mockSnapshot : null,
        ),
      ),
    };
    await mockLiquiditySignal.commitLiquiditySignal(mockSnapshot);
    const latest = await mockLiquiditySignal.getLatestSignal("pool-1");
    expect(latest).toEqual(mockSnapshot);
    const byHeight = await mockLiquiditySignal.getSignalByHeight("pool-1", 123);
    expect(byHeight).toEqual(mockSnapshot);
    const missing = await mockLiquiditySignal.getLatestSignal("pool-2");
    expect(missing).toBeNull();
  });
});
