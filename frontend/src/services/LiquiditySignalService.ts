// LiquiditySignalService: mock/real data switching
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'; // Controlled by .env

const mockSignals = [
  { id: 'signal1', protocol: 'Bitcoin', value: 0.8 },
  { id: 'signal2', protocol: 'Ethereum', value: 0.6 },
  { id: 'signal3', protocol: 'Stacks', value: 0.4 }
];

export async function getSignals() {
  if (USE_MOCK_DATA) {
    return mockSignals;
  } else {
    const response = await fetch('/api/signals');
    return await response.json();
  }
}
