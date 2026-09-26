import type { IdempotencyRecord } from "../domain/idempotency-record.js";

export interface IdempotencyRepository<T> {
  find(key: string): Promise<IdempotencyRecord<T> | undefined>;
  reserve(key: string, fingerprint: string): Promise<boolean>;
  complete(key: string, fingerprint: string, value: T): Promise<void>;
  release(key: string, fingerprint: string): Promise<void>;
}

export interface FingerprintStrategy<I> {
  fingerprint(input: I): string;
}
