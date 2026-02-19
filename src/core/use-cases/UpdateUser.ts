// Use case for updating a user
import { User } from "../entities/User";

export class UpdateUser {
  constructor(private users: User[]) {}

  execute(id: string, reputationScore: number, authorized: boolean = true): void {
    if (!authorized) {
      throw new Error('Unauthorized update');
    }
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.reputationScore = reputationScore;
    }
  }
}
