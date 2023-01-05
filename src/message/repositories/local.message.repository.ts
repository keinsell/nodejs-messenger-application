import { Message } from '../entity.js'
import { MessageRepository } from '../repository.js'
import { Thread } from '../../thread/entity.js'
import { Service } from 'diod'

const MESSAGE_STORE: Message[] = []

/** Local-repository works as a mock-up for information stored on server, it will be ereased every close of server yet it doesn't require a database connection, simple way for testing functionality. */
@Service()
export class LocalMessageRepository
	implements MessageRepository
{
	async save(message: Message) {
		// Check if message exists, if so update
		const existingMessage = MESSAGE_STORE.find(
			(m) => m.id === message.id,
		)

		if (existingMessage) {
			existingMessage.properties = message.properties
			return message
		}

		// Otherwise add to store
		MESSAGE_STORE.push(message)
		return message
	}

	async findByThread(thread: Thread) {
		const messages = MESSAGE_STORE.filter(
			(m) => m.receiver.id === thread.id,
		)
		return messages
	}

	async findById(messageId: any) {
		const message = MESSAGE_STORE.find(
			(m) => m.id === messageId,
		)
		return message
	}

	findAll(): Promise<Message[]> {
		throw new Error('Method not implemented.')
	}
	delete(id: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
	transaction<T>(callback: () => Promise<T>): Promise<T> {
		throw new Error('Method not implemented.')
	}
}
