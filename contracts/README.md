
# Smart Contracts (Clarity)

This folder contains the Clarity smart contracts for the Bitcoin Liquidity Coordination Layer (BLCL) project.

## 🚀 Features
- Written in Clarity for Stacks blockchain
- Secure, auditable, and upgradeable

## 🛠️ Setup
- Install [Clarinet](https://docs.stacks.co/write-smart-contracts/clarinet-installation)
- All core contracts are initialized in this directory and registered in Clarinet.toml:
	- `protocol-registry.clar`: Canonical registry for liquidity venues (DEX, AMM, OTC, Bridge)
	- `asset-registry.clar`: Canonical registry for assets (BTC, sBTC, wrapped assets)
	- `liquidity-signal.clar`: On-chain commitment to liquidity claims (proof-of-liquidity)
	- `routing-intent.clar`: Coordination layer for publishing and managing user liquidity intents
	- `incentive-reputation.clar`: Reputation and incentive tracking for ecosystem actors

## 📄 Contract Overview

Each contract is designed for modularity and security, following the protocol documentation:

- **protocol-registry.clar**: Register, approve, and manage liquidity venues
- **asset-registry.clar**: Register, enable/disable, and query assets
- **liquidity-signal.clar**: Commit and query verifiable liquidity signals
- **routing-intent.clar**: Publish, update, and query user intents for liquidity coordination
- **incentive-reputation.clar**: Track and adjust actor reputation, determine reward eligibility

## 🔗 Related
- [Project Root README](../README.md)
- [Frontend README](../frontend/README.md)
- [Backend README](../backend/README.md)
