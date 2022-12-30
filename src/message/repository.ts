import { Thread } from "../thread/entity.js";
import { Message } from "./entity.js";
import { Service } from "diod";

export const MESSAGE_STORE: Message[] = [];

@Service()
export class MessageRepository {
  async save(message: Message) {
    // Check if message exists, if so update
    const existingMessage = MESSAGE_STORE.find((m) => m.id === message.id);

    if (existingMessage) {
      existingMessage.properties = message.properties;
      return message;
    }

    // Otherwise add to store
    MESSAGE_STORE.push(message);
    return message;
  }

  findByThread(thread: Thread) {
    const messages = MESSAGE_STORE.filter((m) => m.receiver.id === thread.id);
    return messages;
  }

  findById(messageId: any) {
    const message = MESSAGE_STORE.find((m) => m.id === messageId);
    return message;
  }
}
