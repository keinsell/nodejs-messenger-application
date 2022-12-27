import { Entity } from "../_common/entity.js";
import { Message } from "../message/message.entity.js";
import { User } from "../user/user.entity.js";

export class Thread extends Entity {
  messages: Message[];
  users: User[];
  constructor(users: User[], id?: string) {
    super(id);
    this.messages = [];
    this.users = users;
  }
}
