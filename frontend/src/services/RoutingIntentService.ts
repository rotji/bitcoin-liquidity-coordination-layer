// RoutingIntentService: mock/real data switching for routing intents
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const API_URL = import.meta.env.VITE_API_URL || '/api';

export interface RoutingIntent {
  user: string;
  protocol: string;
  asset: string;
  pool: string;
  intent: string;
  timestamp: string;
}

const mockRoutingIntents: RoutingIntent[] = [
  {
    user: 'alice',
    protocol: 'Bitcoin',
    asset: 'BTC',
    pool: 'Main Pool',
    intent: 'Swap BTC for STX',
    timestamp: new Date().toISOString(),
  },
  {
    user: 'bob',
    protocol: 'Ethereum',
    asset: 'ETH',
    pool: 'ETH Pool',
    intent: 'Provide liquidity',
    timestamp: new Date().toISOString(),
  },
];

export async function getRoutingIntents(): Promise<RoutingIntent[]> {
  if (USE_MOCK_DATA) {
    return mockRoutingIntents;
  }

  const res = await fetch(`${API_URL}/routing-intents`);
  if (!res.ok) {
    throw new Error('Failed to fetch routing intents');
  }
  return res.json();
}

export async function createRoutingIntent(intent: Omit<RoutingIntent, 'timestamp'>): Promise<RoutingIntent> {
  if (USE_MOCK_DATA) {
    const withTimestamp: RoutingIntent = { ...intent, timestamp: new Date().toISOString() };
    mockRoutingIntents.push(withTimestamp);
    return withTimestamp;
  }

  const res = await fetch(`${API_URL}/routing-intents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...intent }),
  });

  if (!res.ok) {
    throw new Error('Failed to create routing intent');
  }

  return res.json();
}
