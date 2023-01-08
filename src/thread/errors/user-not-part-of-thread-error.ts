import { ApplicationError } from '../../_common/error.js'
import { User } from '../../user/entity.js'
import { Thread } from '../entity.js'

export class UserNotPartOfThreadError extends ApplicationError {
	constructor(user: User, thread: Thread) {
		super(
			`User ${user.id} is not a member of ${thread.id}`,
			404,
		)
	}
}
