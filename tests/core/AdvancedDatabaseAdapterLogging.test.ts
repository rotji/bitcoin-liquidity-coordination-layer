import { AdvancedDatabaseAdapter } from "../../src/core/AdvancedDatabaseAdapter";

describe("AdvancedDatabaseAdapter - logging and monitoring", () => {
  let adapter: AdvancedDatabaseAdapter;
  let logs: string[];

  // Patch console.log for test
  beforeEach(() => {
    logs = [];
    jest.spyOn(console, "log").mockImplementation((msg) => logs.push(msg));
    adapter = new AdvancedDatabaseAdapter();
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });

  it("should log operations", async () => {
    await adapter.create("log-1", { foo: "bar" });
    await adapter.update("log-1", { foo: "baz" });
    await adapter.delete("log-1");
    expect(logs.some((msg) => msg.includes("create"))).toBe(true);
    expect(logs.some((msg) => msg.includes("update"))).toBe(true);
    expect(logs.some((msg) => msg.includes("delete"))).toBe(true);
  });

  it("should log errors", async () => {
    await expect(adapter.delete("missing")).rejects.toThrow();
    expect(logs.some((msg) => msg.includes("error"))).toBe(true);
  });
});
