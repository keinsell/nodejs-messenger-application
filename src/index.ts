import "reflect-metadata";

import { container } from "./_infrastructure/diod.config.js";
import { RegisterUserService } from "./user/features/register-user/register-user.service.js";

const user = await container
  .get(RegisterUserService)
  .execute({ username: "keinsell", password: "keinsell" });
