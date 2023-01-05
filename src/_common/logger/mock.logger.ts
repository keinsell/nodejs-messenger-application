import { Logger } from './adapter.js'
import consola from 'consola'

/** Logger instance to silence any output logs. */
export class MockLogger implements Logger {
	log(message: any, ...meta: unknown[]): void {}
	error(
		message: any,
		trace?: unknown,
		...meta: unknown[]
	): void {}
	warn(message: any, ...meta: unknown[]): void {}
	debug(message: any, ...meta: unknown[]): void {}
}
