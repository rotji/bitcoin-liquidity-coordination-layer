import { describe, it, expect, jest } from '@jest/globals';
import type { AssetRegistry } from '../../src/core/ports/AssetRegistry';
import type { Asset } from '../../src/core/value-objects/Asset';

describe('AssetRegistry interface', () => {
  it('should allow mocking all required methods', async () => {
    const mockAsset: Asset = {
      id: 'BTC',
      type: 'BTC',
      decimals: 8,
      riskClassification: 'low',
      enabled: true,
    } as Asset;
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.resolve([mockAsset])),
      getAssetById: jest.fn((id: string) => Promise.resolve(id === 'BTC' ? mockAsset : null)),
    };
    const assets = await mockAssetRegistry.getAssets();
    expect(assets[0]).toEqual(mockAsset);
    const asset = await mockAssetRegistry.getAssetById('BTC');
    expect(asset).toEqual(mockAsset);
    const missing = await mockAssetRegistry.getAssetById('ETH');
    expect(missing).toBeNull();
  });
});
