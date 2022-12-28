import { UserRepository } from "../../../user/repository.js";
import { Service } from "diod";
import { MessageRepository } from "../../repository.js";
import { Logger } from "../../../_common/logger/adapter.js";
import { CommandHandler } from "../../../_common/usecase.js";
import { SendMessageCommand } from "./send-message.command.js";
import { Message } from "../../entity.js";
import { ThreadRepository } from "../../../thread/repository.js";

@Service()
export class SendMessageService
  implements CommandHandler<SendMessageCommand, Message>
{
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly threadRepository: ThreadRepository,
    private readonly logger: Logger
  ) {}

  async execute(request: SendMessageCommand): Promise<Message> {
    const thread = await this.threadRepository.findById(request.threadId);
    const user = await this.userRepository.findById(request.userId);

    this.logger.log("Recived command:", request);

    if (!thread) {
      throw new Error(`Thread with id ${request.threadId} does not exist`);
    }

    if (!user) {
      throw new Error(`User with id ${request.userId} does not exist`);
    }

    // Check if user is member of thread
    const isUserMemberOfThread = thread.members.find(
      (member) => member.id === user.id
    );

    if (!isUserMemberOfThread) {
      throw new Error(
        `User with id ${request.userId} is not a member of thread with id ${request.threadId}`
      );
    }

    const message = new Message({
      receiver: thread,
      sender: user,
      message: request.message,
      attachments: request.attachments,
    });

    const savedMessage = await this.messageRepository.save(message);

    this.logger.log(`Created message ${savedMessage.id}`);

    return savedMessage;
  }
}
