import { Client } from 'pg';

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });
dbClient.connect();

export async function getAllLiquiditySignals() {
  const res = await dbClient.query('SELECT * FROM liquidity_signals ORDER BY timestamp DESC');
  return res.rows;
}

export async function createLiquiditySignal(data: {
  protocol: string;
  asset: string;
  pool: string;
  liquidity: number;
  slippage?: number;
  risk?: string;
}) {
  const { protocol, asset, pool, liquidity, slippage, risk } = data;
  const res = await dbClient.query(
    `INSERT INTO liquidity_signals (protocol, asset, pool, liquidity, slippage, risk)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [protocol, asset, pool, liquidity, slippage ?? null, risk ?? null]
  );
  return res.rows[0];
}
