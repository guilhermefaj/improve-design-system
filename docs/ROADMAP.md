# Governança e roadmap

## Estado atual — v0.5 Consumer Experience & Portability

O core entrega contratos legíveis por máquina, geração de tokens, CLI source-owned, skill aberta, adapters Codex/Claude, starters de Artifact, componentes agentic P0 e componentes de confiança. Imports existentes continuam válidos e `variant="brand"` permanece alias compatível.

O ciclo v0.5 torna o upgrade orientado pelo grafo do manifesto, documenta individualmente os 54 componentes, valida API e tokens e compila fixtures consumidoras em Vite e Next.js.

## Entrada no core

Um componente entra no core quando resolve uma necessidade recorrente, documenta variantes e estados, possui teclado/foco/responsividade, usa tokens semânticos, expõe API controlada e passa por testes funcionais e de acessibilidade.

## Versionamento

- **Patch:** correção visual ou comportamental sem alteração de contrato.
- **Minor:** componente, variante, recipe ou token novo compatível.
- **Major:** remoção, renomeação ou comportamento incompatível.

A partir da baseline v0.5, uma remoção pública exige depreciação documentada por duas versões minor antes de uma versão major.

Arquivos gerados nunca são editados manualmente. Mudanças começam em `src/tokens/*.tokens.json` ou `design-system.manifest.json` e exigem `npm run generate`.

## Próximas fases

### v0.3 — Agentic Interaction

- Adapters de exemplo para OpenAI e Anthropic fora do core.
- Persistência e retomada em uma aplicação de referência.
- Cancelamento durante streaming e falhas parciais compostas.
- Composer com anexos, contexto e envio interrompível.
- Testes de leitor de tela em ambiente real.

### v0.4 — Trust & Orchestration

- Evoluir trace e handoff para runs paralelos e grafos.
- Guardrails e políticas de autorização reutilizáveis.
- Package de adapters MCP Apps.
- Proveniência de artefatos e histórico de revisões.

### v1.0 — Governança

- RFCs, responsáveis e política de contribuição.
- Métricas de adoção, acessibilidade e redução de retrabalho.
- Mapeamento para Figma/Tokens Studio.
- Publicação pública por tags e GitHub Releases, sem registry obrigatório.
