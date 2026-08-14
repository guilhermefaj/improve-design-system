# Estudo: Improve Design System em vibe coding

Como o time Improve usa este sistema em Cursor, Claude, Claude Design, Claude Code, Codex e ferramentas vizinhas — e quais alternativas de empacotamento valem a pena.

Este documento descreve o estado do repositório em **v0.5.0**, o que já está pronto para geração assistida, onde o contrato ainda não chega, e um modelo operacional para decidir o que montar em seguida. Não altera o core. Qualquer decisão aqui vira trabalho separado.

## Veredito

O sistema já é um contrato agentic-first, não só uma biblioteca React. Manifesto, tokens DTCG, recipes, skill, CLI source-owned, `llms.txt` e starters autocontidos existem e são a base certa.

O que ainda falta não é “mais componentes”. É um **kit de consumo por superfície**: o mesmo contrato, fatiado no formato que cada ferramenta realmente lê. Sem isso, o time acaba colando o README inteiro no chat e o modelo inventa laranja, radius e Hero paralelos.

A recomendação é manter **uma fonte de verdade** (este repositório) e três modos de uso:

1. **Produção React** — `improve-ds init` copia o sistema para o app.
2. **Protótipo / Artifact / Claude Design** — starter de um arquivo + kit visual de marca.
3. **Agente de código** — skill + `AGENTS.md` + manifesto JSON, nunca o specimen inteiro no contexto.

## O que o projeto é hoje

v0.5 posiciona o Improve Design System como sistema **portátil e source-owned**. Não há registry npm. A unidade de distribuição é a tag GitHub (`npx github:guilhermefaj/improve-design-system#v0.5.0`). Os arquivos passam a pertencer ao projeto consumidor; `upgrade` preserva customizações e gera `.improve.patch`.

### Camadas

| Camada | Papel | Arquivos |
| --- | --- | --- |
| Contrato canônico | O que existe, com quais props, estados e maturidade | `design-system.manifest.json`, `src/tokens/*.tokens.json` |
| Implementação | React/TypeScript + CSS `--ibs-*` | `src/components/`, `src/styles/` |
| Receitas de geração | Intenção → estrutura → anti-patterns | `recipes/*.json` |
| Skill de agente | Workflow canônico | `skills/improve-design-system/` |
| Instalador | Copia código + instala orientação de agente | `packages/cli/improve.mjs` |
| Starters autocontidos | Um arquivo, sem rede, para Artifact/protótipo | `packages/artifact-kit/starters/` |
| Catálogo para LLM | Resumo compacto vs. completo | `llms.txt`, `llms-full.txt` |
| Vitrine humana | Specimen e Storybook | `src/demo/`, `src/stories/` |

O core é vendor-neutral. OpenAI, Anthropic, MCP ou outro runtime entram por adapters na aplicação, nunca como dependência da biblioteca. `McpAppFrame` é um **shell visual** para um recurso MCP, não um servidor MCP deste design system.

### Catálogo

54 grupos de componente no manifesto, em Atomic Design até organism. Templates e páginas estão no schema, mas **fora de escopo em v0.5**. Isso é deliberado: o agente deve compor organisms, não receber um “SaaS completo”.

Seis recipes cobrem os produtos que o time realmente gera:

| Recipe | Para quê | Superfícies |
| --- | --- | --- |
| `landing-page` | Oferta consultiva, prova, CTA | React, Claude Artifact |
| `dashboard` | Estado, exceção, próximo passo | React, Claude Artifact |
| `app` | Fluxo operacional de produto | React, Claude Artifact |
| `slides` | Narrativa executiva 16:9 | React, slides |
| `agent-workspace` | Execução observável e aprovável | React, Claude Artifact |
| `artifact` | Protótipo de um arquivo no Claude | Claude Artifact |

`init` instala **todos os grupos `stable`**. `init --all` inclui beta/experimental (agentic, MCP frame, generated UI). Não existe `init --recipe app`: a recipe orienta o agente, mas o CLI ainda não fatia a instalação por recipe.

### O que o CLI já faz no projeto consumidor

```text
npx github:guilhermefaj/improve-design-system#v0.5.0 init
```

- Copia tokens, estilos e componentes para `src/improve/`.
- Gera `src/improve/components/index.ts`.
- Cria `improve.config.json` com hashes para `doctor` / `upgrade`.
- Adiciona peers visuais (`radix-ui`, `lucide-react`, fontes) no `package.json`.
- Copia a skill para `.agents/skills/improve-design-system` **e** `.claude/skills/improve-design-system`.
- Acrescenta um bloco em `AGENTS.md` e um `CLAUDE.md` mínimo que aponta para `AGENTS.md`.

Isso já cobre Codex (`.agents/skills` + `AGENTS.md`) e Claude Code (`.claude/skills` + `CLAUDE.md`). Cursor lê `AGENTS.md` e, na prática, também skills em `.agents/skills` / `.cursor/skills`. O CLI **não** escreve `.cursor/rules`, `.cursor/skills` nem um `DESIGN.md` para Claude Design.

## Como vibe coding realmente consome um design system

Ferramentas de geração não “importam o Storybook”. Elas usam quatro tipos de input, em ordem de eficácia:

1. **Instrução persistente** — `AGENTS.md`, `CLAUDE.md`, rules, skill. Cabe no início de toda sessão.
2. **Contrato consultável** — JSON, CLI `--json`, MCP. O agente busca só o componente que precisa.
3. **Exemplo autocontido** — starter de um arquivo, screenshot, specimen publicado.
4. **Código instalado no repo** — `src/improve/Button.tsx` e tokens. Melhor âncora: o modelo copia o que já existe.

O anti-pattern clássico é despejar `llms-full.txt` + specimen + README no prompt. O modelo dilui regras de marca, inventa tokens e reimplementa `Card`. O fluxo da skill já diz o contrário: recipe → foundations → seleção de componente → manifesto/`inspect` → tokens semânticos → `doctor`.

## Superfície por ferramenta

### Cursor

Cursor é o melhor destino de **produção** para o time, porque o código source-owned fica no repo e o agente edita os mesmos arquivos que o humano.

Usar agora:

1. No app (Vite/Next), `improve-ds init` (ou `init --all` se o produto for agentic).
2. Confirmar que `AGENTS.md` tem o bloco Improve e que a skill está em `.agents/skills`.
3. No prompt, nomear a recipe: “landing-page / dashboard / app / slides”.
4. Depois de UI nova, pedir `improve-ds doctor` e uma checagem visual em 1280 e 390.

Completar em seguida (baixo esforço, alto retorno):

- Copiar a skill também para `.cursor/skills/improve-design-system` no `init`.
- Uma rule `.cursor/rules/improve-ui.mdc` com `globs` em `**/*.{tsx,css}`: “use `--ibs-*` e componentes de `src/improve`; não invente cor/radius”.
- Manter `AGENTS.md` do **app consumidor** curto (o CLI já escreve ~4 linhas). Não copiar o `AGENTS.md` deste repositório — ele é o contrato de quem **mantém** o DS, não de quem o consome.

Cursor Cloud / background agents neste próprio repositório já leem `AGENTS.md` + skill. Isso serve para evoluir o sistema, não para gerar o SaaS do cliente.

### Claude Code

O encaixe já é de primeira classe: `CLAUDE.md` → skill → manifesto.

Usar agora:

- Mesmo `init` do Cursor no repo do produto.
- Slash skill `/improve-design-system` (ou deixar o modelo escolher pela `description`).
- Para prototipar no canvas da Anthropic: `/design-sync` depois de o org ter um design system publicado no Claude Design.
- MCP opcional do próprio Claude Design: `claude mcp add --scope user --transport http claude-design https://api.anthropic.com/v1/design/mcp`. Isso **não** substitui o CLI Improve; só liga o canvas ao terminal.

Cuidado: Claude Code em um repo **sem** `init` vai gerar Tailwind solto. A skill só é eficaz se `improve.config.json` ou o manifesto estiverem no projeto, ou se o agente receber um starter.

### Claude Design

Claude Design (claude.ai/design) não executa o CLI e não instala `src/improve`. Ele **extrai** um UI kit da organização a partir de código, decks, guidelines e captura de site. Depois, todo projeto novo herda esse kit. Exporta HTML, PDF, PPTX, Canva, e faz handoff para Claude Code.

Isso é a melhor ferramenta do stack para **apresentação, one-pager e prototipação visual** com stakeholders. É a pior ferramenta para **SaaS de produção**, se for a única: o kit extraído pode divergir dos componentes React.

Como alimentar o Claude Design com este repo (uma vez, com alguém de marca + produto):

1. Publicar o design system da org com o specimen ([GitHub Pages](https://guilhermefaj.github.io/improve-design-system/)) e este repositório GitHub.
2. Anexar também `docs/FOUNDATIONS.md`, `docs/CONTENT.md`, `assets/brand/logo_fundo_branco.png` e 2–3 screenshots reais (landing, dashboard, slide).
3. No texto de onboarding, colar as regras não negociáveis: Inter / Clash Display (fallback Space Grotesk), canvas branco, superfície `#F5F2F0`, texto `#4F4F51`, ação `#F2703E`, foco/navegação `#483C8F`, sem glassmorphism, uma CTA primária por seção.
4. Validar com três prompts de fumaça: landing Improve, dashboard operacional, deck de diagnóstico.
5. Publicar o kit e travar edição (Enterprise: papel Claude Design Admin).

Handoff saudável:

```text
Claude Design (explorar) → HTML/PPTX para o cliente
                         → “Handoff to Claude Code” no repo que já rodou improve-ds init
                         → substituir HTML gerado por Button, AppShell, Slide, etc.
```

Não tratar o UI kit do Claude Design como fonte de verdade. A fonte continua sendo manifesto + tokens deste repo. Quando a marca mudar, atualizar o código e **remixar** o design system na org — não o contrário.

Falta neste repositório um `DESIGN.md` (ou recipe `claude-design`) feito para extração: paleta, tipo, anti-patterns, 4 screenshots de referência. Sem isso, a extração depende do modelo “adivinhar” o specimen.

### Claude.ai Artifacts (chat clássico)

Já existe caminho de primeira classe:

```bash
npx github:guilhermefaj/improve-design-system#v0.5.0 artifact --recipe slides
```

O starter é um único TSX, CSS inline, marca SVG, sem CDN. A recipe `artifact` e `references/artifacts.md` são explícitas: protótipo, depois `init` para produção.

Usar quando o entregável é um HTML/React isolado no Claude. Não usar quando o entregável é um app Next com auth, dados e rotas — aí o Artifact vira dívida.

### Codex

Codex já é um alvo explícito da v0.5. Lê `AGENTS.md` (teto ~32 KiB no encadeamento) e skills em `.agents/skills` com progressive disclosure.

Usar agora: o bloco curto que o `init` grava em `AGENTS.md` + a skill. Para listar peças, `improve-ds list --json` / `inspect <id> --json`. Não colar `llms-full.txt` no `AGENTS.md` global — estoura o orçamento e compete com as regras do repo.

Plugin Codex (distribuição da skill para todos os repos do time, sem `init`) é uma alternativa futura. Hoje a skill via `init` é suficiente.

### Outras superfícies (v0, Lovable, Replit, Gamma, Canva)

Claude Design já exporta para vários desses destinos. O Improve DS **não** deve tentar ser um preset de cada um. O contrato portátil para essas ferramentas é:

- paleta + tipo + anti-patterns (`FOUNDATIONS` + `CONTENT`);
- um HTML/React de referência (starter da recipe);
- specimen publicado.

Qualquer binding específico (preset shadcn, tema v0, plugin Figma) é trabalho de **v1.0 / mapping**, não de vibe coding no core.

## Alternativas de empacotamento

O time precisa escolher *como* o sistema entra em cada projeto. As opções abaixo não são exclusivas; a recomendação é um **híbrido por tipo de entregável**.

### A. Source-owned no app (status quo da v0.5)

`init` copia `src/improve` para o repositório do produto.

**Serve para:** SaaS, dashboard, app interno, qualquer coisa que vai para produção e precisa de upgrade com patch.

**Vantagem:** o agente vê o código, não um pacote opaco; customização é explícita; `doctor` detecta drift.

**Custo:** cada app carrega uma cópia; `init` hoje instala *todos* os stable, não a recipe. Upgrade exige disciplina (`upgrade` + revisar `.improve.patch`).

**Quando não usar:** deck de 8 slides para amanhã; Artifact de descoberta.

### B. Pacote npm / GitHub Package (ainda fora de política)

O `package.json` já descreve exports (`@improve-business/design-system`, `./styles.css`, tokens). A política v0.5 diz para **não** publicar registry nesta fase.

**Serve para:** muitos apps, versionamento SemVer clássico, tree-shaking.

**Custo:** o agente tende a não ler a implementação; “inventa” em volta do import. Exige auth de registry privado (o pacote é `UNLICENSED`).

Revisitar em v1.0, quando houver vários consumidores e RFCs. Não é o melhor próximo passo para vibe coding.

### C. Starter de Artifact / um arquivo (já existe)

**Serve para:** Claude Artifact, Claude Design como referência, pitch em HTML, prototipação sem repo.

**Custo:** CSS duplicado, sem Radix, sem tokens gerados. Drift visual é certo se o starter não for regenerado a cada release — e o workflow de release já empacota `improve-artifact-starters.tar.gz`.

Regra: Artifact nunca vira produção sem `init`. A skill já diz isso.

### D. Kit “Claude Design / DESIGN.md” (não existe ainda)

Um pacote de extração: `DESIGN.md` + 4 screenshots + tokens resumidos + anti-patterns + logo SVG. Sem componentes React.

**Serve para:** Claude Design org kit, Gamma/Canva via export, onboarding de quem não abre o repo.

**Custo:** segunda representação da marca. Precisa ser **gerado** a partir do manifesto (`npm run generate`), nunca editado à mão — o mesmo regime de `llms.txt`.

Este é o gap mais barato e mais visível para o time comercial/estratégia.

### E. MCP do próprio Improve DS (não existe)

Um servidor MCP com `list`, `inspect`, `tokens`, `recipe`, talvez `scaffold`.

**Serve para:** Cursor, Claude Code e Codex consultarem o catálogo sem clonar o monorepo e sem inflar o contexto.

**Custo:** mais superfície para manter; o CLI `--json` já cobre 80% se o agente puder rodar `npx github:...`. MCP Apps no roadmap (v0.4 residual) é outra coisa: UI *dentro* de um host MCP, não catálogo do DS.

Só vale depois que `init --recipe` e o kit Claude Design existirem. Até lá, `list --json` é o MCP pobre e suficiente.

### F. Monorepo / submodule / “sempre trabalhar neste repo”

Gerar o SaaS *dentro* deste repositório (demo, fixture, playground).

**Não fazer** como modo padrão. Polui o core, mistura produto de cliente com o sistema, e quebra a premissa source-owned. Fixtures em `scripts/test-consumer-fixture.mjs` já testam Vite e Next como consumidores — isso é o suficiente.

## Modelo operacional recomendado

Três faixas. O time escolhe a faixa *antes* de abrir o Cursor.

### Faixa 1 — Entregável de conversa (mesmo dia)

Decks, one-pagers, landing de campanha, prototipação com cliente na sala.

1. Claude Design com o kit da org (quando publicado) **ou** starter `artifact --recipe slides|landing-page`.
2. Conteúdo a partir de `docs/CONTENT.md`: contexto → tensão → caminho → impacto. Sem claims inventados.
3. Export PPTX/PDF/HTML para o stakeholder.
4. Se o artefato virar produto, só então Faixa 2.

Não abra um repo Next “só para o deck”. `Slide` em React existe para decks **dentro de produto** ou HTML-to-PDF, não para substituir o Claude Design em apresentação comercial.

### Faixa 2 — Produto React (SaaS, dashboard, app, site institucional)

1. Nascer de um **template GitHub** Improve (quando existir) **ou** repo Vite/Next + `init` na tag de release mais recente.
2. Confirmar `improve.config.json` e `src/improve/` no primeiro commit.
3. No primeiro prompt do agente: recipe + restrição “importe de `src/improve`, tokens `--ibs-*`, rode `doctor`”.
4. Composição típica:
   - SaaS: `AppShell` + `Sidebar` + `PageHeader` + `MetricCard` / `DataGrid` + `FilterBar`.
   - Marketing: `SiteHeader` + `Hero` + `FeatureCard` / `ServicePanel` + `Footer`.
   - Agentic: recipe `agent-workspace` + `init --all`.
5. Tema: claro padrão; `data-ibs-theme="dark"` só onde o produto pedir. Não recodear laranja/roxo.
6. Quando este DS ganhar uma tag nova: no **produto**, `npx github:…#vX.Y.Z upgrade` — não re-rodar `init`.

### Faixa 3 — Evoluir o próprio design system

Só neste repositório. Manifesto e tokens primeiro, `pnpm generate`, `pnpm check`. Agentes aqui seguem `AGENTS.md` do core. Não misturar pedido de “landing do cliente X” com mudança de token.

## Novo repo, template e versão

A pinagem `#v0.5.0` não é um bug. É o contrato. Cada produto leva uma **cópia congelada** do sistema. Este repositório continua evoluindo; os produtos só avançam quando alguém decide.

```text
improve-design-system   v0.5.0 ──init──►  site-improve (copia 0.5.0)
        │ continua
        ▼
                     v0.6.0 ──upgrade──►  site-improve (passa a 0.6.0)
```

`improve.config.json` guarda `designSystemVersion`. `doctor` avisa se o CLI que você está rodando não é a versão instalada. Por isso o comando sempre leva a tag: ele diz *qual* cópia copiar ou atualizar.

### Como nascer um repo novo

Dois caminhos, os dois corretos. O template é o que o time deve preferir no dia a dia.

**A. Template GitHub (recomendado)**

1. Manter dois templates na org: `improve-site-template` (landing) e `improve-app-template` (SaaS).
2. Cada um já passou por `init` numa tag de release: vem com `src/improve/`, `improve.config.json`, skill e `AGENTS.md`.
3. “Use this template” no GitHub → repo novo já é Improve.
4. Abrir no Cursor e só então pedir a primeira página (recipe `landing-page` ou `app`).
5. A cada **release deste DS**, regenerar os templates (Action que faz `init` de novo na tag nova e faz push). Repo **já existente** não é tocado.

O template é um atalho de `init`, não uma segunda fonte de verdade. Se o template atrasar um patch, o produto ainda pode `upgrade` para a tag nova.

**B. Repo vazio + `init`**

Copiar o one-liner da **release mais recente** (README da tag, não um comando decorado na wiki):

```bash
npx github:guilhermefaj/improve-design-system#v0.5.0 init
npm install
```

O `#v0.5.0` do README deste repo é gerado a partir de `package.json`. Quando existir `v0.6.0`, o README daquela tag passa a dizer `#v0.6.0`. Projetos antigos continuam em 0.5.0 até o `upgrade`.

### Como este DS avança sem arrastar os produtos

| Momento | Onde | Comando |
| --- | --- | --- |
| Evoluir marca, componente, recipe | este repositório | `pnpm generate` + tag SemVer |
| Começar site ou SaaS novo | repo novo ou template | `init` **na tag atual** |
| Incorporar o DS novo num produto velho | cada produto, quando couber | `npx github:…#v0.6.0 upgrade` |
| Ver se a cópia está íntegra / defasada | cada produto | `doctor` (idealmente no CI) |

`upgrade` não é `init` de novo. Ele compara hashes, atualiza o que não foi mexido e gera `.improve.patch` no que o produto personalizou. `--force` só com autorização explícita.

Não é preciso (nem desejável) atualizar todos os produtos no mesmo dia da tag. Um site institucional pode ficar uma minor atrás; um SaaS em construção deve acompanhar de perto. A pinagem existe para essa escolha ser explícita.

### O que não fazer

- **`npx github:guilhermefaj/improve-design-system init` sem tag** (equivale a `main`). O `main` pode estar no meio de um PR. Repo novo nasceria irreprodutível.
- **Re-rodar `init` para “atualizar”.** Isso não é o fluxo. `init` instala; `upgrade` migra.
- **Submodule / npm agora.** Source-owned + tag continua o formato que o agente lê melhor. npm privado é decisão de v1.0, quando houver muitos consumidores e RFCs.
- **Tag móvel `latest` apontando para `main`.** Se um dia existir atalho, que seja um git tag `latest` **movido só no workflow de release**, nunca no branch de trabalho. Mesmo assim, o produto grava a versão semântica no `improve.config.json` — o atalho é só para não copiar o número errado na hora do `init`.

### Ritual mínimo do time

1. Release deste DS = tag `vX.Y.Z` + regenerar templates.
2. Produto novo = template (ou `init` dessa tag) + `doctor` no GitHub Actions do produto.
3. Produto velho = `upgrade` para a tag nova quando o time daquele produto puder revisar o patch.

## Playbook curto por pedido típico

| Pedido | Recipe | Ferramenta | Comando / âncora |
| --- | --- | --- | --- |
| Deck de diagnóstico | `slides` | Claude Design ou Artifact | `artifact --recipe slides` |
| Landing da Improve / oferta | `landing-page` | Cursor/Claude Code após `init`, ou Artifact | `Hero`, `ServicePanel`, uma CTA |
| SaaS B2B | `app` + `dashboard` | Cursor/Claude Code + `init` | `AppShell`, `DataGrid`, `EmptyState` |
| Console de agente | `agent-workspace` | `init --all` | `ApprovalCard`, `ToolCallCard`, estados canônicos |
| Protótipo no chat Claude | `artifact` | Claude.ai | um arquivo, sem CDN |
| Explorar visual com stakeholder | — | Claude Design | kit da org + specimen |

Prompts que funcionam melhor nomeiam **recipe, componentes e restrições**, não “faça um SaaS bonito”:

```text
Recipe app. Use AppShell, Sidebar, PageHeader, MetricCard e DataGrid
de src/improve. Tokens --ibs-*. Uma ação primária por vista.
Estados vazio, loading e erro. Não invente cor. Rode improve-ds doctor.
```

## Lacunas que realmente travam o time

Ordenadas pelo retorno para vibe coding, não por “beleza de plataforma”.

1. **Não há templates GitHub de produto.** O `init` existe; o atalho “Use this template” ainda não. Dois templates (`site`, `app`) regenerados a cada release resolvem o ritual de repo novo.
2. **`init` não aceita recipe.** Todo app leva o catálogo stable inteiro. Um `init --recipe app` (e equivalentes) alinharia CLI e recipes e reduziria ruído para o agente.
3. **Skill não é copiada para `.cursor/skills`.** Cursor fica dependente de `AGENTS.md` + `.agents/skills`. Um terceiro destino no `installAgentGuidance` fecha o trio Cursor / Claude / Codex.
4. **Não há kit de extração para Claude Design.** Sem `DESIGN.md` gerado + screenshots de referência, o canvas da Anthropic reconstroi a marca com qualidade irregular.
5. **Não há rule Cursor com glob.** Uma `.mdc` de 20 linhas em arquivos TSX/CSS evita o drift de “Tailwind default” no meio do `src/improve`.
6. **Starters de Artifact podem divergir do core.** São CSS duplicado. Precisam continuar no tarball de release, mas alguém tem que regenerá-los quando token/marca mudam.
7. **Templates/pages fora de escopo.** Correto para o core. Para o time, isso significa que “página de pricing” ou “onboarding de 4 passos” ainda são composição. Recipes cobrem a estrutura; não cobrem um template pronto. Resistir à tentação de colocar páginas de cliente no core.
8. **Roadmap interno está defasado.** `docs/ROADMAP.md` ainda lista v0.3/v0.4 como “próximas fases” depois de declarar v0.5. Isso confunde agente e humano. Separar “feito na v0.5” de “próximo” em um passe de docs.
9. **Figma / Tokens Studio** está na v1.0. Não bloqueia vibe coding se specimen + Claude Design existirem. Bloqueia o time de design clássico. Tratar como trilha paralela, não como pré-requisito do CLI.

O que **não** falta: mais atoms, preset shadcn, publicação npm, MCP do catálogo. Isso aumenta superfície sem resolver o problema de “o agente não achou a skill no Cursor” ou “o Claude Design inventou um roxo”.

## Decisões para o time

Antes de implementar o próximo pacote de portabilidade, vale fechar:

1. **Claude Design é oficial para decks?** Se sim, priorizar o kit de extração (`DESIGN.md` + specimen + screenshots) e um dono de marca na org Anthropic.
2. **Produto novo nasce de template GitHub + `doctor` no CI?** Recomendado. `init` na tag de release é o fallback. Não rastrear `main`.
3. **Cada produto escolhe quando fazer `upgrade`?** Sim. A pinagem existe para isso. Não atualizar todos os consumidores no mesmo dia da tag.
4. **`init --recipe` na v0.6?** Recomendado. É o único corte de CLI que muda o dia a dia do vibe coding.
5. **Skill em três pastas** (`.agents`, `.claude`, `.cursor`) no mesmo `init`? Recomendado; é uma mudança local no CLI.
6. **npm privado em v1.0, não agora?** Manter a política atual. Source-owned ainda é o formato que os agentes mais respeitam.

## Como este documento se relaciona com o resto

- Auditoria de capacidade do core: [AGENTIC_FIRST.md](./AGENTIC_FIRST.md)
- Fundamentos visuais: [FOUNDATIONS.md](./FOUNDATIONS.md)
- Voz: [CONTENT.md](./CONTENT.md)
- Governança de componente e versionamento: [ROADMAP.md](./ROADMAP.md)
- Workflow do agente: `skills/improve-design-system/SKILL.md`

Quando uma das decisões acima virar implementação, ela entra no manifesto/CLI/skill — não neste estudo.
