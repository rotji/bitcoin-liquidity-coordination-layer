✅ The **protocol adapters skeleton** is now in place for both **ALEX** and **VELAR**.
...existing code...
# Technical Documentation (Continued)

This document continues the technical documentation for the Bitcoin Liquidity Network project, providing additional details and clarifications.

---

## 1. API Endpoints

- `/liquidity` — Returns aggregated liquidity data
- `/route` — Returns optimal routing for swaps
- `/quote` — Provides price quotes for swaps
- `/build-tx` — Builds transaction payloads for execution

## 2. Database Schema

- `liquidity_pools` — Stores pool data from DEXs
- `routes` — Stores routing information
- `quotes` — Stores price quotes

## 3. Smart Contract Interactions

- Read-only calls to DEX contracts for pool data
- Transaction builders for swap execution

## 4. Error Handling

- Standardized error responses for all API endpoints
- Logging and monitoring for backend services

## 5. Testing

- Unit and integration tests for all core modules
- Mock data for API and contract testing

---

_This document should be read in conjunction with the main technical documentation._

