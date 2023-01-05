import { ApplicationError } from '../../_common/error.js'

export class UserAlreadyExists extends ApplicationError {
	constructor(userIdOrUsername: string) {
		super(
			`User ${userIdOrUsername} already exists.`,
			404,
		)
	}
}
