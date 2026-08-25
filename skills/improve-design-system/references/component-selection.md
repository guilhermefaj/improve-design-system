# Seleção de componentes

Consultar `design-system.manifest.json` para exports, arquivos, estados, tokens e requisitos de acessibilidade.
Consultar `docs/CATALOG.md` e `src/showcase/catalog.ts` para âncoras do specimen e aliases.

## Por intenção

- Ação: `Button`, `ButtonLink`, `IconButton`, `ButtonGroup`.
- Estrutura: `Container`, `Stack`, `Cluster`, `Grid`, `Section`, `ScrollArea`, `AspectRatio`, `Resizable`, `DirectionProvider`.
- Conteúdo: `Heading`, `Text`, `Eyebrow`, `Card`, `Stat`, `DataTable`, `Table`, `DescriptionList`, `Chart`, `Sparkline`, `Marker`, `Item`.
- Entrada: `FormField`/`Field`, `Label`, `Input`, `InputGroup`, `InputOTP`, `Textarea`, `Select`, `NativeSelect`, `Checkbox`, `RadioSet`/`RadioGroup`, `Switch`, `Toggle`, `ToggleGroup`, `SegmentedControl`, `Slider`, `Calendar`, `DatePicker`, `Questionnaire`.
- Feedback: `Alert`, `Badge`, `Progress`, `Spinner`, `Skeleton`, `Toast`, `EmptyState`/`Empty`.
- Divulgação: `Accordion`, `Tabs`, `Dialog`, `AlertDialog`, `Tooltip`, `ActionMenu`, `DropdownMenu`, `Popover`, `Sheet`, `Drawer`, `HoverCard`, `ContextMenu`, `Collapsible`.
- Navegação: `SiteHeader`, `Footer`, `NavigationMenu`, `Menubar`, `Breadcrumbs`/`Breadcrumb`, `Pagination`, `Sidebar`.
- Marketing: `Hero`, `FeatureCard`, `EcosystemCard`, `ServicePanel`, `LogoCloud`.
- Chat / agentic: `Bubble`, `Message`, `MessageScroller`, `StreamingMessage`, `AgentStatus`, `ToolCallCard`, `ApprovalCard`.
- Slides: `Slide`, `SlideKicker`, `SlideTitle`, `SlideMetric`, `SlideFooter`.

## Aliases de catálogo

| Nome pedido      | Preferir         |
| ---------------- | ---------------- |
| Empty            | `EmptyState`     |
| Field            | `FormField`      |
| Separator        | `Divider`        |
| Command          | `CommandPalette` |
| Breadcrumb       | `Breadcrumbs`    |
| Radio Group      | `RadioSet`       |
| QuestionnaireNew | `Questionnaire`  |

## Regras

- Usar `variant="primary"` para ação principal. `brand` existe apenas como alias compatível.
- Usar `Dialog` para interrupções curtas; `AlertDialog` para confirmações destrutivas; `Drawer`/`Sheet` para fluxos laterais.
- Usar `DataTable`/`Table` para comparação exata e cards para síntese.
- Toda ação somente com ícone deve fornecer nome acessível.
- Todo campo deve ter label e erro associado ao controle.
- Novos primitivos entram no manifesto, em `catalog.ts` e com âncora `#id` no specimen.
