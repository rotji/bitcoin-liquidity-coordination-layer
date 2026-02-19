import { describe, it, expect, jest } from "@jest/globals";
import { GetProtocols } from "../../src/core/use-cases/GetProtocols";
import type { ProtocolRegistry } from "../../src/core/ports/ProtocolRegistry";
import type { Protocol } from "../../src/core/entities/Protocol";

describe("GetProtocols", () => {
  it("should fetch protocols using the port", async () => {
    const mockProtocols: Protocol[] = [
      new (class ProtocolMock implements Protocol {
        id = "proto-1";
        name = "Protocol One";
        routerContract = "0xrouter1";
        type: "DEX" = "DEX";
        status: "active" = "active";
      })(),
      new (class ProtocolMock implements Protocol {
        id = "proto-2";
        name = "Protocol Two";
        routerContract = "0xrouter2";
        type: "AMM" = "AMM";
        status: "deprecated" = "deprecated";
      })(),
    ];
    const mockGetProtocols = jest.fn(() =>
      Promise.resolve(mockProtocols),
    ) as () => Promise<Protocol[]>;
    const mockProtocolRegistry: ProtocolRegistry = {
      getProtocols: mockGetProtocols,
      getProtocolById: jest.fn((_: string) => Promise.resolve(null)) as (
        id: string,
      ) => Promise<Protocol | null>,
    };
    const getProtocols = new GetProtocols(mockProtocolRegistry);
    const protocols = await getProtocols.execute();
    expect(protocols).toEqual(mockProtocols);
    expect(mockGetProtocols).toHaveBeenCalled();
  });
});
