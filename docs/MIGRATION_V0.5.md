# Migração para v0.5

## ServicePanel

`ServicePanel.accent` deixa de aceitar cores livres. Use um dos acentos do contrato:

```tsx
<ServicePanel accent="secondary" title="Tecnologia" items={items} />
```

Valores disponíveis: `brand`, `secondary`, `strategy`, `ux`, `technology`, `implementation`, `talent` e `events`.

Se um projeto usava hexadecimal ou `var(...)`, crie primeiro um token oficial e selecione o papel semântico correspondente. Isso impede cores fora da marca em interfaces geradas por pessoas ou agentes.

## improve.config.json

O CLI migra automaticamente configurações schema v1 para v2. O novo formato registra as dependências exigidas e permite que `upgrade` recalcule arquivos adicionados ou removidos do grafo do componente.
