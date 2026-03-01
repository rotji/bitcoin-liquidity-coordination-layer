# Mock Data & Real Data Guide
...existing code...
# Mock Data vs. Real Data Guide

This guide explains the approach, best practices, and lessons learned when working with mock data and real data in the Bitcoin Liquidity Network project.

---

## 1. Why Use Mock Data?

- **Faster development:** Allows frontend and backend teams to work in parallel.
- **Testing edge cases:** Simulate scenarios that are hard to reproduce with real data.
- **CI/CD:** Enables automated tests without requiring live infrastructure.

## 2. Mock Data Strategies

- Use static JSON files for simple mocks.
- Use libraries like `faker.js` for dynamic data.
- Implement mock API endpoints that mirror real API structure.

## 3. Transitioning to Real Data

- Replace mock endpoints with real API calls as backend matures.
- Use environment variables to toggle between mock and real data.
- Validate frontend against real data before launch.

## 4. Lessons Learned

- Keep mock data schemas in sync with real API contracts.
- Document all mock endpoints and data structures.
- Remove mock code before production deployment.

---

_This guide is intended to help future contributors understand the rationale and process for using mock data during development._

