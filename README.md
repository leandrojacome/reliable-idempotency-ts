# Reliable Idempotency for TypeScript

A compact library that prevents duplicate execution of critical operations such as payments and order creation. It separates business rules, use cases, and adapters according to Clean Architecture.

## Architecture and patterns

- **Repository:** `IdempotencyRepository` lets the application replace memory with Redis or PostgreSQL without contaminating the use case.
- **Strategy:** `FingerprintStrategy` makes request-equivalence policy explicit and replaceable.
- **SOLID:** dependencies point to abstractions and each component has one reason to change.
- **Pragmatic DDD:** the Idempotent Execution bounded context uses `IdempotencyRecord` as its entity and opaque key/fingerprint value objects to preserve invariants without artificial aggregates.
- Atomic reservation belongs to the persistence adapter. The in-memory adapter is demonstrative; production requires `SET NX` or a unique constraint inside a transaction.

## Run

```bash
npm ci
npm test
npm run build
```

See [Architecture](docs/architecture.md) and [ADR-001](docs/adr/001-idempotency-reservation.md).

## Trade-offs

The project uses an in-memory implementation to remain executable without infrastructure. This keeps the architectural example focused but provides neither durability nor coordination across processes.

Active Record was rejected because it couples domain and persistence. Visitor is not appropriate because the model has no stable hierarchy of elements requiring multiple independent operations.

## License

MIT
