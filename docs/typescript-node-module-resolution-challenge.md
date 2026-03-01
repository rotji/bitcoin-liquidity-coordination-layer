# TypeScript/Node.js Module Resolution Challenge

## Problem Summary

While developing the backend, we encountered persistent failures running `npm run dev` (ts-node). The errors included:
- Module not found errors for local imports (e.g., routes/users, controllers/usersService)
- Duplicate identifier errors
- TypeScript/Node.js import path and extension mismatches

## Root Causes

- **Module system mismatch:**
  - `package.json` had `"type": "module"` (ESM), but `tsconfig.json` used `"module": "commonjs"`.
  - This caused Node and ts-node to expect different import styles and file extensions.
- **Import path issues:**
  - Using `.js` extensions in TypeScript imports with ts-node, which expects extensionless imports.
  - Case sensitivity and file naming mismatches (e.g., `Users.ts` vs `users.ts`).
- **Duplicate/invalid config:**
  - Duplicate or conflicting options in `tsconfig.json`.

## Solution That Worked

- Removed `"type": "module"` from `package.json`.
- Set `"module": "commonjs"` and `"moduleResolution": "node"` in `tsconfig.json`.
- Ensured all local TypeScript imports are extensionless (e.g., `import usersRoutes from './routes/users'`).
- Fixed file naming to be all lowercase and match import paths exactly.
- Cleaned up duplicate/invalid keys in `tsconfig.json`.

## Result

- `npm run dev` (ts-node) now works reliably.
- All backend imports resolve correctly.
- The backend is stable and easy to maintain with classic CommonJS/Node.js + TypeScript setup.

---

**Lesson:** Always align your Node.js, TypeScript, and package.json module settings, and use consistent import paths and file naming to avoid module resolution headaches.