// LiquiditySignalService: mock/real data switching
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'; // Controlled by .env

const mockSignals = [
  {
    id: 'signal1',
    protocol: 'Bitcoin',
    asset: 'BTC',
    pool: 'Main Pool',
    liquidity: 1000000,
    slippage: 0.15,
    risk: 'Low',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'signal2',
    protocol: 'Ethereum',
    asset: 'ETH',
    pool: 'ETH Pool',
    liquidity: 500000,
    slippage: 0.22,
    risk: 'Medium',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'signal3',
    protocol: 'Stacks',
    asset: 'STX',
    pool: 'Stacks Pool',
    liquidity: 250000,
    slippage: 0.18,
    risk: 'Low',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'signal4',
    protocol: 'RSK',
    asset: 'RBTC',
    pool: 'RSK Pool',
    liquidity: 120000,
    slippage: 0.35,
    risk: 'High',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'signal5',
    protocol: 'Liquid',
    asset: 'L-BTC',
    pool: 'Liquid Pool',
    liquidity: 300000,
    slippage: 0.12,
    risk: 'Medium',
    timestamp: new Date().toISOString(),
  },
];

export async function getSignals() {
  if (USE_MOCK_DATA) {
    return mockSignals;
  } else {
    const response = await fetch('/api/signals');
    return await response.json();
  }
}
