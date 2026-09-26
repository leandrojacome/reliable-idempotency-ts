import { createHash } from "node:crypto";
import type { FingerprintStrategy } from "../application/ports.js";

export class JsonFingerprint<T> implements FingerprintStrategy<T> {
  fingerprint(input: T): string {
    return createHash("sha256").update(JSON.stringify(input)).digest("hex");
  }
}
