# Improve Design System

Sistema de design portátil e agentic-first da Improve Business. A fonte de verdade combina tokens DTCG, manifesto JSON, recipes e um catálogo de componentes legível por máquina; React/TypeScript é a implementação principal.

## Princípios

1. **Clareza antes do efeito.** Hierarquia, espaço e texto fazem o trabalho principal.
2. **Negócio antes da tecnologia.** Toda interface começa pelo contexto e pelo resultado esperado.
3. **Sistema antes da exceção.** Tokens e composição evitam decisões visuais isoladas.
4. **Acessibilidade desde a base.** HTML nativo e Radix cuidam de semântica, teclado e foco.

## Começar

O repositório é distribuído pelo GitHub e os arquivos passam a pertencer ao projeto consumidor. Não há dependência de registry npm.

```bash
npx github:improve-business/improve-design-system#v0.2.0 init
npx github:improve-business/improve-design-system#v0.2.0 add approval-card tool-call-card
npx github:improve-business/improve-design-system#v0.2.0 doctor
```

```tsx
import {
  Button,
  Container,
  Heading,
  Hero,
  Section,
} from './improve';

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

Inter é importada pelo core e conduz corpo, controles e produto. `Heading` prefere Clash Display Bold, com fallback seguro para Inter enquanto o arquivo licenciado não estiver no projeto. Castledown Cursive Dots é reservado a `AccentText`; Montserrat Medium aparece em `SupportingLabel`.

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

| Categoria | Componentes |
| --- | --- |
| Foundations | `Container`, `Stack`, `Cluster`, `Grid`, `Section`, `Heading`, `Text`, `Eyebrow`, `AccentText`, `SupportingLabel` |
| Brand | `ImproveMark`, `ImproveLogo` |
| Actions | `Button`, `ButtonLink`, `IconButton` |
| Forms | `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioSet`, `Switch` |
| Feedback | `Badge`, `Alert`, `Progress`, `Spinner`, `Skeleton` |
| Data display | `Card`, `Avatar`, `Divider`, `Stat`, `Quote`, `DataTable` |
| Navigation | `SiteHeader`, `Footer`, `Breadcrumbs`, `Pagination` |
| Overlays | `Accordion`, `Tabs`, `Dialog`, `Tooltip`, `ActionMenu`, `SelectMenu` |
| Marketing | `Hero`, `FeatureCard`, `EcosystemCard`, `ServicePanel`, `LogoCloud` |
| Presentation | `Slide`, `SlideKicker`, `SlideTitle`, `SlideMetric`, `SlideFooter` |
| Agentic | `AgentStatus`, `StreamingMessage`, `ToolCallCard`, `ApprovalCard`, `RunTimeline`, `AgentError`, `PlanSteps` |
| Trust | `ArtifactCard`, `ArtifactPreview`, `CitationList`, `PermissionScope`, `AgentHandoff`, `GeneratedUIBoundary`, `McpAppFrame`, `TraceViewer` |

## Catálogo para agentes

- `design-system.manifest.json`: arquivos, exports, estados, variantes, dependências, acessibilidade e maturidade.
- `llms.txt` e `llms-full.txt`: instruções compacta e completa para geração.
- `recipes/*.json`: landing page, dashboard, app, slides, workspace agentic e Artifact.
- `skills/improve-design-system/SKILL.md`: workflow canônico para Codex e Claude.
- `AGENTS.md` e `CLAUDE.md`: regras do repositório e integração entre agentes.

```bash
npx github:improve-business/improve-design-system#v0.2.0 list --json
npx github:improve-business/improve-design-system#v0.2.0 inspect approval-card --json
npx github:improve-business/improve-design-system#v0.2.0 artifact --recipe dashboard
```

## Temas

O tema claro é padrão. Aplique `data-ibs-theme="dark"` em qualquer contêiner para ativar o modo escuro:

```tsx
<div data-ibs-theme="dark">
  <Card>Conteúdo no tema escuro</Card>
</div>
```

Sobrescreva tokens semânticos para temas de projeto; não altere valores dentro de componentes.

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
- O botão primário usa laranja `#B93800` com texto branco (`5,79:1`); no hover, `#932F08` com branco (`7,92:1`). O token de marca `#FF5A00` permanece separado do token funcional de ação.
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

Uso interno Improve Business. Todos os direitos reservados.
