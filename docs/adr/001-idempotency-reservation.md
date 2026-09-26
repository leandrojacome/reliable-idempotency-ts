# ADR-001: reservar antes de executar

## Status

Aceito.

## Decisão

Reservar a chave atomicamente antes da operação e concluir somente após sucesso.

## Consequências

Evita execução concorrente duplicada. Uma implementação distribuída precisa expiração, ownership e tratamento de processos interrompidos.
