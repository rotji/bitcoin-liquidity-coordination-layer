import { AdvancedDatabaseAdapter } from "../../src/core/AdvancedDatabaseAdapter";

describe("AdvancedDatabaseAdapter - integration with real adapter", () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it("should integrate with a mock external adapter", async () => {
    // Simulate an external adapter call
    const externalAdapter = {
      fetch: async (id: string) => ({ foo: `external-${id}` }),
    };
    await adapter.create("item-1", await externalAdapter.fetch("item-1"));
    expect(await adapter.read("item-1")).toEqual({ foo: "external-item-1" });
  });

  it("should handle adapter errors gracefully", async () => {
    const externalAdapter = {
      fetch: async (_id: string) => {
        throw new Error("External error");
      },
    };
    try {
      await adapter.create("item-2", await externalAdapter.fetch("item-2"));
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBe("External error");
    }
    expect(await adapter.read("item-2")).toBeUndefined();
  });
});
