import { MessageRepository } from "../message/repository.js";
import { User } from "../user/entity.js";
import { Thread } from "./entity.js";
import { Service } from "diod";

export const THREAD_STORE: Thread[] = [];

@Service()
export class ThreadRepository {
  constructor(private readonly messageRepository: MessageRepository) {}

  save(thread: Thread) {
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
  findByMembers(members: User[]) {
    const memberIds = members.map((u) => u.id);

    const thread = THREAD_STORE.find((t) => {
      const threadMemberIds = t.members.map((u) => u.id);
      return memberIds.every((id) => threadMemberIds.includes(id));
    });

    if (!thread) {
      return null;
    }

    const messagesOfThread = this.messageRepository.findByThread(thread);

    return new Thread({ members, messages: messagesOfThread }, thread.id);
  }

  /** Find all threads where provided User is a member. */
  findByUser(user: User) {
    const threads = THREAD_STORE.filter((t) => {
      const memberIds = t.members.map((u) => u.id);
      return memberIds.includes(user.id);
    });

    return threads;
  }

  async findById(threadId: string) {
    const thread = THREAD_STORE.find((t) => t.id === threadId);

    const messagesOfThread = this.messageRepository.findByThread(thread);

    return new Thread(
      { members: thread.members, messages: messagesOfThread },
      thread.id
    );
  }
}
