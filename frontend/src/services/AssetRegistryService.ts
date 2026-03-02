// AssetRegistryService: mock/real data switching
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'; // Controlled by .env
const API_URL = import.meta.env.VITE_API_URL || '/api';

const mockAssets = [
  { id: 'btc', symbol: 'BTC', price: 43000, name: 'Bitcoin', type: 'Native', protocols: ['Bitcoin', 'Stacks'] },
  { id: 'eth', symbol: 'ETH', price: 3200, name: 'Ethereum', type: 'Token', protocols: ['Ethereum', 'Stacks'] },
  { id: 'stx', symbol: 'STX', price: 2.5, name: 'Stacks', type: 'Token', protocols: ['Stacks'] },
  { id: 'wbtc', symbol: 'WBTC', price: 43050, name: 'Wrapped Bitcoin', type: 'Wrapped', protocols: ['Ethereum', 'Bitcoin'] },
  { id: 'usdt', symbol: 'USDT', price: 1, name: 'Tether', type: 'Stablecoin', protocols: ['Ethereum', 'Stacks'] }
];

export async function getAssets() {
  if (USE_MOCK_DATA) {
    return mockAssets;
  } else {
    const response = await fetch(`${API_URL}/assets`);
    return await response.json();
  }
}

// Add asset registration (POST) function
export async function createAsset(asset: { name: string; symbol: string; protocolId: number; poolId?: number }) {
  if (USE_MOCK_DATA) {
    // Simulate adding to mockAssets
    const newAsset = { ...asset, id: asset.symbol.toLowerCase(), price: 0, type: 'Native', protocols: [] };
    mockAssets.push(newAsset);
    return newAsset;
  } else {
    const response = await fetch(`${API_URL}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(asset),
    });
    if (!response.ok) {
      throw new Error('Failed to create asset');
    }
    return await response.json();
  }
}
