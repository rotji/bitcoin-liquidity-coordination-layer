# Mock Data & Real Data Guide

## Overview
This guide documents best practices for using mock (synthetic) data in the frontend, and seamlessly switching to real backend data as APIs are implemented. It provides a template and actionable steps for demo-driven development and gradual integration.

---

## Best Practice: Service Pattern for Data Switching

1. **Create a data service for each major data type** (e.g., ProtocolRegistryService, AssetRegistryService).
2. **Expose methods** like getProtocols(), getAssets(), getSignals(), etc.
3. **Start with mock implementations**: service returns hardcoded synthetic data.
4. **Switch to real API calls**: update the service to fetch from backend when ready.
5. **Use a feature flag or environment variable** to control mock vs. real data.
6. **Fallback to mock data** if real data fails or is unavailable.

---

## Example Template (TypeScript/React)

### Frontend: Environment Variable
Add to `frontend/.env`:

  VITE_USE_MOCK_DATA=true

In your services:

  const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

### Backend: Environment Variable (Optional)
If you want to enable mock data switching in the backend, add to `backend/.env`:

  USE_MOCK_DATA=true

Then in backend code:

  const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

Use this flag to return mock data or connect to real database/API as needed.
```ts
// src/services/ProtocolRegistryService.ts
const USE_MOCK_DATA = true; // Switch to false for real API

const mockProtocols = [ /* ...synthetic data... */ ];

export async function getProtocols() {
  if (USE_MOCK_DATA) {
    return mockProtocols;
  } else {
    const response = await fetch('/api/protocols');
    return await response.json();
  }
}
```

**UI Component:**
```ts
import { getProtocols } from '../services/ProtocolRegistryService';

useEffect(() => {
  getProtocols().then(setProtocols);
}, []);
```

---

## To Do List: Mock Data → Real Data

1. **Identify all major UI data views/components**
   - Dashboard stats
   - Analytics
   - Protocol registry
   - Asset registry
   - Liquidity signals
   - Routing intents
   - Reputation/incentives
2. **Create mock data objects for each view**
3. **Build data services for each data type**
4. **Update UI components to use data services**
5. **Set up feature flag/environment variable for mock/real switching**
6. **Demo with synthetic data for presentation**
7. **Implement backend API endpoints**
8. **Switch data services to real API calls as endpoints are ready**
9. **Remove mock data only when real data is working**
10. **Document all transitions and keep fallback for demo reliability**

---

## Recommendations
- Keep mock data and real data switching logic centralized in services.
- Use clear comments and flags for easy maintenance.
- Gradually replace mock data with real data as backend APIs are built.
- Maintain demo reliability by keeping mock fallback until real data is fully tested.

---
_Last updated: February 26, 2026_