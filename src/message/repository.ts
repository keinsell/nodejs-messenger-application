import { Repository } from '../_common/repository.js'
import { Thread } from '../thread/entity.js'
import { Message } from './entity.js'
import { Service } from 'diod'

export abstract class MessageRepository
	implements Repository<Message>
{
	abstract findAll(): Promise<Message[]>
	abstract delete(id: string): Promise<void>
	abstract save(message: Message): Promise<Message>
	abstract findByThread(
		thread: Thread,
	): Promise<Message[]>
	abstract findById(
		messageId: any,
	): Promise<Message | null>
	abstract transaction<T>(
		callback: () => Promise<T>,
	): Promise<T>
}
