import { Logger } from '../../../_common/logger/adapter.js'
import { CommandHandler } from '../../../_common/usecase.js'
import { User } from '../../../user/entity.js'
import { UserRepository } from '../../../user/repository.js'
import { Thread } from '../../entity.js'
import { ThreadRepository } from '../../repository.js'
import { Service } from 'diod'
import { GetThreadCommand } from './get-thread.command.js'
import { UserNotFoundError } from '../../../user/errors/user-not-found.error.js'
import { UserIsNotMemberOfThreadError } from '../../errors/user-is-not-member-of-thread.error.js'
import { ThreadNotFoundError } from '../../errors/thread-not-found.error.js'

@Service()
export class GetThreadService
	implements CommandHandler<GetThreadCommand, Thread>
{
	constructor(
		private readonly threadRepository: ThreadRepository,
		private readonly userRepository: UserRepository,
		private readonly logger: Logger,
	) {}
	async execute(
		request: GetThreadCommand,
	): Promise<Thread> {
		this.logger.debug(request)

		const user = await this.userRepository.findById(
			request.userId,
		)

		if (!user) {
			throw new UserNotFoundError(request.userId)
		}

		// If threadId is provided, return thread
		if (request.threadId) {
			const thread =
				await this.threadRepository.findById(
					request.threadId,
				)
			const user = await this.userRepository.findById(
				request.userId,
			)

			if (!thread) {
				throw new ThreadNotFoundError(
					request.threadId,
				)
			}

			// Check if user is member of thread
			const isUserMemberOfThread =
				thread.members.find(
					(member) => member.id === user.id,
				)

			if (!isUserMemberOfThread) {
				throw new UserIsNotMemberOfThreadError(
					user,
					thread,
				)
			}

			this.logger.log(
				`Found existing thread:`,
				thread,
			)

			return thread
		}

		// Otherwise, find thread by members
		const users: User[] = []

		for await (const userId of request.userIds) {
			const user = await this.userRepository.findById(
				userId,
			)

			if (!user) {
				throw new UserNotFoundError(userId)
			}

			users.push(user)
		}

		const thread =
			await this.threadRepository.findByMembers(users)

		// If thread does not exist, create it
		if (!thread) {
			const newThread = new Thread({
				members: users,
				messages: [],
			})
			const savedThread =
				await this.threadRepository.save(newThread)

			this.logger.log(
				`Created new thread:`,
				savedThread,
			)

			return savedThread
		}

		this.logger.log(`Found exiting thread:`, thread)

		return thread
	}
}
