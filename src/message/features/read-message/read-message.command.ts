import {
	Command,
	CommandProperties,
} from '../../../_common/command.js'

export class ReadMessageCommand extends Command {
	readonly messageId: string
	readonly userId: string

	constructor(
		properties: CommandProperties<ReadMessageCommand>,
	) {
		super(properties)
		this.messageId = properties.messageId
	}
}
