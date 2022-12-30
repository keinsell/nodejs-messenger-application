import { ApplicationError } from "../../_common/error.js";

export class MessageNotFoundError extends ApplicationError {
  constructor(messageId: string) {
    super(`Message ${messageId} not found in database.`, 404);
  }
}
