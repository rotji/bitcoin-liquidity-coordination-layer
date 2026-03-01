Excellent instinct 👍
...existing code...
# Technical Documentation

This document provides the core technical documentation for the Bitcoin Liquidity Network project.

---

## 1. System Overview

The Bitcoin Liquidity Network (BLN) is a protocol-level infrastructure for coordinating, routing, and optimizing sBTC liquidity across the Stacks ecosystem. It consists of a backend service, smart contracts, and a frontend dashboard.

## 2. Architecture

- **Backend:** Node.js + TypeScript, Express API, PostgreSQL
- **Smart Contracts:** Clarity contracts on Stacks
- **Frontend:** Vite + React

## 3. Core Components

- **Liquidity Indexer:** Aggregates pool data from DEXs
- **Routing Engine:** Calculates optimal routes for swaps
- **API & SDK:** Exposes endpoints and developer tools

## 4. Data Flow

1. Indexer fetches pool data from DEX contracts
2. Data is normalized and stored in PostgreSQL
3. Routing engine calculates best routes
4. API exposes data to SDK and frontend

## 5. Smart Contract Design

- Minimal contracts, focused on read-only and routing helpers
- No custody of user funds
- Open-source and auditable

## 6. Security Considerations

- Input validation on all endpoints
- Use of environment variables for secrets
- Regular audits and code reviews

## 7. Testing

- Unit and integration tests for all modules
- Mock data for API and contract testing

---

_This document should be used as the primary technical reference for the project._

