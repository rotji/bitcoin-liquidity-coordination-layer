import { AdvancedDatabaseAdapter } from "../../src/core/AdvancedDatabaseAdapter";

describe("AdvancedDatabaseAdapter - end-to-end workflow", () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it("should support a full CRUD workflow", async () => {
    // Create
    await adapter.create("user-1", { name: "Alice", balance: 100 });
    // Read
    const user = await adapter.read("user-1");
    expect(user).toEqual({ name: "Alice", balance: 100 });
    // Update
    await adapter.update("user-1", { name: "Alice", balance: 200 });
    const updated = await adapter.read("user-1");
    expect(updated).toEqual({ name: "Alice", balance: 200 });
    // Delete
    await adapter.delete("user-1");
    const deleted = await adapter.read("user-1");
    expect(deleted).toBeUndefined();
  });

  it("should handle a multi-step transaction workflow", async () => {
    await adapter.create("asset-1", { symbol: "BTC", liquidity: 10 });
    await adapter.create("asset-2", { symbol: "ETH", liquidity: 20 });
    const ops = [
      {
        type: "update",
        id: "asset-1",
        value: { symbol: "BTC", liquidity: 15 },
      },
      {
        type: "update",
        id: "asset-2",
        value: { symbol: "ETH", liquidity: 25 },
      },
    ] as Array<{
      type: "update" | "create" | "delete";
      id: string;
      value?: any;
    }>;
    const result = await adapter.transaction(ops);
    expect(result.success).toBe(true);
    expect(await adapter.read("asset-1")).toEqual({
      symbol: "BTC",
      liquidity: 15,
    });
    expect(await adapter.read("asset-2")).toEqual({
      symbol: "ETH",
      liquidity: 25,
    });
  });
});
