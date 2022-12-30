import { Command, CommandProperties } from "../../../_common/command.js";

export class RecieveMessageCommand extends Command {
  readonly messageId: string;

  constructor(properties: CommandProperties<RecieveMessageCommand>) {
    super(properties);
    this.messageId = properties.messageId;
  }
}
