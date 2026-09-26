import type { IdempotencyRecord } from "../domain/idempotency-record.js";
import type { IdempotencyKey, RequestFingerprint } from "../domain/value-objects.js";

export interface IdempotencyRepository<T> {
  find(key: IdempotencyKey): Promise<IdempotencyRecord<T> | undefined>;
  reserve(key: IdempotencyKey, fingerprint: RequestFingerprint): Promise<boolean>;
  complete(key: IdempotencyKey, fingerprint: RequestFingerprint, value: T): Promise<void>;
  release(key: IdempotencyKey, fingerprint: RequestFingerprint): Promise<void>;
}

export interface FingerprintStrategy<I> {
  fingerprint(input: I): RequestFingerprint;
}
