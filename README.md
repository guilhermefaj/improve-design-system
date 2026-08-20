# Improve Design System

Sistema de design portátil e agentic-first da Improve Business. A fonte de verdade combina tokens DTCG, manifesto JSON, recipes e um catálogo de componentes legível por máquina; React/TypeScript é a implementação principal.

A página geral do sistema é o specimen (`npm run dev`): uma apresentação editorial com todos os componentes, mais simples que o Storybook. O Storybook (`npm run storybook`) continua disponível para inspeção isolada, controles e auditoria. Os dois consomem o mesmo registro compartilhado de showcases.

## Princípios

1. **Clareza antes do efeito.** Hierarquia, espaço e texto fazem o trabalho principal.
2. **Negócio antes da tecnologia.** Toda interface começa pelo contexto e pelo resultado esperado.
3. **Sistema antes da exceção.** Tokens e composição evitam decisões visuais isoladas.
4. **Acessibilidade desde a base.** HTML nativo e Radix cuidam de semântica, teclado e foco.

## Começar

O repositório é distribuído pelo GitHub e os arquivos passam a pertencer ao projeto consumidor. Não há dependência de registry npm.

O guia humano (o que é fixo, o que o produto pode mudar, por que cada comando, ritual para o time) está em [Como usar em projetos novos](docs/USO_EM_PROJETOS.md).

Use `-p` e aspas: no zsh, `#` comenta o resto da linha; sem `-p`, o npm procura um binário chamado `init`.

<!-- generated:versioned-commands:start -->

```bash
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds init
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds add app-shell sidebar data-grid
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds doctor
```

<!-- generated:versioned-commands:end -->

```tsx
import { Button, Container, Heading, Hero, Section } from './improve';

export function LandingPage() {
  return (
    <>
      <Hero
        eyebrow="Improve Business"
        title="Design que entende o negócio."
        description="Estratégia, tecnologia e IA aplicadas a problemas reais."
        primaryAction={{ label: 'Vamos conversar', href: '#contato' }}
      />
      <Section tone="warm">
        <Container>
          <Heading>Transformação com propósito.</Heading>
          <Button variant="primary">Começar diagnóstico</Button>
        </Container>
      </Section>
    </>
  );
}
```

Inter conduz corpo, controles e produto. `Heading` prefere Clash Display Bold quando ela é carregada pela API oficial da Fontshare e usa Space Grotesk como fallback open source e autocontido. Edu NSW ACT Cursive conduz `AccentText`; Montserrat permanece somente como compatibilidade legada.

O catálogo segue Atomic Design: foundations, atoms, molecules e organisms. Templates e páginas ficam reservados para um ciclo posterior. Para filtrar o contrato legível por agentes:

```bash
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds list --level atom --json
```

`init` cria `improve.config.json`, registra hashes e instala a skill em `.agents/skills` e `.claude/skills`. `upgrade` preserva arquivos modificados e produz um patch para revisão; somente `--force` sobrescreve customizações.

## Scripts locais

```bash
npm install
npm run dev
npm run storybook
npm run test
npm run check
```

`npm run check` valida schemas e geração, executa testes, compila o specimen, a biblioteca e o Storybook.

O specimen (`src/demo`) é a página geral — visão editorial de todos os componentes, mais simples que o Storybook. O Storybook oferece inspeção isolada, controles e auditoria. Metadados vêm de `design-system.manifest.json`, tokens de `src/tokens` e exemplos visuais do registro compartilhado em `src/showcase`.

## Arquitetura

```text
src/
├── components/       React components and patterns
├── demo/             live specimen and visual documentation
├── stories/          Storybook stories
├── styles/           tokens, reset and component styles
├── tests/            behavior and accessibility-oriented tests
└── tokens/           DTCG 2025.10 JSON tokens
design-system.manifest.json
recipes/              machine-readable generation recipes
schemas/              JSON Schemas for contracts
skills/               canonical Improve skill
packages/cli/          source-owned installer and upgrader
packages/artifact-kit/ self-contained React starters
```

O arquivo de marca recebido foi preservado sem alterações em `assets/brand/logo_fundo_branco.png`. `ImproveMark` e `ImproveLogo` oferecem uma assinatura responsiva em SVG para interfaces pequenas; materiais institucionais finais devem usar o arquivo oficial quando a aplicação permitir.

Os tokens seguem três camadas:

- **Primitive:** valores brutos de cor e espaçamento.
- **Semantic:** papéis estáveis como `color.text`, `color.surface` e `color.focus`.
- **Component:** decisões locais como `button.background` e `input.height`.

No CSS, todos os nomes têm o prefixo `--ibs-` para evitar colisões.

## Componentes incluídos

| Camada Atomic | Componentes                                                                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundations   | Tokens, `Container`, `Stack`, `Cluster`, `Grid`, `Section` e tipografia                                                                                               |
| Atoms         | `Button`, `ButtonLink`, `IconButton`, campos, escolhas, `Badge`, `Avatar`, `Kbd`, `Chip`, `Toggle`, `SegmentedControl`, `Slider`, inputs especializados e `Sparkline` |
| Molecules     | `Card`, `FormField`, feedback, disclosures, `EmptyState`, `Popover`, `Sheet`, `Stepper`, `Combobox`, `CommandPalette`, `DatePicker`, `FileUpload` e `Toast`           |
| Organisms     | Marketing, navegação, componentes agentic, `AppShell`, `Sidebar`, `PageHeader`, `MetricCard`, `DataGrid`, `FilterBar`, `PricingCard` e `ActivityFeed`                 |
| Reservado     | `template` e `page` existem no schema, mas não possuem implementação nesta versão                                                                                     |

A v1.0 trata o catálogo **stable** como contrato de produto. Permanecem **beta** `AgentHandoff` e `TraceViewer`. Permanecem **experimental** `GeneratedUIBoundary` e `McpAppFrame`. Consulte o manifesto (`status`) ou `improve-ds list --json` antes de gerar UI de missão crítica em cima desses quatro.

## Catálogo para agentes

- `design-system.manifest.json`: arquivos, exports, estados, variantes, dependências, acessibilidade e maturidade.
- `llms.txt` e `llms-full.txt`: instruções compacta e completa para geração.
- `recipes/*.json`: landing page, dashboard, app, slides, workspace agentic e Artifact.
- `skills/improve-design-system/SKILL.md`: workflow canônico para Codex e Claude.
- `AGENTS.md` e `CLAUDE.md`: regras do repositório e integração entre agentes.

```bash
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds list --json
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds inspect data-grid --json
npx -p "github:guilhermefaj/improve-design-system#v1.0.1" improve-ds artifact --recipe dashboard
```

## Temas

O tema claro é padrão. Aplique `data-ibs-theme="dark"` em qualquer contêiner para ativar o modo escuro:

```tsx
<div data-ibs-theme="dark">
  <Card>Conteúdo no tema escuro</Card>
</div>
```

Sobrescreva tokens semânticos para temas de projeto; não altere valores dentro de componentes.

No specimen, o tema pode ser alternado diretamente no header e a preferência é preservada entre visitas.

```css
[data-product='ventures'] {
  --ibs-color-brand: #8f6cad;
  --ibs-color-focus: #684882;
}
```

## Slides em React

`Slide` usa proporção 16:9, container queries e estilos de impressão. Ele funciona em páginas React, geradores HTML-to-PDF e apresentações navegáveis.

```tsx
<Slide tone="brand">
  <SlideKicker>Diagnóstico · Operações</SlideKicker>
  <SlideTitle>A dor é operacional. A transformação é estratégica.</SlideTitle>
  <SlideMetric value="12h" label="economizadas por semana" />
  <SlideFooter page={12} label="Oportunidades priorizadas" />
</Slide>
```

## Acessibilidade

- Contraste de texto usa tons escurecidos; o laranja puro fica para fundos, acentos e elementos grandes.
- O botão primário usa o laranja oficial `#F2703E` com texto branco em negrito. Essa combinação foi escolhida pela marca e permanece documentada como exceção WCAG (`2,93:1`); checkbox, radio e switch marcados também usam laranja com indicador escuro, enquanto foco, links e navegação ativa usam o roxo acessível `#483C8F`.
- Todo controle tem foco visível e tamanho-alvo mínimo de 36–44 px.
- Dialog, Tabs, Accordion, Tooltip, menus, escolhas e switches usam primitivas Radix.
- `prefers-reduced-motion` reduz transições e animações.
- O Storybook executa auditoria de acessibilidade em modo de erro.

## Releases no GitHub

Tags SemVer são a unidade de distribuição. Cada release deve anexar manifesto, catálogo, skill compactada e starters de Artifact. Não publique em registry npm nesta fase; valide com `npm run check`, crie a tag e deixe o workflow de release montar os artefatos.

## Documentação complementar

- [Fundamentos](docs/FOUNDATIONS.md)
- [Voz e conteúdo](docs/CONTENT.md)
- [Governança e roadmap](docs/ROADMAP.md)
- [Auditoria agentic-first](docs/AGENTIC_FIRST.md)
- [Como usar em projetos novos](docs/USO_EM_PROJETOS.md)
- [Migração v0.5](docs/MIGRATION_V0.5.md)
- [Migração v0.6](docs/MIGRATION_V0.6.md)
- [Migração v1.0](docs/MIGRATION_V1.0.md)

Uso interno Improve Business. Todos os direitos reservados.
