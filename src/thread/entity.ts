import { Entity } from "../_common/entity.js";
import { User } from "../user/entity.js";

interface ThreadProperties {
  members: User[];
}

export class Thread extends Entity<ThreadProperties> {
  constructor(properties: ThreadProperties, id?: string) {
    super(properties, id);
  }

  get members() {
    return this.properties.members;
  }
}
