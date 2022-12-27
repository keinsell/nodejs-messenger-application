import { UserRepository } from "../user/repository.js";
import { Message } from "./entity.js";
import signale from "signale";
import { MessageRepository } from "./repository.js";

export class MessageService {
  static async sendMessage(message: Message) {
    MessageRepository.save(message);
    signale.success(
      `Sent Message from "${
        message.sender.username
      }" to following users: ${message.receiver.members.map(
        (m) => m.username
      )} (threadId: ${message.receiver.id})`
    );
  }
}
