import { Entity } from "../_common/entity.js";
import { Message } from "../message/entity.js";
import { MessageRepository } from "../message/repository.js";
import { User } from "../user/entity.js";
import { ThreadRepository } from "./repository.js";

interface ThreadProperties {
  members: User[];
  messages: Message[];
}

export class Thread extends Entity<ThreadProperties> {
  constructor(properties: ThreadProperties, id?: string) {
    super(properties, id);
  }

  static create(members: User[]) {
    const isThread = ThreadRepository.findByMembers(members);

    if (isThread) {
      const messages = MessageRepository.findByThread(isThread);

      return new Thread(
        {
          members,
          messages,
        },
        isThread.id
      );
    }

    const thread = new Thread({
      members,
      messages: [],
    });

    return ThreadRepository.save(thread);
  }

  get members() {
    return this.properties.members;
  }

  get messages() {
    return this.properties.messages;
  }
}
