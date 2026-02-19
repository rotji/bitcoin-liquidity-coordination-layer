import { AdvancedDatabaseAdapter } from "../../src/core/AdvancedDatabaseAdapter";

describe("AdvancedDatabaseAdapter - stress and performance", () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it("should handle a large number of operations efficiently", async () => {
    const count = 10000;
    const createOps = [];
    for (let i = 0; i < count; i++) {
      createOps.push(adapter.create(`item-${i}`, { foo: i }));
    }
    await Promise.all(createOps);
    // Verify a few random items
    expect(await adapter.read("item-0")).toEqual({ foo: 0 });
    expect(await adapter.read(`item-${count - 1}`)).toEqual({ foo: count - 1 });
  });

  it("should support rapid sequential transactions", async () => {
    await adapter.create("perf-1", { foo: 1 });
    for (let i = 2; i <= 1000; i++) {
      await adapter.update("perf-1", { foo: i });
    }
    const item = await adapter.read("perf-1");
    expect(item.foo).toBe(1000);
  });
});
