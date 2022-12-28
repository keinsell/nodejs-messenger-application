import { User } from "./entity.js";
import { Service } from "diod";

export const USER_STORE: User[] = [];

@Service()
export class UserRepository {
  save(user: User) {
    // Check if user exists, if so update
    const existingUser = USER_STORE.find((u) => u.id === user.id);

    if (existingUser) {
      existingUser.properties = user.properties;
      return user;
    }

    // Otherwise add to store
    USER_STORE.push(user);
    return user;
  }

  static findByUsernameOrThrow(username: string) {
    const user = USER_STORE.find((u) => u.username === username);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  findByUsername(username: string) {
    const user = USER_STORE.find((u) => u.username === username);
    return user;
  }
}
