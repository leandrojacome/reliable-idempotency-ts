import { createHash } from "node:crypto";
import type { FingerprintStrategy } from "../application/ports.js";
import { requestFingerprint } from "../domain/value-objects.js";
import type { RequestFingerprint } from "../domain/value-objects.js";

export class JsonFingerprint<T> implements FingerprintStrategy<T> {
  fingerprint(input: T): RequestFingerprint {
    return requestFingerprint(createHash("sha256").update(JSON.stringify(input)).digest("hex"));
  }
}
