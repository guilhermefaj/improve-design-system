# Catálogo Improve · regras de índice

O specimen (`pnpm dev`) é a superfície canônica: sidebar plana por `category`, stream de um painel por componente na mesma ordem da sidebar, e âncoras `#id`.

## Fonte de verdade

| Camada              | Arquivo                                        |
| ------------------- | ---------------------------------------------- |
| Contratos / exports | `design-system.manifest.json`                  |
| Índice navegável    | `src/showcase/catalog.ts`                      |
| Specimens           | `src/showcase/componentSpecimens.tsx`          |
| Agrupamento interno | `src/showcase/registry.tsx`                    |
| Contratos para IA   | `llms.txt` / `llms-full.txt` (gerados)         |

## Navegação

- Sidebar lista apenas contratos canônicos do manifesto (sem aliases duplicados).
- O stream renderiza um painel por `id`, na mesma ordem da sidebar.
- Clique e scroll sincronizam o item ativo (`aria-current`) com o painel em vista (`data-active`).
- Título do painel = `name` do manifesto. Sem rótulo “Specimen”.

## Ao adicionar um componente

1. Implementar com tokens `--ibs-*` e exportar `Xxx` + `XxxProps`.
2. Registrar no manifesto (`category`, `primaryExport`, files, tokens, a11y).
3. Adicionar demo em `componentSpecimens` com `SpecimenPanel id={id}`.
4. Incluir o `id` em algum `showcaseGroups[].componentIds`.
5. Rodar `pnpm generate` e `pnpm check`.
