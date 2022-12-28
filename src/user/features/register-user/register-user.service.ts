import { Service } from "diod";
import { Usecase } from "../../../_common/usecase.js";
import { RegisterUserRequest } from "./register-user.request.js";
import { RegisterUserResponse } from "./register-user.response.js";
import { UserRepository } from "../../repository.js";
import { User } from "../../entity.js";
import { Password } from "../../value-objects/password.vo.js";
import { Hasher } from "../../../_common/security/hasher/adapter.js";

@Service()
export class RegisterUserService
  implements Usecase<RegisterUserRequest, RegisterUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
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

    console.log(`Created user ${user.username} with id ${user.id}`);

    return {
      id: user.id,
      username: user.username,
    };
  }
}
