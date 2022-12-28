import { Entity } from "../_common/entity.js";
import { Thread } from "../thread/entity.js";
import { User } from "../user/entity.js";
import type { SetRequired } from "type-fest";
interface MessageProperties {
  receiver: Thread;
  sender: User;
  attachments?: any[];
  message?: string;
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

export class AttachmentMessage extends Message {
  constructor(
    properties: SetRequired<MessageProperties, "attachments">,
    id?: string
  ) {
    super(properties, id);
  }
}

export class PlainMessage extends Message {
  constructor(
    properties: SetRequired<MessageProperties, "message">,
    id?: string
  ) {
    super(properties, id);
  }
}

export class CombinedMessage extends Message {
  constructor(
    properties: SetRequired<MessageProperties, "message" | "attachments">,
    id?: string
  ) {
    super(properties, id);
  }
}
