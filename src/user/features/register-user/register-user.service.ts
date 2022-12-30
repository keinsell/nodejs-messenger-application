import { Service } from "diod";
import { CommandHandler } from "../../../_common/usecase.js";
import { RegisterUserResponse } from "./data-transfer/register-user.response.js";
import { UserRepository } from "../../repository.js";
import { User } from "../../entity.js";
import { Password } from "../../value-objects/password.vo.js";
import { Hasher } from "../../../_common/security/hasher/adapter.js";
import { Logger } from "../../../_common/logger/adapter.js";
import { RegisterUserCommand } from "./register-user.command.js";
import { EndToEndEncryption } from "../../../_common/security/E2EE/adapter.js";
import { UserAlreadyExists } from "../../errors/user-already-exists.error.js";

@Service()
export class RegisterUserService
  implements CommandHandler<RegisterUserCommand, RegisterUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly logger: Logger,
    private readonly encryption: EndToEndEncryption
  ) {}

  async execute(request: RegisterUserCommand): Promise<RegisterUserResponse> {
    this.logger.debug(request);

    const isUserInDatabase = await this.userRepository.findByUsername(
      request.username
    );

    if (isUserInDatabase) {
      throw new UserAlreadyExists(request.username);
    }

    const user = await this.userRepository.save(
      new User({
        username: request.username,
        password: new Password(
          await this.hasher.hash(request.password),
          request.password
        ),
      })
    );

    this.logger.log(`Created user ${user.username} (${user.id})`);

    return {
      id: user.id,
      username: user.username,
    };
  }
}
