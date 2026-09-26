# Arquitetura

Fluxo: cliente → `ExecuteIdempotently` → portas de fingerprint/persistência → adaptadores. O domínio não conhece Node.js, banco ou transporte. A regra central garante replay, conflito por payload diferente e liberação após falha.
