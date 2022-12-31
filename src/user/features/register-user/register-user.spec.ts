import anyTest, { TestFn } from "ava";
import "reflect-metadata";
import { RegisterUserCommand } from "./register-user.command.js";
import {
  LocalUserRepository,
  USER_STORE,
} from "../../repositories/user.local.repository.js";
import { Argon2Hasher } from "../../../_common/security/hasher/argon2.hasher.js";
import { ConsoleLogger } from "../../../_common/logger/console.logger.js";
import { EndToEndEncryption } from "../../../_common/security/E2EE/adapter.js";
import { RegisterUserService } from "./register-user.service.js";

const test = anyTest as TestFn<{
  service: RegisterUserService;
  command: RegisterUserCommand;
}>;

test.beforeEach((t) => {
  t.context.service = new RegisterUserService(
    new LocalUserRepository(),
    new Argon2Hasher(),
    new ConsoleLogger(),
    new EndToEndEncryption()
  );

  t.context.command = new RegisterUserCommand({
    username: "keinsell",
    password: "keinsell",
    correlationId: "1234",
  });
});

test("register user", async (t) => {
  const response = await t.context.service.execute(t.context.command);

  t.is(response.username, "keinsell", "Username should be keinsell");

  // Check if USER_STORE array has user
  const isUser = USER_STORE.some((user) => user.username === "keinsell");
  t.true(isUser);
});

test.todo("register user with existing username");
