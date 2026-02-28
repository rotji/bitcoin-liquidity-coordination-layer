-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  symbol VARCHAR(16) NOT NULL,
  type VARCHAR(32) DEFAULT 'Native',
  protocol_id INTEGER REFERENCES protocols(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Protocols table
CREATE TABLE IF NOT EXISTS protocols (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE NOT NULL,
  description TEXT,
  status VARCHAR(32) DEFAULT 'Active',
  liquidity NUMERIC DEFAULT 0,
  pools INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Liquidity signals table
CREATE TABLE IF NOT EXISTS liquidity_signals (
  id SERIAL PRIMARY KEY,
  protocol VARCHAR(64) NOT NULL,
  asset VARCHAR(32) NOT NULL,
  pool VARCHAR(64) NOT NULL,
  liquidity NUMERIC NOT NULL,
  slippage NUMERIC,
  risk VARCHAR(32),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Routing intents table
CREATE TABLE IF NOT EXISTS routing_intents (
  id SERIAL PRIMARY KEY,
  "user" VARCHAR(64) NOT NULL,
  protocol VARCHAR(64) NOT NULL,
  asset VARCHAR(32) NOT NULL,
  pool VARCHAR(64) NOT NULL,
  intent TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
