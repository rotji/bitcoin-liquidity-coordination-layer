// Interface for reputation adapter
export interface Reputation {
  updateScore(userId: string, score: number): Promise<void>;
  getScore(userId: string): Promise<number>;
}
