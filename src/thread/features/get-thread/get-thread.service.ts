import { Logger } from "../../../_common/logger/adapter.js";
import { Usecase } from "../../../_common/usecase.js";
import { User } from "../../../user/entity.js";
import { UserRepository } from "../../../user/repository.js";
import { Thread } from "../../entity.js";
import { ThreadRepository } from "../../repository.js";
import { GetThreadRequest } from "./get-thread.request.js";
import { GetThreadResponse } from "./get-thread.response.js";
import { Service } from "diod";

@Service()
export class GetThreadService
  implements Usecase<GetThreadRequest, GetThreadResponse>
{
  constructor(
    private readonly threadRepository: ThreadRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}
  async execute(request: GetThreadRequest): Promise<GetThreadResponse> {
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

      return {
        id: savedThread.id,
      };
    }

    this.logger.log(`Found thread ${thread.id}`);

    return {
      id: thread.id,
    };
  }
}
