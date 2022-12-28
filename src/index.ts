import "reflect-metadata";

import { container } from "./_infrastructure/diod.config.js";
import { RegisterUserService } from "./user/features/register-user/register-user.service.js";
import { GetThreadService } from "./thread/features/get-thread/get-thread.service.js";
import { RegisterUserCommand } from "./user/features/register-user/register-user.command.js";
import { GetThreadCommand } from "./thread/features/get-thread/get-thread.command.js";
import { SendMessageService } from "./message/features/send-message/send-message.service.js";
import { SendMessageCommand } from "./message/features/send-message/send-message.command.js";
import cuid from "cuid";

const domonstrationExecutionCorreation = cuid();

const user = await container.get(RegisterUserService).execute(
  new RegisterUserCommand({
    username: "keinsell",
    password: "keinsell",
    correlationId: domonstrationExecutionCorreation,
  })
);

const user2 = await container
  .get(RegisterUserService)
  .execute(
    new RegisterUserCommand({
      username: "keinsell2",
      password: "keinsell2",
      correlationId: domonstrationExecutionCorreation,
    })
  );

const thread = await container
  .get(GetThreadService)
  .execute(
    new GetThreadCommand({
      userIds: [user.id, user2.id],
      userId: user.id,
      correlationId: domonstrationExecutionCorreation,
    })
  );

const message = await container.get(SendMessageService).execute(
  new SendMessageCommand({
    message: "Hello World!",
    threadId: thread.id,
    userId: user.id,
    correlationId: domonstrationExecutionCorreation,
  })
);

const x = await container
  .get(GetThreadService)
  .execute(
    new GetThreadCommand({
      threadId: thread.id,
      userId: user.id,
      correlationId: domonstrationExecutionCorreation,
    })
  );
