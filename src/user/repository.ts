import { Repository } from '../_common/repository.js'
import { User } from './entity.js'
import { Service } from 'diod'

export abstract class UserRepository
	implements Repository<User>
{
	abstract save(entity: User): Promise<User>
	abstract findById(id: string): Promise<User>
	abstract findAll(): Promise<User[]>
	abstract delete(id: string): Promise<void>
	abstract transaction<T>(
		callback: () => Promise<T>,
	): Promise<T>
	abstract findByUsernameOrThrow(
		username: string,
	): Promise<User>
	abstract findByUsername(
		username: string,
	): Promise<User | undefined>
}
