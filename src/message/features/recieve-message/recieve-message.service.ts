import { UserRepository } from '../../../user/repository.js'
import { Service } from 'diod'
import { MessageRepository } from '../../repository.js'
import { Logger } from '../../../_common/logger/adapter.js'
import { CommandHandler } from '../../../_common/usecase.js'
import { Message, MessageStatus } from '../../entity.js'
import { ThreadRepository } from '../../../thread/repository.js'
import { RecieveMessageCommand } from './recieve-message.command.js'
import { MessageNotFoundError } from '../../errors/message-not-found.error.js'

@Service()
export class RecieveMessageService
	implements
		CommandHandler<RecieveMessageCommand, Message>
{
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly userRepository: UserRepository,
		private readonly threadRepository: ThreadRepository,
		private readonly logger: Logger,
	) {}

	async execute(
		request: RecieveMessageCommand,
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

		// Set message status to RECEIVED/DELIVERED
		message.status = MessageStatus.delivered

		const savedMessage =
			await this.messageRepository.save(message)

		this.logger.log(
			`Delivered message ${savedMessage.id}`,
		)

		return savedMessage
	}
}
