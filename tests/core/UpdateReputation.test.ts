import { describe, it, expect, jest } from '@jest/globals';
import { UpdateReputation } from '../../src/core/use-cases/UpdateReputation';
import type { Reputation } from '../../src/core/ports/Reputation';

describe('UpdateReputation', () => {
  it('should update user reputation using the port', async () => {
    const mockUpdateScore = jest.fn((_: string, __: number) => Promise.resolve()) as (userId: string, score: number) => Promise<void>;
    const mockReputation: Reputation = {
      updateScore: mockUpdateScore,
      getScore: jest.fn((_: string) => Promise.resolve(0)) as (userId: string) => Promise<number>,
    };
    const updateReputation = new UpdateReputation(mockReputation);
    await updateReputation.execute('user-1', 42);
    expect(mockUpdateScore).toHaveBeenCalledWith('user-1', 42);
  });
});
