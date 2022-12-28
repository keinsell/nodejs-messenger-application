import { Service } from "diod";
import { CommandHandler } from "../../../_common/usecase.js";
import { RegisterUserRequest } from "./data-transfer/register-user.request.js";
import { RegisterUserResponse } from "./data-transfer/register-user.response.js";
import { UserRepository } from "../../repository.js";
import { User } from "../../entity.js";
import { Password } from "../../value-objects/password.vo.js";
import { Hasher } from "../../../_common/security/hasher/adapter.js";
import { Logger } from "../../../_common/logger/adapter.js";
import { RegisterUserCommand } from "./register-user.command.js";

@Service()
export class RegisterUserService
  implements CommandHandler<RegisterUserCommand, RegisterUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly logger: Logger
  ) {}

  async execute(request: RegisterUserCommand): Promise<RegisterUserResponse> {
    this.logger.log(
      `Recived request to register user (${request.id})`,
      request
    );

    const isUserInDatabase = this.userRepository.findByUsername(
      request.username
    );

    if (isUserInDatabase) {
      throw new Error("User already exists");
    }

    const user = this.userRepository.save(
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
