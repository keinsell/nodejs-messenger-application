import { MessageResponse } from "../message/response.js";
import { UserResponse } from "../user/response.js";

export interface ThreadResponse {
  id: string;
  members: UserResponse[];
  messages: MessageResponse[];
}
