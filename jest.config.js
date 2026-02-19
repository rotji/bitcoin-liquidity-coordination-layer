/**
 * Jest configuration for TypeScript support using ts-jest.
 * Place this file at the project root to ensure Jest picks it up.
 * Docs: https://kulshekhar.github.io/ts-jest/docs/getting-started/
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Optionally, add more ts-jest config here
};
