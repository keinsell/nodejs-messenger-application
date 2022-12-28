import { Logger } from "../../../_common/logger/adapter.js";
import { CommandHandler } from "../../../_common/usecase.js";
import { User } from "../../../user/entity.js";
import { UserRepository } from "../../../user/repository.js";
import { Thread } from "../../entity.js";
import { ThreadRepository } from "../../repository.js";
import { Service } from "diod";
import { GetThreadCommand } from "./get-thread.command.js";

@Service()
export class GetThreadService
  implements CommandHandler<GetThreadCommand, Thread>
{
  constructor(
    private readonly threadRepository: ThreadRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}
  async execute(request: GetThreadCommand): Promise<Thread> {
    this.logger.log("Recived command:", request);

    const users: User[] = [];

    for await (const userId of request.userIds) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new Error(`User with id ${userId} does not exist`);
      }

      users.push(user);
    }

    const thread = await this.threadRepository.findByMembers(users);

    if (!thread) {
      // Create thread
      const newThread = new Thread({ members: users });
      const savedThread = await this.threadRepository.save(newThread);

      this.logger.log(`Created thread ${savedThread.id}`);

      return savedThread;
    }

    this.logger.log(`Found thread ${thread.id}`);

    return thread;
  }
}
