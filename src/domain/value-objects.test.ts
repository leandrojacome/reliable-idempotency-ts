import assert from "node:assert/strict";
import test from "node:test";
import { idempotencyKey, requestFingerprint } from "./value-objects.js";

test("normalizes a valid idempotency key", () => assert.equal(idempotencyKey(" order-123 "), "order-123"));
test("rejects an undersized key", () => assert.throws(() => idempotencyKey("x")));
test("rejects a malformed fingerprint", () => assert.throws(() => requestFingerprint("not-a-hash")));
