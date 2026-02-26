# Wallet Connect Integration & Challenges

## Overview
This document records the approaches, code, and challenges encountered while integrating Stacks-compatible wallet connection (Hiro/Leather) in a Vite-based React project.

## Working Approach (as of Feb 2026)
- Used direct detection of `window.stacksProvider` for wallet connection, compatible with Leather and Hiro Wallet extensions.
- Added a Connect Wallet button in the Navbar that:
  - Checks for `window.stacksProvider`.
  - Requests Stacks addresses using `stx_getAddresses`.
  - Displays the connected address if successful.
- No Node.js polyfills or @stacks/connect required, making it Vite-friendly.

### Example Code
```tsx
// In Navbar.tsx
const [address, setAddress] = useState<string | null>(null);

const connectWallet = async () => {
  if (window.stacksProvider) {
    try {
      const result = await window.stacksProvider.request({
        method: 'stx_getAddresses',
      });
      setAddress(result.addresses[0].address);
    } catch (err) {
      alert('Wallet connection failed');
    }
  } else {
    alert('Leather Wallet (or Hiro Wallet) extension not found. Please install and enable it.');
  }
};
```

## Challenges Faced
- **@stacks/connect not Vite-compatible:** Required Node.js polyfills (global, process, util, events) that caused blank screens and runtime errors.
- **Multiple wallet extensions conflict:** Only one Stacks wallet extension (Leather, Hiro, Xverse) can inject `window.stacksProvider` at a time. Others block or override it.
- **Leather Wallet not detected:** Even after removing other wallets, sometimes `window.stacksProvider` remains undefined. This may be due to browser, extension, or injection timing issues.
- **No official Hiro Wallet extension available:** As of Feb 2026, only Leather Wallet is available in the Chrome Web Store.

## Recommendations
- Use only one Stacks wallet extension at a time.
- Always check for `window.stacksProvider` before attempting wallet connection.
- If provider is missing, try a different browser, restart, or reinstall the extension.
- Document all integration attempts and issues for future reference.

---
_Last updated: February 26, 2026_