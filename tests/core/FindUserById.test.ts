import { describe, it, expect } from "@jest/globals";
import { FindUserById } from "../../src/core/use-cases/FindUserById";
import { User } from "../../src/core/entities/User";

describe("FindUserById", () => {
  it("should return the user with the given id", () => {
    const users = [new User("user-1", 0), new User("user-2", 5)];
    const findUserById = new FindUserById(users);
    const user = findUserById.execute("user-2");
    expect(user).toBe(users[1]);
  });

  it("should return null if user not found", () => {
    const users = [new User("user-1", 0)];
    const findUserById = new FindUserById(users);
    const user = findUserById.execute("user-2");
    expect(user).toBeNull();
  });
});
