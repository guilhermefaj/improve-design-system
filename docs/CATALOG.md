# Catálogo Improve · regras de índice

O specimen (`pnpm dev`) expõe um índice A–Z e âncoras `#id` por primitivo. O Storybook continua gerado a partir do manifesto (`design-system.manifest.json`).

## Fonte de verdade

| Camada                       | Arquivo                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| Contratos / exports          | `design-system.manifest.json`                                     |
| Índice navegável do specimen | `src/showcase/catalog.ts`                                         |
| Specimens e grupos           | `src/showcase/registry.tsx` + `src/showcase/catalogSpecimens.tsx` |

## Âncoras

- Cada entrada estável do catálogo aponta para `#${id}` no specimen.
- Preferir `id` no `SpecimenPanel` (ou âncora `<span id="…" />` quando o primitivo vive dentro de um pacote).
- Chips de seção são links (`<a href="#…">`), não texto estático.

## Status

| Status    | Significado                                                 |
| --------- | ----------------------------------------------------------- |
| `stable`  | Export público + specimen + contrato no manifesto           |
| `alias`   | Nome alternativo; `href` aponta para o canônico (`aliasOf`) |
| `planned` | Reservado no índice; ainda sem implementação                |

## Aliases canônicos

| Pedido / alias   | Improve                                               |
| ---------------- | ----------------------------------------------------- |
| Empty            | EmptyState                                            |
| Field            | FormField                                             |
| Separator        | Divider                                               |
| Command          | CommandPalette                                        |
| Breadcrumb       | Breadcrumbs                                           |
| Data Table       | DataTable (+ DataGrid)                                |
| Radio Group      | RadioSet                                              |
| Toggle Group     | ToggleGroup (SegmentedControl permanece)              |
| Drawer           | Drawer (Sheet permanece para painel lateral clássico) |
| Attachment       | Attachment (FileUpload permanece para envio)          |
| Chart            | Chart (Sparkline permanece para mini-série)           |
| Message          | Message (StreamingMessage permanece para streaming)   |
| QuestionnaireNew | Questionnaire                                         |

## Improve-only

Entradas com `improveOnly: true` no índice (agentic, marketing, SaaS) convivem no A–Z com a lista compartilhada. Não precisam de espelho shadcn.

## Ao adicionar um componente

1. Implementar com tokens `--ibs-*` e exportar `Xxx` + `XxxProps`.
2. Registrar no manifesto (`atomicLevel`, `primaryExport`, `storybookId`).
3. Incluir o `id` em `showcaseGroups[].componentIds`.
4. Adicionar entrada em `catalog.ts` e specimen com `#id`.
5. Rodar `pnpm generate` e `pnpm check`.
