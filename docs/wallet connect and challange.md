# Wallet Connect Integration & Challenges
...existing code...
# Wallet Connect & Challenge

This document outlines the approach and challenges for integrating wallet connection in the Bitcoin Liquidity Network frontend.

---

## 1. Supported Wallets

- Hiro Wallet (Stacks)
- Xverse Wallet
- Leather Wallet

## 2. Integration Approach

- Use wallet SDKs for connection and transaction signing
- Provide clear UI for wallet selection and connection status
- Handle connection errors gracefully

## 3. Security Considerations

- Never store private keys in the frontend
- Use session tokens for authentication
- Validate all transaction payloads before signing

## 4. User Experience

- Show clear feedback for connection status
- Support disconnect and account switching
- Document wallet integration steps for developers

---

_This guide should be updated as new wallets and features are supported._

