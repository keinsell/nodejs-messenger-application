import { Service } from "diod";
import { Thread } from "../entity.js";
import { ThreadRepository } from "../repository.js";
import { MessageRepository } from "../../message/repository.js";
import { User } from "../../user/entity.js";

export const THREAD_STORE: Thread[] = [];

/** Local-repository works as a mock-up for information stored on server, it will be ereased every close of server yet it doesn't require a database connection, simple way for testing functionality. */
@Service()
export class LocalThreadRepository implements ThreadRepository {
  constructor(private readonly messageRepository: MessageRepository) {}

  findAll(): Promise<Thread[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  transaction<T>(callback: () => Promise<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
  async save(thread: Thread) {
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

  /** Find single thread which contains all provided members. */
  async findByMembers(members: User[]) {
    const memberIds = members.map((u) => u.id);

    const thread = THREAD_STORE.find((t) => {
      const threadMemberIds = t.members.map((u) => u.id);
      return memberIds.every((id) => threadMemberIds.includes(id));
    });

    if (!thread) {
      return null;
    }

    const messagesOfThread = await this.messageRepository.findByThread(thread);

    return new Thread({ members, messages: messagesOfThread }, thread.id);
  }

  /** Find all threads where provided User is a member. */
  async findByUser(user: User) {
    const threads = THREAD_STORE.filter((t) => {
      const memberIds = t.members.map((u) => u.id);
      return memberIds.includes(user.id);
    });

    return threads;
  }

  async findById(threadId: string) {
    const thread = THREAD_STORE.find((t) => t.id === threadId);

    const messagesOfThread = await this.messageRepository.findByThread(thread);

    return new Thread(
      { members: thread.members, messages: messagesOfThread },
      thread.id
    );
  }
}
