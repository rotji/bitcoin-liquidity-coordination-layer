// ProtocolRegistryService: mock/real data switching
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'; // Controlled by .env

const mockProtocols = [
  { id: 'btc', name: 'Bitcoin', liquidity: 1000000 },
  { id: 'eth', name: 'Ethereum', liquidity: 500000 },
  { id: 'stx', name: 'Stacks', liquidity: 250000 }
];

export async function getProtocols() {
  if (USE_MOCK_DATA) {
    return mockProtocols;
  } else {
    const response = await fetch('/api/protocols');
    return await response.json();
  }
}
