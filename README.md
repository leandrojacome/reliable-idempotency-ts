# Reliable Idempotency — TypeScript

Uma biblioteca pequena para impedir a duplicação de operações críticas, como pagamentos e criação de pedidos. Ela separa regra de negócio, caso de uso e adaptadores segundo Clean Architecture.

## Decisões

- **Repository (GoF):** a porta `IdempotencyRepository` permite trocar memória por Redis/PostgreSQL sem contaminar o caso de uso.
- **Strategy (GoF):** `FingerprintStrategy` torna explícita a política de equivalência de requisições.
- **SOLID:** dependências apontam para abstrações; cada componente tem uma razão de mudança.
- A reserva atômica pertence ao adaptador de persistência. O adaptador em memória é demonstrativo; produção exige `SET NX` ou restrição única/transação.

## Uso

```bash
npm ci
npm test
npm run lint
npm run audit:deps
```

Veja [Arquitetura](docs/architecture.md) e [ADR-001](docs/adr/001-idempotency-reservation.md).

## Trade-offs

O projeto usa apenas uma implementação em memória para manter o exemplo executável sem infraestrutura. Isso preserva o foco arquitetural, mas não oferece durabilidade nem coordenação entre processos.

## Licença

MIT.
