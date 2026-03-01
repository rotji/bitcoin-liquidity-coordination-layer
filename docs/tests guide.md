## When to Add or Update Tests
...existing code...
# Tests Guide

This guide provides best practices and instructions for writing and running tests in the Bitcoin Liquidity Network project.

---

## 1. Test Types

- **Unit Tests:** Test individual functions and modules in isolation.
- **Integration Tests:** Test interactions between modules and external systems.
- **End-to-End (E2E) Tests:** Test the entire system from frontend to backend to smart contracts.

## 2. Test Structure

- All tests are located in the `tests/` directory.
- Test files use the `.test.ts` suffix.

## 3. Running Tests

- Use `npm test` or `yarn test` in each package (`backend/`, `frontend/`, `contracts/`).
- Coverage reports are generated in the `coverage/` directory.

## 4. Best Practices

- Write tests for all new features and bug fixes.
- Mock external dependencies where possible.
- Aim for high code coverage (>80%).

## 5. CI/CD Integration

- Tests are run automatically on every push and pull request.
- Lint and format checks are included in the CI pipeline.

---

_This guide should be followed by all contributors to ensure code quality and reliability._

