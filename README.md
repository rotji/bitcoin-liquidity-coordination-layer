BITCOIN LIQUIDITY AND COORDINATION LAYER

## Mock Data Usage & Switching

For demo and development, the frontend uses synthetic mock data to populate tables and dashboards. You can seamlessly switch between mock data and real backend/API data using an environment variable:

- To use mock data, set `VITE_USE_MOCK_DATA=true` in `frontend/.env`.
- To switch to real data, set `VITE_USE_MOCK_DATA=false` and ensure backend APIs are available.

This enables rapid prototyping, presentations, and gradual integration of real data sources.

**Example:**

```
VITE_USE_MOCK_DATA=true
```

All major UI views (dashboard, registry, signals, intents) will display meaningful synthetic data when mock mode is enabled.
# Bitcoin Liquidity Coordination Layer (BLCL)

[![Node.js CI](https://img.shields.io/github/workflow/status/rotji/bitcoin-liquidity-network/CI%20-%20Test%20&%20Coverage?label=Node.js%20CI)](https://github.com/rotji/bitcoin-liquidity-network/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

**BLCL** is a modular infrastructure layer for unifying and coordinating Bitcoin liquidity across DeFi protocols, built with TypeScript, Node.js, Express, React, PostgreSQL, and Clarity smart contracts on Stacks (Bitcoin Layer 2).

---

## Features
- Modular, extensible architecture
- Adapters for multiple DEXs (ALEX, Velar, etc.)
- Liquidity scoring and routing engine
- REST API and SDK
- Frontend dashboard (Vite + React + TypeScript)
- PostgreSQL database
- Clarity smart contracts for Stacks L2
- Robust testing with Jest
- Code quality enforced by ESLint and Prettier
- CI/CD with GitHub Actions

---

## Quick Start

```sh
git clone https://github.com/rotji/bitcoin-liquidity-network.git
cd bitcoin-liquidity-network
cd backend && npm install && cd ../frontend && npm install
```

See [backend/README.md](backend/README.md), [frontend/README.md](frontend/README.md), and [contracts/README.md](contracts/README.md) for details.

---

## Project Structure

```
backend/    # Node.js + Express API
frontend/   # Vite + React frontend
contracts/  # Clarity smart contracts (Stacks L2)
docs/       # Documentation
tests/      # Test suites
```

---

## Stacks & Clarity
- **Stacks** is a Bitcoin Layer 2 that enables smart contracts and DeFi for Bitcoin.
- **Clarity** is a secure, predictable smart contract language for Stacks, used for BLCL's on-chain logic.
- This project will include Clarity contracts for core protocol logic and integration with the Stacks ecosystem.

---

## Contributing
Contributions are welcome! Please open issues and pull requests.

---

## License
MIT
