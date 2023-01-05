import {
	Command,
	CommandProperties,
} from '../../../_common/command.js'

export class RegisterUserCommand extends Command {
	readonly username: string
	readonly password: string

	constructor(
		properties: CommandProperties<RegisterUserCommand>,
	) {
		super(properties)
		this.username = properties.username
		this.password = properties.password
	}
}
