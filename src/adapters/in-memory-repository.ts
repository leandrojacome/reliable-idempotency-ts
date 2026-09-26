import type { IdempotencyRepository } from "../application/ports.js";
import type { IdempotencyRecord } from "../domain/idempotency-record.js";

export class InMemoryIdempotencyRepository<T> implements IdempotencyRepository<T> {
  private readonly records = new Map<string, IdempotencyRecord<T>>();
  async find(key: string) { return this.records.get(key); }
  async reserve(key: string, fingerprint: string) {
    if (this.records.has(key)) return false;
    this.records.set(key, { key, fingerprint, state: "processing" });
    return true;
  }
  async complete(key: string, fingerprint: string, value: T) {
    this.records.set(key, { key, fingerprint, state: "completed", value });
  }
  async release(key: string, fingerprint: string) {
    if (this.records.get(key)?.fingerprint === fingerprint) this.records.delete(key);
  }
}
