import { User } from "../../../user/entity.js";

export interface SendMessageRequest {
  receiverId: string;
  user: User;
  message: string;
}
