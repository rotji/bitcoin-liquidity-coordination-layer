// AssetRegistryService: mock/real data switching
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'; // Controlled by .env

const mockAssets = [
  { id: 'btc', symbol: 'BTC', price: 43000 },
  { id: 'eth', symbol: 'ETH', price: 3200 },
  { id: 'stx', symbol: 'STX', price: 2.5 }
];

export async function getAssets() {
  if (USE_MOCK_DATA) {
    return mockAssets;
  } else {
    const response = await fetch('/api/assets');
    return await response.json();
  }
}
