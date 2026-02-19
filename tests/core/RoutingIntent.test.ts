import { describe, it, expect, jest } from '@jest/globals';
import type { RoutingIntent } from '../../src/core/ports/RoutingIntent';

describe('RoutingIntent interface', () => {
  it('should allow mocking all required methods', async () => {
    const mockIntent = { from: 'BTC', to: 'ETH', amount: 10 };
    const mockRoutingIntent: RoutingIntent = {
      publishIntent: jest.fn((_: object) => Promise.resolve()),
      getIntents: jest.fn(() => Promise.resolve([mockIntent])),
    };
    await mockRoutingIntent.publishIntent(mockIntent);
    const intents = await mockRoutingIntent.getIntents();
    expect(intents[0]).toEqual(mockIntent);
  });
});
