import { Client } from 'pg';

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true'; // Controlled by .env

const mockProtocols = [
  { id: 'btc', name: 'Bitcoin', liquidity: 1000000 },
  { id: 'eth', name: 'Ethereum', liquidity: 500000 },
  { id: 'stx', name: 'Stacks', liquidity: 250000 }
];

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });
dbClient.connect();

export async function getAllProtocols() {
  if (USE_MOCK_DATA) {
    return mockProtocols;
  }
  const res = await dbClient.query('SELECT * FROM protocols');
  return res.rows;
}

export async function createProtocol(name: string, description: string) {
  if (USE_MOCK_DATA) {
    const newProtocol = { id: String(mockProtocols.length + 1), name, description, liquidity: 0 };
    mockProtocols.push(newProtocol);
    return newProtocol;
  }
  const res = await dbClient.query(
    'INSERT INTO protocols (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return res.rows[0];
}
