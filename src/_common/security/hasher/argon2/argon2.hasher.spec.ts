import anyTest, { TestFn } from "ava";
import { Hasher } from "../adapter.js";
import { Argon2Hasher } from "./argon2.hasher.js";

const test = anyTest as TestFn<{
  service: Hasher;
}>;

test.beforeEach((t) => {
  t.context.service = new Argon2Hasher();
});

test("Hasher should hash input string", async (t) => {
  const hash = await t.context.service.hash("keinsell");
  t.true(hash.length > 0);
});

test("Hasher should verify input string", async (t) => {
  const hash = await t.context.service.hash("keinsell");
  const result = await t.context.service.verify("keinsell", hash);
  t.true(result);
});
