# Catálogo Improve · regras de índice

O specimen (`pnpm dev`) é a superfície canônica: sidebar plana por `category`, stream de specimens e âncoras `#id`. O manifesto e `llms.txt` são a superfície principal para agentes.

## Fonte de verdade

| Camada              | Arquivo                                                           |
| ------------------- | ----------------------------------------------------------------- |
| Contratos / exports | `design-system.manifest.json`                                     |
| Índice navegável    | `src/showcase/catalog.ts`                                         |
| Specimens           | `src/showcase/registry.tsx` + `src/showcase/catalogSpecimens.tsx` |
| Contratos para IA   | `llms.txt` / `llms-full.txt` (gerados)                            |

## Navegação

- Sidebar lista todos os componentes agrupados por `category` (form, overlay, agentic, …).
- Clique e scroll sincronizam o item ativo (`aria-current`) com o painel em vista (`data-active`).
- Cada contrato do manifesto tem âncora `#${id}` no stream do specimen.

## Status

| Status    | Significado                                                 |
| --------- | ----------------------------------------------------------- |
| `stable`  | Export público + specimen + contrato no manifesto           |
| `alias`   | Nome alternativo; `href` aponta para o canônico (`aliasOf`) |
| `planned` | Reservado no índice; ainda sem implementação                |

## Aliases canônicos

| Pedido / alias   | Improve        |
| ---------------- | -------------- |
| Empty            | EmptyState     |
| Field            | FormField      |
| Separator        | Divider        |
| Command          | CommandPalette |
| Breadcrumb       | Breadcrumbs    |
| Radio Group      | RadioSet       |
| QuestionnaireNew | Questionnaire  |

## Ao adicionar um componente

1. Implementar com tokens `--ibs-*` e exportar `Xxx` + `XxxProps`.
2. Registrar no manifesto (`category`, `primaryExport`, files, tokens, a11y).
3. Incluir o `id` em algum `showcaseGroups[].componentIds` (organização interna do stream).
4. Garantir âncora `#id` no specimen (stream anchor ou painel).
5. Rodar `pnpm generate` e `pnpm check`.
