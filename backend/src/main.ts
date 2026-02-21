import 'dotenv/config';
console.log('DATABASE_URL:', process.env.DATABASE_URL);
import { Client } from 'pg';

const dbUrl = process.env.DATABASE_URL;
const dbClient = new Client({ connectionString: dbUrl });

dbClient.connect()
	.then(() => console.log('Connected to Supabase PostgreSQL!'))
	.catch((err) => console.error('Failed to connect to Supabase PostgreSQL:', err));
// Entry point for backend server
// Express setup temporarily removed until backend is ready
// Uncomment and configure when ready to implement backend API
import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

// TODO: Import and wire up core logic from src/core

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`BLCL backend running on port ${PORT}`);
});
