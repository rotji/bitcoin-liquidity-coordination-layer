import { Client } from 'pg';

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });

dbClient.connect();

export async function getAllAssets() {
  const res = await dbClient.query('SELECT * FROM assets');
  return res.rows;
}

export async function createAsset(name: string, symbol: string, protocolId: number) {
  const res = await dbClient.query(
    'INSERT INTO assets (name, symbol, protocol_id) VALUES ($1, $2, $3) RETURNING *',
    [name, symbol, protocolId]
  );
  return res.rows[0];
}
