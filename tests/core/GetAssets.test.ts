import { describe, it, expect, jest } from '@jest/globals';
import { GetAssets } from '../../src/core/use-cases/GetAssets';
import type { AssetRegistry } from '../../src/core/ports/AssetRegistry';
import type { Asset } from '../../src/core/value-objects/Asset';

describe('GetAssets', () => {
  it('should fetch assets using the port', async () => {
    const mockAssets: Asset[] = [
      new (class AssetMock implements Asset {
        id = 'BTC';
        type: 'BTC' = 'BTC';
        decimals = 8;
        riskClassification = 'low';
        enabled = true;
      })(),
      new (class AssetMock implements Asset {
        id = 'ETH';
        type: 'wrapped' = 'wrapped';
        decimals = 18;
        riskClassification = 'medium';
        enabled = true;
      })(),
    ];
    const mockGetAssets = jest.fn(() => Promise.resolve(mockAssets)) as () => Promise<Asset[]>;
    const mockAssetRegistry: AssetRegistry = {
      getAssets: mockGetAssets,
      getAssetById: jest.fn((_: string) => Promise.resolve(null)) as (id: string) => Promise<Asset | null>,
    };
    const getAssets = new GetAssets(mockAssetRegistry);
    const assets = await getAssets.execute();
    expect(assets).toEqual(mockAssets);
    expect(mockGetAssets).toHaveBeenCalled();
  });
});
