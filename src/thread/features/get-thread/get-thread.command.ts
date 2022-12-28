import { Command, CommandProperties } from "../../../_common/command.js";

export class GetThreadCommand extends Command {
  readonly userIds: string[];
  constructor(properties: CommandProperties<GetThreadCommand>) {
    super(properties);
    this.userIds = properties.userIds;
  }
}
