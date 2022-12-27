import argon2 from "argon2";

export class Password {
  hash: string;
  plain?: string;
  constructor(hash: string, plain?: string) {
    this.hash = hash;
    this.plain = plain;
  }

  static async fromPlain(password: string) {
    const hashed = await argon2.hash(password);
    return new Password(hashed, password);
  }

  static fromHash(hash: string) {
    return new Password(hash);
  }

  async compare(password: string) {
    return await argon2.verify(this.hash, password);
  }
}
