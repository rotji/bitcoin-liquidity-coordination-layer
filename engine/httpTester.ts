// engine/httpTester.ts
// Automated HTTP endpoint tester for backend integration

import fetch from 'node-fetch';

export interface EndpointTestResult {
  endpoint: string;
  success: boolean;
  status?: number;
  message: string;
  data?: any;
}

/**
 * Test a backend HTTP endpoint and check for valid response.
 * @param url The full URL to test (e.g., http://localhost:4000/api/liquidity)
 * @param validateFn Optional function to validate the response data
 * @param options Optional fetch options (method, headers, body, etc.)
 */
export async function testEndpoint(
  url: string,
  validateFn?: (data: any) => boolean,
  options?: any
): Promise<EndpointTestResult> {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    let valid = true;
    let message = 'OK';
    if (validateFn) {
      valid = validateFn(data);
      message = valid ? 'Valid response' : 'Invalid response data';
    }
    return {
      endpoint: url,
      success: res.ok && valid,
      status: res.status,
      message,
      data: valid ? data : undefined,
    };
  } catch (err: any) {
    return {
      endpoint: url,
      success: false,
      message: err instanceof Error ? err.message : String(err) || 'Request failed',
    };
  }
}

/**
 * Example: Validate liquidity data structure (customize as needed)
 */
export function isValidLiquidityData(data: any): boolean {
  return Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('pool');
}
