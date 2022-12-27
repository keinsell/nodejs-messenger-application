import { Entity } from "../_common/entity.js";
import { User } from "../user/user.entity.js";
import { MessageState } from "./message-state.enum.js";

export class Message extends Entity {
  message: string;
  sender: User;
  constructor(message: string, id?: string) {
    super(id);
    this.message = message;
  }
}
