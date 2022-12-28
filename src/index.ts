import "reflect-metadata";

import { container } from "./_infrastructure/diod.config.js";
import { RegisterUserService } from "./user/features/register-user/register-user.service.js";
import { GetThreadService } from "./thread/features/get-thread/get-thread.service.js";

const user = await container
  .get(RegisterUserService)
  .execute({ username: "keinsell", password: "keinsell" });

const user2 = await container
  .get(RegisterUserService)
  .execute({ username: "keinsell2", password: "keinsell2" });

const thread = await container
  .get(GetThreadService)
  .execute({ userIds: [user.id, user2.id] });
