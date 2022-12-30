import { Service } from "diod";
import { User } from "../entity.js";
import { UserRepository } from "../repository.js";

export const USER_STORE: User[] = [];

/** Local-repository works as a mock-up for information stored on server, it will be ereased every close of server yet it doesn't require a database connection, simple way for testing functionality. */
@Service()
export class LocalUserRepository implements UserRepository {
  async save(user: User) {
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

  async findById(userId: string): Promise<User | undefined> {
    const user = USER_STORE.find((u) => u.id === userId);
    return user;
  }

  async findByUsernameOrThrow(username: string) {
    const user = USER_STORE.find((u) => u.username === username);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = USER_STORE.find((u) => u.username === username);
    return user;
  }

  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  transaction<T>(callback: () => Promise<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
