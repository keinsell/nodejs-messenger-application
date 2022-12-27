import { Message } from "./message.entity.js";

export class MessageRepository {
  private storage: Message[] = [];
  async save(message: Message): Promise<Message> {
    // Find message in storage, if it exists, update it
    // If it doesn't exist, add it to the storage

    const index = this.storage.findIndex(
      (storedMessage) => storedMessage.id === message.id
    );
    if (index === -1) {
      this.storage.push(message);
    } else {
      this.storage[index] = message;
    }

    return message;
  }
}
