import { User } from "../user/entity.js";
import { Thread } from "./entity.js";

export const THREAD_STORE: Thread[] = [];

export class ThreadRepository {
  static save(thread: Thread) {
    // Check if thread exists, if so update
    const existingThread = THREAD_STORE.find((t) => t.id === thread.id);

    if (existingThread) {
      existingThread.properties = thread.properties;
      return thread;
    }

    // Otherwise add to store
    THREAD_STORE.push(thread);
    return thread;
  }

  static findByMembers(members: User[]) {
    const thread = THREAD_STORE.find((t) => {
      const memberIds = t.members.map((u) => u.id);
      return members.every((u) => memberIds.includes(u.id));
    });

    return thread;
  }
}
