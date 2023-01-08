import 'reflect-metadata'
import { container } from './container.js'
import { RegisterUserService } from './user/features/register-user/register-user.service.js'
import { GetThreadService } from './thread/features/get-thread/get-thread.service.js'
import { RegisterUserCommand } from './user/features/register-user/register-user.command.js'
import { GetThreadCommand } from './thread/features/get-thread/get-thread.command.js'
import { SendMessageService } from './message/features/send-message/send-message.service.js'
import { SendMessageCommand } from './message/features/send-message/send-message.command.js'
import cuid from 'cuid'
import { RecieveMessageService } from './message/features/recieve-message/recieve-message.service.js'
import { RecieveMessageCommand } from './message/features/recieve-message/recieve-message.command.js'
import { ReadMessageService } from './message/features/read-message/read-message.service.js'
import { ReadMessageCommand } from './message/features/read-message/read-message.command.js'

const domonstrationExecutionCorreation = cuid()

const user = await container
	.get(RegisterUserService)
	.execute(
		new RegisterUserCommand({
			username: 'keinsell',
			password: 'keinsell',
			correlationId: domonstrationExecutionCorreation,
		}),
	)

const user2 = await container
	.get(RegisterUserService)
	.execute(
		new RegisterUserCommand({
			username: 'keinsell2',
			password: 'keinsell2',
			correlationId: domonstrationExecutionCorreation,
		}),
	)

const thread = await container
	.get(GetThreadService)
	.execute(
		new GetThreadCommand({
			userIds: [user.id, user2.id],
			userId: user.id,
			correlationId: domonstrationExecutionCorreation,
		}),
	)

const message = await container
	.get(SendMessageService)
	.execute(
		new SendMessageCommand({
			message: 'Hello World!',
			threadId: thread.id,
			userId: user.id,
			correlationId: domonstrationExecutionCorreation,
		}),
	)

await container.get(RecieveMessageService).execute(
	new RecieveMessageCommand({
		messageId: message.id,
	}),
)

const x = await container.get(GetThreadService).execute(
	new GetThreadCommand({
		threadId: thread.id,
		userId: user.id,
		correlationId: domonstrationExecutionCorreation,
	}),
)

console.log(x.messages)

await container.get(ReadMessageService).execute(
	new ReadMessageCommand({
		messageId: message.id,
		userId: user2.id,
		correlationId: domonstrationExecutionCorreation,
	}),
)

const threadFetch2 = await container
	.get(GetThreadService)
	.execute(
		new GetThreadCommand({
			threadId: thread.id,
			userId: user.id,
			correlationId: domonstrationExecutionCorreation,
		}),
	)

console.log(threadFetch2.messages)
