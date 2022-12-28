import { Logger } from "./adapter.js";
import consola from "consola";

export class ConsoleLogger implements Logger {
  log(message: string, ...meta: unknown[]): void {
    consola.log(message, ...meta);
  }
  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    consola.error(message, trace, ...meta);
  }
  warn(message: string, ...meta: unknown[]): void {
    consola.warn(message, ...meta);
  }
  debug(message: string, ...meta: unknown[]): void {
    consola.debug(message, ...meta);
  }
}
