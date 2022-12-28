import { Command, CommandProperties } from "../../../_common/command.js";

export class GetThreadCommand extends Command {
  readonly userIds?: string[];
  readonly userId: string;
  readonly threadId?: string;
  constructor(properties: CommandProperties<GetThreadCommand>) {
    super(properties);
    this.userIds = properties.userIds;
    this.userId = properties.userId;
    this.threadId = properties.threadId;

    if (!this.userIds && !this.threadId) {
      throw new Error(`Either userIds or threadId must be specified`);
    }
  }
}
