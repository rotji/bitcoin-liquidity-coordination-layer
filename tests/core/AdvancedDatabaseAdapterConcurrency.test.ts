import { AdvancedDatabaseAdapter } from "../../src/core/AdvancedDatabaseAdapter";

describe("AdvancedDatabaseAdapter - concurrency and race conditions", () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it("should handle concurrent updates safely", async () => {
    await adapter.create("item-1", { foo: "start" });
    const update1 = adapter.update("item-1", { foo: "update1" });
    const update2 = adapter.update("item-1", { foo: "update2" });
    await Promise.all([update1, update2]);
    const item = await adapter.read("item-1");
    expect(["update1", "update2"]).toContain(item.foo);
  });

  it("should not corrupt state with rapid transactions", async () => {
    await adapter.create("item-2", { foo: "init" });
    const ops1: Array<{
      type: "update" | "create" | "delete";
      id: string;
      value?: any;
    }> = [{ type: "update", id: "item-2", value: { foo: "tx1" } }];
    const ops2: Array<{
      type: "update" | "create" | "delete";
      id: string;
      value?: any;
    }> = [{ type: "update", id: "item-2", value: { foo: "tx2" } }];
    await Promise.all([adapter.transaction(ops1), adapter.transaction(ops2)]);
    const item = await adapter.read("item-2");
    expect(["tx1", "tx2"]).toContain(item.foo);
  });
});
