import { Command, CommandProperties } from "../../../_common/command.js";

export class SendMessageCommand extends Command {
  readonly message?: any;
  readonly attachments?: any[];
  readonly threadId: string;
  readonly userId: string;

  constructor(properties: CommandProperties<SendMessageCommand>) {
    super(properties);
    this.message = properties.message;
    this.threadId = properties.threadId;
    this.userId = properties.userId;
    this.attachments = properties.attachments;

    if (!this.message && !this.attachments) {
      throw new Error(`Either message or attachments must be specified`);
    }
  }
}
