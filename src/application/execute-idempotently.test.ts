import assert from "node:assert/strict";
import test from "node:test";
import { InMemoryIdempotencyRepository } from "../adapters/in-memory-repository.js";
import { JsonFingerprint } from "../adapters/json-fingerprint.js";
import { ExecuteIdempotently, IdempotencyConflictError } from "./execute-idempotently.js";

test("replays a completed result without repeating the operation", async () => {
  const useCase = new ExecuteIdempotently(new InMemoryIdempotencyRepository<number>(), new JsonFingerprint<{amount:number}>());
  let calls = 0;
  const operation = async (input: {amount:number}) => { calls++; return input.amount * 2; };
  assert.equal(await useCase.execute("payment-1", { amount: 10 }, operation), 20);
  assert.equal(await useCase.execute("payment-1", { amount: 10 }, operation), 20);
  assert.equal(calls, 1);
});

test("rejects the same key with a different payload", async () => {
  const useCase = new ExecuteIdempotently(new InMemoryIdempotencyRepository<number>(), new JsonFingerprint<{amount:number}>());
  await useCase.execute("payment-1", { amount: 10 }, async () => 20);
  await assert.rejects(() => useCase.execute("payment-1", { amount: 11 }, async () => 22), IdempotencyConflictError);
});

test("releases a reservation after failure", async () => {
  const useCase = new ExecuteIdempotently(new InMemoryIdempotencyRepository<number>(), new JsonFingerprint<{amount:number}>());
  await assert.rejects(() => useCase.execute("payment-1", { amount: 10 }, async () => { throw new Error("downstream"); }));
  assert.equal(await useCase.execute("payment-1", { amount: 10 }, async () => 20), 20);
});
