// AssetRegistryService: mock/real data switching
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'; // Controlled by .env

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
    const response = await fetch('/api/assets');
    return await response.json();
  }
}
