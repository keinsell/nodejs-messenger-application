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

    // If threadId is provided, return thread
    if (request.threadId) {
      const thread = await this.threadRepository.findById(request.threadId);

      if (!thread) {
        throw new Error(`Thread with id ${request.threadId} does not exist`);
      }

      // Check if user is member of thread

      const isUserMemberOfThread = thread.members.find(
        (member) => member.id === request.userId
      );

      if (!isUserMemberOfThread) {
        throw new Error(
          `User with id ${request.userId} is not a member of thread with id ${request.threadId}`
        );
      }

      this.logger.log(`Found thread:`, thread);

      return thread;
    }

    // Otherwise, find thread by members

    const users: User[] = [];

    for await (const userId of request.userIds) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new Error(`User with id ${userId} does not exist`);
      }

      users.push(user);
    }

    const thread = await this.threadRepository.findByMembers(users);

    // If thread does not exist, create it
    if (!thread) {
      const newThread = new Thread({ members: users, messages: [] });
      const savedThread = await this.threadRepository.save(newThread);

      this.logger.log(`Created thread:`, savedThread);

      return savedThread;
    }

    this.logger.log(`Found thread:`, thread);

    return thread;
  }
}
