BITCOIN LIQUIDITY AND COORDINATION LAYER
...existing code...
# Bitcoin Liquidity Network

## Overview

The Bitcoin Liquidity Network (BLN) is a protocol-level infrastructure project designed to coordinate, route, and optimize sBTC liquidity across the Stacks ecosystem. It aims to solve liquidity fragmentation, improve capital efficiency, and provide a protocol-agnostic base layer for all DeFi protocols, wallets, and applications on Stacks.

## Key Features

- **Liquidity Indexer:** Aggregates sBTC pools, lending, and vaults across protocols.
- **Routing Engine:** Finds optimal routes for swaps, lending, and capital allocation.
- **SDK & API:** Easy integration for wallets, protocols, and frontends.
- **Composable Middleware:** Designed to be the base layer for all Bitcoin DeFi apps.

## Project Structure

- `backend/` — Node.js + TypeScript backend, Express API, PostgreSQL
- `contracts/` — Clarity smart contracts for Stacks
- `frontend/` — Vite + React frontend
- `docs/` — Project documentation

## Getting Started

1. Clone the repository
2. Install dependencies in each package (`backend/`, `frontend/`, `contracts/`)
3. Follow the setup guides in each package

## Contributing

See `docs/professional developers checklist.md` and `docs/code quality documentation.md` for contribution guidelines.

## License

MIT

---

_This README provides a high-level overview of the Bitcoin Liquidity Network project._

