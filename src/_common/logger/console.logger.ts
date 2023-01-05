import { Logger } from './adapter.js'
import consola from 'consola'

export class ConsoleLogger implements Logger {
	log(message: any, ...meta: unknown[]): void {
		consola.log(message, ...meta)
	}
	error(
		message: any,
		trace?: unknown,
		...meta: unknown[]
	): void {
		consola.error(message, trace, ...meta)
	}
	warn(message: any, ...meta: unknown[]): void {
		consola.warn(message, ...meta)
	}
	debug(message: any, ...meta: unknown[]): void {
		consola.debug(message, ...meta)
	}
}
