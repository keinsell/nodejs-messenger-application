import { Command } from "./command.js";

export abstract class CommandHandler<Request extends Command, Response> {
  abstract execute(request: Request): Promise<Response>;
}
