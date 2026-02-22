import { Client } from 'pg';

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });

dbClient.connect();

export async function getAllUsers() {
  const res = await dbClient.query('SELECT * FROM users');
  return res.rows;
}

export async function createUser(username: string, email: string) {
  const res = await dbClient.query(
    'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
    [username, email]
  );
  return res.rows[0];
}
