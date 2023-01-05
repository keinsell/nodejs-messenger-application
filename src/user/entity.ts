import { Entity } from '../_common/entity.js'
import { Password } from './value-objects/password.vo.js'

interface UserProperties {
	firstName?: string
	lastName?: string
	email?: string
	phoneNumber?: string
	username: string
	password: Password
	birthdate?: Date
	// publicKey: string;
}

export class User extends Entity<UserProperties> {
	constructor(properties: UserProperties, id?: string) {
		super(properties, id)
	}

	get username() {
		return this.properties.username
	}

	get password() {
		return this.properties.password
	}
}
