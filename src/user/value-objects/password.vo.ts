import { Hasher } from '../../_common/security/hasher/adapter.js'

export class Password {
	constructor(
		public hash: string,
		private readonly hasher: Hasher,
	) {
		this.hash = hash
	}
	async compare(password: string) {
		return await this.hasher.verify(this.hash, password)
	}
}
