import { ContainerBuilder } from "diod";
import { UserRepository } from "../user/repository.js";
import { SendMessageService } from "../message/features/send-message/send-message.service.js";
import { MessageRepository } from "../message/repository.js";
import { ThreadRepository } from "../thread/repository.js";
import { Hasher } from "../_common/security/hasher/adapter.js";
import { Argon2Hasher } from "../_common/security/hasher/argon2.hasher.js";
import { RegisterUserService } from "../user/features/register-user/register-user.service.js";
import { GetThreadService } from "../thread/features/get-thread/get-thread.service.js";
import { Logger } from "../_common/logger/adapter.js";
import { ConsoleLogger } from "../_common/logger/console.logger.js";
import { EndToEndEncryption } from "../_common/security/E2EE/adapter.js";

const builder = new ContainerBuilder();

// Common Services
builder.register(Hasher).use(Argon2Hasher);
builder.register(Logger).use(ConsoleLogger);
builder.registerAndUse(EndToEndEncryption);

// Repositories
builder.registerAndUse(UserRepository);
builder.registerAndUse(MessageRepository);
builder.registerAndUse(ThreadRepository);

// Message-related Services
builder.registerAndUse(SendMessageService);

// User-related Services
builder.registerAndUse(RegisterUserService);

// Thread-related Services
builder.registerAndUse(GetThreadService);

// Other Services

const container = builder.build();

export { container };
