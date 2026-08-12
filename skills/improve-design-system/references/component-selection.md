# Seleção de componentes

Consultar `design-system.manifest.json` para exports, arquivos, estados, tokens e requisitos de acessibilidade.

## Por intenção

- Ação: `Button`, `ButtonLink`, `IconButton`.
- Estrutura: `Container`, `Stack`, `Cluster`, `Grid`, `Section`.
- Conteúdo: `Heading`, `Text`, `Eyebrow`, `Card`, `Stat`, `DataTable`.
- Entrada: `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioSet`, `Switch`.
- Feedback: `Alert`, `Badge`, `Progress`, `Spinner`, `Skeleton`.
- Divulgação: `Accordion`, `Tabs`, `Dialog`, `Tooltip`, `ActionMenu`.
- Marketing: `Hero`, `FeatureCard`, `EcosystemCard`, `ServicePanel`, `LogoCloud`.
- Slides: `Slide`, `SlideKicker`, `SlideTitle`, `SlideMetric`, `SlideFooter`.

## Regras

- Usar `variant="primary"` para ação principal. `brand` existe apenas como alias compatível.
- Usar `Dialog` para interrupções curtas; não mover fluxos extensos para modal.
- Usar `DataTable` para comparação exata e cards para síntese.
- Toda ação somente com ícone deve fornecer nome acessível.
- Todo campo deve ter label e erro associado ao controle.
