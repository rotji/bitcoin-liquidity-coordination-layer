import { describe, it, expect, jest } from "@jest/globals";
import type { ProtocolRegistry } from "../../src/core/ports/ProtocolRegistry";
import type { Protocol } from "../../src/core/entities/Protocol";

describe("ProtocolRegistry interface", () => {
  it("should allow mocking all required methods", async () => {
    const mockProtocol: Protocol = {
      id: "proto-1",
      name: "Protocol One",
      routerContract: "0xrouter1",
      type: "DEX",
      status: "active",
    } as Protocol;
    const mockProtocolRegistry: ProtocolRegistry = {
      getProtocols: jest.fn(() => Promise.resolve([mockProtocol])),
      getProtocolById: jest.fn((id: string) =>
        Promise.resolve(id === "proto-1" ? mockProtocol : null),
      ),
    };
    const protocols = await mockProtocolRegistry.getProtocols();
    expect(protocols[0]).toEqual(mockProtocol);
    const protocol = await mockProtocolRegistry.getProtocolById("proto-1");
    expect(protocol).toEqual(mockProtocol);
    const missing = await mockProtocolRegistry.getProtocolById("proto-2");
    expect(missing).toBeNull();
  });
});
