import type { IdempotencyKey, RequestFingerprint } from "./value-objects.js";

export type RecordState = "processing" | "completed";

export interface IdempotencyRecord<T> {
  readonly key: IdempotencyKey;
  readonly fingerprint: RequestFingerprint;
  readonly state: RecordState;
  readonly value?: T;
}
