import "reflect-metadata";
import test from "ava";

import { container } from "../../../_infrastructure/diod.config.js";
import { RegisterUserService } from "./register-user.service.js";
import { RegisterUserCommand } from "./register-user.command.js";

const service = container.get(RegisterUserService);

const command = new RegisterUserCommand({
  username: "keinsell",
  password: "keinsell",
  correlationId: "1234",
});

test("register user", async (t) => {
  const response = await service.execute(command);
  t.is(response.username, "keinsell");
});
