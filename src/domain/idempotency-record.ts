export type RecordState = "processing" | "completed";

export interface IdempotencyRecord<T> {
  readonly key: string;
  readonly fingerprint: string;
  readonly state: RecordState;
  readonly value?: T;
}
