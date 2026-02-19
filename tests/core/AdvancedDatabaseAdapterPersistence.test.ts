import { AdvancedDatabaseAdapter } from "../../src/core/AdvancedDatabaseAdapter";

describe("AdvancedDatabaseAdapter - persistence and error propagation", () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it("should persist and restore state (simulate)", async () => {
    await adapter.create("persist-1", { foo: "bar" });
    // Simulate persistence by copying internal state
    // @ts-ignore
    const savedState = new Map(adapter.store);
    // Simulate process restart
    const newAdapter = new AdvancedDatabaseAdapter();
    // @ts-ignore
    newAdapter.store = new Map(savedState);
    expect(await newAdapter.read("persist-1")).toEqual({ foo: "bar" });
  });

  it("should propagate errors from underlying operations", async () => {
    await expect(adapter.update("missing", { foo: "fail" })).rejects.toThrow(
      "Not found",
    );
    await expect(adapter.delete("missing")).rejects.toThrow("Not found");
  });

  it("should propagate transaction errors", async () => {
    await adapter.create("persist-2", { foo: "baz" });
    const ops = [
      { type: "update", id: "persist-2", value: { foo: "baz2" } },
      { type: "delete", id: "missing" },
    ] as Array<{
      type: "update" | "create" | "delete";
      id: string;
      value?: any;
    }>;
    const result = await adapter.transaction(ops);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    // State should be unchanged
    expect(await adapter.read("persist-2")).toEqual({ foo: "baz" });
  });
});
