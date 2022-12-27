import { Entity } from "../_common/entity.js";
import { Thread } from "../thread/entity.js";
import { User } from "../user/entity.js";

interface MessageProperties {
  receiver: Thread;
  sender: User;
}

export class Message extends Entity<MessageProperties> {
  constructor(properties: MessageProperties, id?: string) {
    super(properties, id);
  }

  get receiver() {
    return this.properties.receiver;
  }

  get sender() {
    return this.properties.sender;
  }
}
