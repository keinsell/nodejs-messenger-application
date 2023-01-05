import { ApplicationError } from '../../_common/error.js'

export class UserNotFoundError extends ApplicationError {
	constructor(userIdOrUsername: string) {
		super(
			`User ${userIdOrUsername} not found in database.`,
			404,
		)
	}
}
