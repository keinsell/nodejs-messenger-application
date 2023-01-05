import cuid from 'cuid'

export class Entity<Properties> {
	id: string
	properties: Properties

	constructor(properties: Properties, id?: string) {
		this.properties = properties
		this.id = id || cuid()
	}
}
