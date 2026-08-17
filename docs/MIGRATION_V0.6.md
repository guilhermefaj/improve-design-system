# Migração para v0.6

A v0.6 amplia o catálogo em dez componentes P1, passa a usar Lucide no core e reorganiza specimen e Storybook nas camadas Atomic. Não há quebra de contrato público: exports existentes e `variant="brand"` continuam válidos.

## Componentes novos

| ID                  | Export            | Camada     |
| ------------------- | ----------------- | ---------- |
| `tag`               | `Tag`             | atom       |
| `button-group`      | `ButtonGroup`     | atom       |
| `multi-select`      | `MultiSelect`     | molecule   |
| `description-list`  | `DescriptionList` | molecule   |
| `collapsible`       | `Collapsible`     | molecule   |
| `date-range-picker` | `DateRangePicker` | molecule   |
| `time-picker`       | `TimePicker`      | molecule   |
| `hover-card`        | `HoverCard`       | molecule   |
| `context-menu`      | `ContextMenu`     | molecule   |
| `scroll-area`       | `ScrollArea`      | foundation |
| `aspect-ratio`      | `AspectRatio`     | foundation |

`scroll-area` e `aspect-ratio` entram como foundations; o restante completa o vocabulário SaaS.

## Lucide

Ícones do core usam `lucide-react`. Consumidores que rodam `improve-ds init` ou `upgrade` recebem a dependência no grafo. Não misture outro conjunto de ícones no mesmo bloco de UI.

## Organização Atomic

Specimen e Storybook passam a agrupar o registro compartilhado em Foundations, Atoms, Molecules, Organisms, Agentic e Presentation. Recipes e o manifesto não mudam de ID.

## Upgrade

```bash
npx -p "github:guilhermefaj/improve-design-system#v0.6.0" improve-ds upgrade
```

Revise arquivos `.improve.patch` antes de aplicar `--force`.
