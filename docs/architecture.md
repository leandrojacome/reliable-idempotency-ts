# Architecture

## Domain model

The **Idempotent Execution** bounded context uses the following ubiquitous language: idempotency key, fingerprint, reservation, in-progress operation, and completed result. `IdempotencyRecord` is the entity. `IdempotencyKey` and `RequestFingerprint` are opaque value objects with their own invariants.

## Layers

- **Domain:** records, states, and value objects; independent of Node.js, databases, and transport.
- **Application:** `ExecuteIdempotently` coordinates reserve, execute, and complete/release.
- **Infrastructure:** SHA-256 and the in-memory repository implement application ports.

Flow: client -> use case -> fingerprint/persistence ports -> adapters.

## Patterns and alternatives

- **Repository:** replaces memory with Redis or PostgreSQL without changing the use case. Active Record was rejected because it couples business rules to persistence.
- **Strategy:** supports canonical fingerprints for different contracts. A fixed hash inside the use case was rejected because plain JSON serialization is not suitable for every payload.
- Visitor and Factory Method are not used because there is neither a heterogeneous element family nor complex object construction.

The main trade-off is assigning atomicity to the adapter. The in-memory version is educational; production needs a conditional operation and recovery for orphaned reservations.
