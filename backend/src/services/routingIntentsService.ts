import { Client } from 'pg';

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });
dbClient.connect();

export async function getAllRoutingIntents() {
  const res = await dbClient.query('SELECT * FROM routing_intents ORDER BY timestamp DESC');
  return res.rows;
}

export async function createRoutingIntent(data: {
  user: string;
  protocol: string;
  asset: string;
  pool: string;
  intent: string;
}) {
  const { user, protocol, asset, pool, intent } = data;
  const res = await dbClient.query(
    `INSERT INTO routing_intents ("user", protocol, asset, pool, intent)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user, protocol, asset, pool, intent]
  );
  return res.rows[0];
}
