import { Entity } from "../_common/entity.js";
import { Message } from "../message/entity.js";
import { User } from "../user/entity.js";

interface ThreadProperties {
  members: User[];
  messages: Message[];
}

export class Thread extends Entity<ThreadProperties> {
  constructor(properties: ThreadProperties, id?: string) {
    super(properties, id);
  }

  get members() {
    return this.properties.members;
  }

  get messages() {
    return this.properties.messages;
  }
}
