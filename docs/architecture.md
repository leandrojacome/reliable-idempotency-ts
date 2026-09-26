# Arquitetura

## Contexto e linguagem

Bounded context **Execução Idempotente**. A linguagem ubíqua é: chave de idempotência, fingerprint, reserva, operação em processamento e resultado concluído. `IdempotencyRecord` é a entidade; `IdempotencyKey` e `RequestFingerprint` são value objects opacos com invariantes próprias.

## Fronteiras

- **Domínio:** registro, estados e value objects; não conhece Node.js, banco ou transporte.
- **Aplicação:** `ExecuteIdempotently` orquestra reservar → executar → concluir/liberar.
- **Infraestrutura:** SHA-256 e repositório em memória implementam portas.

Fluxo: cliente → caso de uso → portas de fingerprint/persistência → adaptadores.

## Padrões e alternativas

- **Repository:** troca memória por Redis/PostgreSQL sem mudar o caso de uso. Active Record foi descartado porque acoplaria regra e persistência.
- **Strategy:** permite fingerprint canônico por contrato. Um hash fixo dentro do caso de uso foi descartado porque JSON simples não serve para todo payload.
- Visitor e Factory Method não foram usados: não há família de operações sobre tipos heterogêneos nem criação complexa.

O principal trade-off é delegar atomicidade ao adaptador. A versão em memória é didática; produção exige operação condicional e recuperação de reservas órfãs.
