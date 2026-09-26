import type { FingerprintStrategy, IdempotencyRepository } from "./ports.js";
import { idempotencyKey } from "../domain/value-objects.js";

export class IdempotencyConflictError extends Error {}
export class RequestInProgressError extends Error {}

export class ExecuteIdempotently<I, O> {
  constructor(
    private readonly repository: IdempotencyRepository<O>,
    private readonly fingerprints: FingerprintStrategy<I>,
  ) {}

  async execute(key: string, input: I, operation: (input: I) => Promise<O>): Promise<O> {
    const validatedKey = idempotencyKey(key);
    const fingerprint = this.fingerprints.fingerprint(input);
    const current = await this.repository.find(validatedKey);
    if (current) {
      if (current.fingerprint !== fingerprint) throw new IdempotencyConflictError("key reused with different input");
      if (current.state === "processing") throw new RequestInProgressError("request is already processing");
      return current.value as O;
    }
    if (!(await this.repository.reserve(validatedKey, fingerprint))) throw new RequestInProgressError("request is already processing");
    try {
      const value = await operation(input);
      await this.repository.complete(validatedKey, fingerprint, value);
      return value;
    } catch (error) {
      await this.repository.release(validatedKey, fingerprint);
      throw error;
    }
  }
}
