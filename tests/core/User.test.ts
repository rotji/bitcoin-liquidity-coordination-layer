import { describe, it, expect } from "@jest/globals";
import { User } from "../../src/core/entities/User";

describe("User", () => {
  it("should create a valid user", () => {
    const user = new User("user-1", 100);
    expect(user.id).toBe("user-1");
    expect(user.reputationScore).toBe(100);
  });

  it("should update reputation score", () => {
    const user = new User("user-2", 50);
    user.reputationScore = 200;
    expect(user.reputationScore).toBe(200);
  });
});
