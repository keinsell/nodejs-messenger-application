export class ApplicationError {
	public readonly message: string
	public readonly name: string
	public readonly stack?: string
	public readonly statusCode: number

	constructor(message: string, statusCode: number = 500) {
		this.message = message
		this.statusCode = statusCode
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
	}
}
