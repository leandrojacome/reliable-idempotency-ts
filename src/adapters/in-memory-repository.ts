import type { IdempotencyRepository } from "../application/ports.js";
import type { IdempotencyRecord } from "../domain/idempotency-record.js";
import type { IdempotencyKey, RequestFingerprint } from "../domain/value-objects.js";

export class InMemoryIdempotencyRepository<T> implements IdempotencyRepository<T> {
  private readonly records = new Map<string, IdempotencyRecord<T>>();
  async find(key: IdempotencyKey) { return this.records.get(key); }
  async reserve(key: IdempotencyKey, fingerprint: RequestFingerprint) {
    if (this.records.has(key)) return false;
    this.records.set(key, { key, fingerprint, state: "processing" });
    return true;
  }
  async complete(key: IdempotencyKey, fingerprint: RequestFingerprint, value: T) {
    this.records.set(key, { key, fingerprint, state: "completed", value });
  }
  async release(key: IdempotencyKey, fingerprint: RequestFingerprint) {
    if (this.records.get(key)?.fingerprint === fingerprint) this.records.delete(key);
  }
}
