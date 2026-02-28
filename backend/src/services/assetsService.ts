import { Client } from 'pg';

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });

dbClient.connect();

// Return assets in a shape convenient for the frontend Asset Registry
// Each asset includes name, symbol, type, and an array of protocol names.
export async function getAllAssets() {
  const res = await dbClient.query(
    `SELECT a.id,
            a.name,
            a.symbol,
            a.type,
            p.name AS protocol_name
       FROM assets a
       LEFT JOIN protocols p ON a.protocol_id = p.id`
  );

  return res.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    symbol: row.symbol,
    type: row.type,
    protocols: row.protocol_name ? [row.protocol_name] : [],
  }));
}

export async function createAsset(name: string, symbol: string, protocolId: number) {
  const res = await dbClient.query(
    'INSERT INTO assets (name, symbol, type, protocol_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, symbol, 'Native', protocolId]
  );
  return res.rows[0];
}
