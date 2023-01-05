import { Repository } from '../_common/repository.js'
import { MessageRepository } from '../message/repository.js'
import { User } from '../user/entity.js'
import { Thread } from './entity.js'
import { Service } from 'diod'

export abstract class ThreadRepository
	implements Repository<Thread>
{
	abstract save(thread: Thread): Promise<Thread>

	/** Find single thread which contains all provided members. */
	abstract findByMembers(
		members: User[],
	): Promise<Thread | null>

	/** Find all threads where provided User is a member. */
	abstract findByUser(user: User): Promise<Thread[]>

	abstract findById(
		threadId: string,
	): Promise<Thread | null>

	abstract findAll(): Promise<Thread[]>
	abstract delete(id: string): Promise<void>
	abstract transaction<T>(
		callback: () => Promise<T>,
	): Promise<T>
}
