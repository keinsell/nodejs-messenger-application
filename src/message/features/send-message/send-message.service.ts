import { UserRepository } from "../../../user/repository.js";
import { Service } from "diod";
import { MessageRepository } from "../../repository.js";
import { SendMessageRequest } from "./send-message.request.js";
import { Logger } from "../../../_common/logger/adapter.js";

@Service()
export class SendMessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async execture(request: SendMessageRequest): Promise<any> {}
}
