import { ApplicationError } from "../../_common/error.js";

export class ThreadNotFoundError extends ApplicationError {
  constructor(threadId: string) {
    super(`Thread ${threadId} not found in database.`, 404);
  }
}
