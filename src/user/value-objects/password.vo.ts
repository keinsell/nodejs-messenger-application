import argon2 from "argon2";
import { container } from "../../_infrastructure/diod.config.js";
import { Hasher } from "../../_common/security/hasher/adapter.js";

export class Password {
  hash: string;
  plain?: string;
  constructor(
    hash: string,
    plain?: string,
    private readonly hasher = container.get(Hasher)
  ) {
    this.hash = hash;
    this.plain = plain;
  }

  async compare(password: string) {
    return await this.hasher.verify(this.hash, password);
  }
}
