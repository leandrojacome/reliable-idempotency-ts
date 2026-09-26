export type IdempotencyKey = string & { readonly __type: "IdempotencyKey" };
export type RequestFingerprint = string & { readonly __type: "RequestFingerprint" };

export function idempotencyKey(value: string): IdempotencyKey {
  const normalized = value.trim();
  if (normalized.length < 3 || normalized.length > 128) throw new Error("idempotency key must contain 3 to 128 characters");
  return normalized as IdempotencyKey;
}

export function requestFingerprint(value: string): RequestFingerprint {
  if (!/^[a-f0-9]{64}$/.test(value)) throw new Error("fingerprint must be a SHA-256 hex digest");
  return value as RequestFingerprint;
}
