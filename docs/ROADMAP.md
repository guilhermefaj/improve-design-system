# Governança e roadmap

## Estado atual — v2.0

O core é um design system interno production-ready: 87 componentes no manifesto (83 stable), tokens DTCG, CLI source-owned, skill aberta, starters de Artifact e specimen (`pnpm dev`) como página geral. A v2.0 remove APIs legadas: o alias `variant="brand"` do botão e a face de apoio Montserrat (`SupportingLabel`, token `font.montserrat`).

A v1.0 fecha o ciclo 0.x: contratos alinhados ao catálogo real, CI com fixtures Vite/Next e regressão visual no Windows, e superfície **stable / beta / experimental** explícita. Templates e pages existem no schema e continuam sem implementação.

A página geral do sistema é o specimen local, não o GitHub Pages.

## Entrada no core

Um componente entra no core quando resolve uma necessidade recorrente, documenta variantes e estados, possui teclado/foco/responsividade, usa tokens semânticos, expõe API controlada e passa por testes funcionais e de acessibilidade.

## Versionamento

- **Patch:** correção visual ou comportamental sem alteração de contrato.
- **Minor:** componente, variante, recipe ou token novo compatível.
- **Major:** remoção, renomeação ou comportamento incompatível.

A partir da baseline v0.5, uma remoção pública exige depreciação documentada por duas versões minor antes de uma versão major.

Arquivos gerados nunca são editados manualmente. Mudanças começam em `src/tokens/*.tokens.json` ou `design-system.manifest.json` e exigem `npm run generate`.

## Entregue no 0.x

### v0.3 — Agentic Interaction

Vocabulário de execução, streaming, ferramenta, erro e plano no core. Persistência real e adapters de SDK permanecem nos apps consumidores.

### v0.4 — Trust & Orchestration

Aprovação humana, citações, permissões, boundaries, handoff e trace como componentes. Grafos paralelos e um package de adapters MCP ficam para ciclos posteriores.

### v0.5 — Consumer Experience & Portability

Upgrade orientado pelo grafo do manifesto, documentação individual, validação de API e tokens, fixtures Vite e Next.js.

### v0.6 — Catálogo P1 e organização Atomic

Dez componentes P1, Lucide no core e reorganização do specimen nas camadas Atomic.

## v2.0 — Limpeza e remoção de legado

Primeira major desde a baseline v1.0. Remove código morto interno e resíduos do Storybook, e retira as APIs públicas legadas: o alias `variant="brand"` do botão (use `variant="primary"`) e a face de apoio Montserrat — `SupportingLabel`, o token `font.montserrat` e `improveTokens.supportingFontFamily` (use `AccentText`/`Text`). Detalhes em [MIGRATION_V2.0.md](MIGRATION_V2.0.md).

## Próximas fases

### v1.1 — Governança e ferramentas de design

- RFCs, responsáveis e política de contribuição, se o repositório deixar de ser somente interno.
- Métricas de adoção, acessibilidade e redução de retrabalho.
- Mapeamento para Figma/Tokens Studio.
- Adapters de exemplo OpenAI/Anthropic fora do core.
- Testes de leitor de tela em ambiente real.
