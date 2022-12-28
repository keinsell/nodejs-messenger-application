import { Command, CommandProperties } from "../../../_common/command.js";

export class SendMessageCommand extends Command {
  readonly message: string;
  readonly threadId: string;
  readonly userId: string;

  constructor(properties: CommandProperties<SendMessageCommand>) {
    super(properties);
    this.message = properties.message;
    this.threadId = properties.threadId;
    this.userId = properties.userId;
  }
}
