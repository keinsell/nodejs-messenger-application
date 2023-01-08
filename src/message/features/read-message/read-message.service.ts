import { UserRepository } from '../../../user/repository.js'
import { Service } from 'diod'
import { MessageRepository } from '../../repository.js'
import { Logger } from '../../../_common/logger/adapter.js'
import { CommandHandler } from '../../../_common/usecase.js'
import { Message, MessageStatus } from '../../entity.js'
import { ThreadRepository } from '../../../thread/repository.js'
import { MessageNotFoundError } from '../../errors/message-not-found.error.js'
import { ReadMessageCommand } from './read-message.command.js'
import { UserNotPartOfThreadError } from '../../../thread/errors/user-not-part-of-thread-error.js'
import { UserNotFoundError } from '../../../user/errors/user-not-found.error.js'
import { ThreadNotFoundError } from '../../../thread/errors/thread-not-found.error.js'

@Service()
export class ReadMessageService
	implements CommandHandler<ReadMessageCommand, Message>
{
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly userRepository: UserRepository,
		private readonly threadRepository: ThreadRepository,
		private readonly logger: Logger,
	) {}

	async execute(
		request: ReadMessageCommand,
	): Promise<Message> {
		this.logger.debug(request)

		const message =
			await this.messageRepository.findById(
				request.messageId,
			)

		if (!message) {
			throw new MessageNotFoundError(
				request.messageId,
			)
		}

		// Check if user is part of the thread
		const thread = await this.threadRepository.findById(
			message.receiver.id,
		)

		if (!thread) {
			throw new ThreadNotFoundError(
				message.receiver.id,
			)
		}

		// const user = await this.userRepository.findById(request.userId)

		// if (!user) {
		//     throw new UserNotFoundError(request.userId)
		// }

		// if (!thread.members.includes(user)) {
		//     throw new UserNotPartOfThreadError(user, thread)
		// }

		message.status = MessageStatus.seen

		const savedMessage =
			await this.messageRepository.save(message)

		this.logger.log(
			`User ${request.userId} has seen message ${savedMessage.id} sent by ${savedMessage.sender}`,
		)

		return savedMessage
	}
}
