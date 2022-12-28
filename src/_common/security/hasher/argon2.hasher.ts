import argon2 from "argon2";
import { Service } from "diod";
import { Hasher } from "./adapter.js";

@Service()
export class Argon2Hasher implements Hasher {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }
  async verify(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
