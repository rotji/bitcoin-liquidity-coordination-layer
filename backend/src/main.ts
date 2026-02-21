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
