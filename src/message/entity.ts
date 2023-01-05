import { Entity } from '../_common/entity.js'
import { Thread } from '../thread/entity.js'
import { User } from '../user/entity.js'
import type { SetRequired } from 'type-fest'

export enum MessageStatus {
	pending = 'PENDING',
	sent = 'SENT',
	delivered = 'DELIVERED',
	seen = 'SEEN',
}

interface MessageProperties {
	receiver: Thread
	sender: User
	attachments?: any[]
	message?: string
	status?: MessageStatus
}

export class Message extends Entity<MessageProperties> {
	constructor(
		properties: MessageProperties,
		id?: string,
	) {
		properties.status =
			properties.status ?? MessageStatus.pending
		super(properties, id)
	}

	get receiver() {
		return this.properties.receiver
	}

	get sender() {
		return this.properties.sender
	}

	set status(status: MessageStatus) {
		this.properties.status = status
	}
}

export class AttachmentMessage extends Message {
	constructor(
		properties: SetRequired<
			MessageProperties,
			'attachments'
		>,
		id?: string,
	) {
		super(properties, id)
	}
}

export class PlainMessage extends Message {
	constructor(
		properties: SetRequired<
			MessageProperties,
			'message'
		>,
		id?: string,
	) {
		super(properties, id)
	}
}

export class CombinedMessage extends Message {
	constructor(
		properties: SetRequired<
			MessageProperties,
			'message' | 'attachments'
		>,
		id?: string,
	) {
		super(properties, id)
	}
}
