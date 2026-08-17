# Migração para v1.0

A v1.0 é a baseline interna production-ready. Não remove exports. `variant="brand"` continua alias de `primary`.

## ScrollArea

Regiões de rolagem são focáveis por teclado (`tabIndex={0}`) para WCAG 2.1.1. Quando `aria-label` ou `aria-labelledby` está presente, o componente aplica `role="region"`. Passe `tabIndex={-1}` somente se a região não deve entrar na ordem de tabulação.

## Superfície stable / beta / experimental

Componentes agentic P0 e o vocabulário SaaS (`Combobox`, `DataGrid`, `MultiSelect`) passam a `stable`. Permanecem **beta** `AgentHandoff` e `TraceViewer`. Permanecem **experimental** `GeneratedUIBoundary` e `McpAppFrame`. Templates e pages continuam fora de escopo.

## Specimen

A página geral é o specimen local (`pnpm dev`), não o GitHub Pages. O Storybook local continua em `pnpm storybook` (`http://127.0.0.1:6006`).

## Upgrade

```bash
npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds upgrade
```

Leia também [MIGRATION_V0.5.md](MIGRATION_V0.5.md) e [MIGRATION_V0.6.md](MIGRATION_V0.6.md) se a instalação ainda estiver em uma linha 0.x anterior.
