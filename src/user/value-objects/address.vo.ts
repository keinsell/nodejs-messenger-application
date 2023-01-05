export class Address {
	public readonly street: string
	public readonly city: string
	public readonly state: string
	public readonly country: string
	public readonly zipCode: string

	constructor(
		street: string,
		city: string,
		state: string,
		country: string,
		zip: string,
	) {
		this.street = street
		this.city = city
		this.state = state
		this.zipCode = zip
	}
}
