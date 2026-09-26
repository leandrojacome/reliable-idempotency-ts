# ADR-001: Atomic idempotency reservation

## Status

Accepted for the portfolio scope.

## Decision

Reserve the key atomically before executing the operation and complete the record only after success.

## Consequences

This prevents duplicate concurrent execution. A distributed implementation also needs expiration, ownership, and recovery for interrupted processes.
