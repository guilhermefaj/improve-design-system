# Migração para v2.0

A v2.0 é a primeira major desde a baseline v1.0. Ela remove APIs públicas legadas e limpa código morto interno. Não há novos componentes; o foco é reduzir a superfície e manter o sistema enxuto e agentic-first.

## Breaking changes

### 1. Botão: `variant="brand"` foi removido

O alias `variant="brand"` era apenas um apelido compatível de `variant="primary"`. Use `primary`.

```tsx
// antes
<Button variant="brand">Começar diagnóstico</Button>

// depois
<Button variant="primary">Começar diagnóstico</Button>
```

O `variant="brand"` de `ImproveLogo` (e as variantes `brand` de `Section`, `Slide`, `Feedback`, `Tag`, `Marker` e do chat `Bubble`) **não** mudam — só o alias do botão foi retirado.

### 2. Tipografia: `SupportingLabel` e a face Montserrat foram removidos

A face de apoio Montserrat existia só como compatibilidade legada. Foram removidos:

- o componente `SupportingLabel`;
- o token primitivo `font.montserrat` (e a variável CSS `--ibs-font-montserrat`);
- `improveTokens.supportingFontFamily`;
- a dependência `@fontsource-variable/montserrat`.

Para rótulos de apoio, use `Text` (com `size="sm"`/`tone="muted"`); para acentos expressivos, use `AccentText` (Edu NSW ACT Cursive).

```tsx
// antes
<SupportingLabel>Legenda de apoio</SupportingLabel>

// depois
<Text size="sm" tone="muted">
  Legenda de apoio
</Text>
```

## Upgrade

```bash
npx -p "github:guilhermefaj/improve-design-system#v2.0.0" improve-ds upgrade
```

Revise arquivos `.improve.patch` antes de aplicar `--force`. Rode `improve-ds doctor` no fim.

Leia também [MIGRATION_V1.0.md](MIGRATION_V1.0.md), [MIGRATION_V0.6.md](MIGRATION_V0.6.md) e [MIGRATION_V0.5.md](MIGRATION_V0.5.md) se a instalação ainda estiver em uma linha anterior.
