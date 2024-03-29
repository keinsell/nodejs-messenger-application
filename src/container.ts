import { ContainerBuilder } from 'diod'
import { UserRepository } from './user/repository.js'
import { SendMessageService } from './message/features/send-message/send-message.service.js'
import { MessageRepository } from './message/repository.js'
import { ThreadRepository } from './thread/repository.js'
import { Hasher } from './_common/security/hasher/adapter.js'
import { RegisterUserService } from './user/features/register-user/register-user.service.js'
import { GetThreadService } from './thread/features/get-thread/get-thread.service.js'
import { Logger } from './_common/logger/adapter.js'
import { ConsoleLogger } from './_common/logger/console.logger.js'
import { EndToEndEncryption } from './_common/security/E2EE/adapter.js'
import { RecieveMessageService } from './message/features/recieve-message/recieve-message.service.js'
import { LocalMessageRepository } from './message/repositories/local.message.repository.js'
import { LocalUserRepository } from './user/repositories/local.user.repository.js'
import { LocalThreadRepository } from './thread/repositories/local.thread.repository.js'
import { Argon2Hasher } from './_common/security/hasher/argon2/argon2.hasher.js'
import { ReadMessageService } from './message/features/read-message/read-message.service.js'

const builder = new ContainerBuilder()

if (process.env.NODE_ENV !== 'testing') {
	// Common Services
	builder.register(Hasher).use(Argon2Hasher)
	builder.register(Logger).use(ConsoleLogger)
	builder.registerAndUse(EndToEndEncryption)

	// Repositories
	builder
		.register(UserRepository)
		.use(LocalUserRepository)
		.asSingleton()
	builder
		.register(MessageRepository)
		.use(LocalMessageRepository)
		.asSingleton()
	builder
		.register(ThreadRepository)
		.use(LocalThreadRepository)
		.asSingleton()

	// Message-related Services
	builder.registerAndUse(SendMessageService)
	builder.registerAndUse(RecieveMessageService)
	builder.registerAndUse(ReadMessageService)

	// User-related Services
	builder.registerAndUse(RegisterUserService)

	// Thread-related Services
	builder.registerAndUse(GetThreadService)

	// Other Services
}

const container = builder.build()

export { container }
