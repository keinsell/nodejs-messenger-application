import { UserRepository } from '../../../user/repository.js'
import { Service } from 'diod'
import { MessageRepository } from '../../repository.js'
import { Logger } from '../../../_common/logger/adapter.js'
import { CommandHandler } from '../../../_common/usecase.js'
import { SendMessageCommand } from './send-message.command.js'
import { Message, MessageStatus } from '../../entity.js'
import { ThreadRepository } from '../../../thread/repository.js'
import { UserIsNotMemberOfThreadError } from '../../../thread/errors/user-is-not-member-of-thread.error.js'
import { ThreadNotFoundError } from '../../../thread/errors/thread-not-found.error.js'
import { UserNotFoundError } from '../../../user/errors/user-not-found.error.js'

@Service()
export class SendMessageService
	implements CommandHandler<SendMessageCommand, Message>
{
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly userRepository: UserRepository,
		private readonly threadRepository: ThreadRepository,
		private readonly logger: Logger,
	) {}

	async execute(
		request: SendMessageCommand,
	): Promise<Message> {
		const thread = await this.threadRepository.findById(
			request.threadId,
		)
		const user = await this.userRepository.findById(
			request.userId,
		)

		this.logger.debug(request)

		if (!thread) {
			throw new ThreadNotFoundError(request.threadId)
		}

		if (!user) {
			throw new UserNotFoundError(request.userId)
		}

		// Check if user is member of thread
		const isUserMemberOfThread = thread.members.find(
			(member) => member.id === user.id,
		)

		if (!isUserMemberOfThread) {
			throw new UserIsNotMemberOfThreadError(
				user,
				thread,
			)
		}

		const message = new Message({
			receiver: thread,
			sender: user,
			message: request.message,
			attachments: request.attachments,
			status: MessageStatus.sent,
		})

		const savedMessage =
			await this.messageRepository.save(message)

		this.logger.log(
			`Created/Sent message ${savedMessage.id}`,
		)

		return savedMessage
	}
}
