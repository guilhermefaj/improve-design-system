# Como usar o Improve Design System em um projeto novo

Este guia é o material para você entender, replicar e passar ao time.

A versão de referência é **v1.0.0**. Sempre pinhe a **tag**. Não use `main` como fonte de instalação: `main` muda; a tag não.

## Mapa em 30 segundos

| Camada                                      | Onde vive                                          | Posso mudar no produto?                                                                     |
| ------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Marca (laranja, roxo, Inter, Clash Display) | Repositório do design system                       | Não. Muda no DS, depois `upgrade` nos produtos.                                             |
| Componentes (`Button`, `Card`, `Hero`…)     | Cópia em `src/improve/`                            | Não no dia a dia. São a receita oficial.                                                    |
| Tokens `--ibs-*`                            | CSS gerado dentro de `src/improve/`                | Só **sobrescrever semântica** no CSS do app (tema de produto). Não hex solto no componente. |
| Páginas, rotas, copy, dados, fluxos         | Código do produto (`src/app`, `pages`, `features`) | Sim. É para isso que o produto existe.                                                      |
| Quais peças instalar                        | `improve.config.json` + `add`                      | Sim. Cada produto puxa só o que usa.                                                        |

Analogia: o design system é a receita oficial. `init` imprime a receita na cozinha do produto. Cozinhar (telas, textos, regras) é trabalho do produto. Alterar a receita (cor, botão, token) é trabalho do design system.

## Duas coisas diferentes (não misture)

Existem dois repositórios na prática:

1. **O design system** (`improve-design-system`). Fábrica. Aqui vivem tokens, manifesto, specimen (`pnpm dev`) e Storybook. Mudança de marca, componente ou contrato entra **neste** repo, com teste e specimen.
2. **O produto** (site da Improve, SaaS, dashboard). Recebe uma **cópia** do código em `src/improve/`. Essa cópia passa a pertencer ao produto. **Não há pacote npm** no dia a dia: não é `pnpm add @improve-business/design-system`.

```text
improve-design-system          produto (site / SaaS)
─────────────────────          ─────────────────────
tokens, manifesto, CLI   →     src/improve/          cópia pinada em v1.0.0
specimen + Storybook           src/app, pages, features
                               improve.config.json   inventário + hashes
```

Se os dois mudam no mesmo PR, o time perde a fonte de verdade. O produto pede a peça (`add`). O DS define a peça.

## O que posso alterar vs. o que deve ficar fixo

Pense em três camadas. Quanto mais embaixo, mais cara e mais perigosa é a mudança.

### 1. Contrato da marca — fixo no produto

Não invente estes valores numa tela isolada. Se a marca mudar, muda o DS e depois `upgrade`.

- Laranja `#F2703E`: ação primária e controles marcados (checkbox, radio, switch). Texto do CTA primário é **branco em negrito**; isso é exceção de contraste documentada, não um bug.
- Roxo `#483C8F`: foco, links, navegação ativa, aprovação humana, estados de agente.
- Cinza `#4F4F51`: texto.
- Canvas branco e superfície `#F5F2F0`.
- Inter no corpo e na UI de produto. Clash Display nos títulos quando a Fontshare estiver carregada; Space Grotesk como fallback. Edu NSW ACT Cursive só em acento raro.
- Prefixo CSS `--ibs-*`. Use tokens semânticos (`--ibs-color-text`, `--ibs-color-action-primary`), não hex solto no JSX.
- `variant="primary"` no botão. `variant="brand"` existe só como apelido compatível.

### 2. Código copiado em `src/improve/` — não edite no dia a dia

Esses arquivos têm hash no `improve.config.json`. Se você alterar `Button.tsx` no produto:

- o próximo `upgrade` **não** sobrescreve: gera `.improve.patch` para revisar;
- `doctor` aponta “locally modified”;
- o produto diverge da marca e cada tela vira uma ilha.

Regra: customização de produto **envolve** o DS (uma page, um layout, um tema de projeto). Não abre o botão para trocar a cor.

Exceção consciente: hotfix urgente no produto. Aí `diff` + patch, e a correção definitiva volta para o repositório do DS.

Tema de um produto específico (ex.: frente Ventures) pode sobrescrever **tokens semânticos** no CSS do app, sem editar o componente:

```css
[data-product='ventures'] {
  --ibs-color-brand: #8f6cad;
  --ibs-color-focus: #684882;
}
```

Não altere primitivos (`#F2703E` na paleta) nem CSS interno de `src/improve/components`.

### 3. O produto — altere à vontade

- Rotas, páginas, dados, copy, regras de negócio.
- Composição: `Hero` + `Section` + `Card` + `Button`.
- Qual recorte do catálogo instalar (`add` só o que o app usa).
- Empty states, fluxos, integração com API/agente.
- `data-ibs-theme="dark"` onde fizer sentido.

Templates e pages **não existem** no DS v1.0. A “página” do produto é sempre código do produto.

### Se eu quiser mudar X, faço o quê?

| Quero…                              | Faço no produto                                    | Faço no DS                                                  |
| ----------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| Nova landing, dashboard, copy, rota | Sim. Compor componentes existentes.                | Não.                                                        |
| Instalar `DataGrid` / `Sidebar`     | `improve-ds add data-grid`                         | Não, a menos que a peça ainda não exista.                   |
| Trocar o laranja da marca           | Não.                                               | Tokens + specimen + release. Depois `upgrade` nos produtos. |
| Botão um pouco diferente nesta tela | Variante já existente, ou composição em volta.     | Novo componente só se for padrão reutilizável.              |
| Cor da frente Ventures              | Sobrescrever token semântico no CSS do app.        | Só se a frente virar token oficial.                         |
| Corrigir bug do `ScrollArea`        | Hotfix + `diff`, se for urgente.                   | Correção definitiva, teste, nova tag.                       |
| Tela “tipo Artifact” para explorar  | `artifact --recipe landing-page` (arquivo avulso). | Não. Artifact não é produção.                               |

## O que o `init` deixa no produto

| Caminho                                                     | Função                                              | Mexer?                                                             |
| ----------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| `src/improve/`                                              | Componentes, tokens gerados, CSS `--ibs-*`          | Não no dia a dia                                                   |
| `improve.config.json`                                       | Versão, quais componentes, hash de cada arquivo     | Só via CLI (`add`, `upgrade`)                                      |
| `.agents/skills/improve-design-system/` e `.claude/skills/` | Skill para Cursor e Claude falarem o idioma Improve | Não                                                                |
| `AGENTS.md` / `CLAUDE.md`                                   | Ponte para o agente ler o contrato                  | Pode acrescentar regras do **produto**; não apague o bloco Improve |

`init` instala só componentes **stable**. Beta e experimental entram com `init --all` ou `add` explícito.

O `index.ts` de `src/improve` já importa fontes e CSS. Importar um componente no app já puxa o visual.

## Por que cada comando existe

O CLI não é “mais um gerador”. Cada comando responde a uma pergunta concreta.

Use sempre o `-p` e aspas. No zsh, `#` começa comentário; sem `-p`, o npm procura um binário chamado `init` e falha.

```bash
npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds <comando>
```

| Comando               | Pergunta que responde                        | O que faz                                                            | Por que não pular                                                          |
| --------------------- | -------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `init`                | “Como este repo começa igual aos outros?”    | Copia stable + config + skill                                        | Ponto de partida único. Sem isso, cada produto inventa uma pasta.          |
| `init --all`          | “Preciso das peças ainda instáveis?”         | Inclui beta/experimental                                             | Evita puxar handoff/MCP sem querer. Só use se o produto realmente precisa. |
| `list`                | “Como se chama essa peça?”                   | Lista id, camada Atomic, status                                      | O id é `data-grid`, não `Table`. Agente e pessoa param de adivinhar.       |
| `inspect <id>`        | “O que esse componente aceita?”              | Props, estados, a11y, arquivos                                       | Contrato, não só o visual do specimen.                                     |
| `add <ids>`           | “O produto cresceu. Falta uma peça.”         | Copia o componente e as dependências                                 | `approval-card` traz botão, layout, etc. Você não caça arquivos à mão.     |
| `artifact --recipe …` | “Quero um rascunho de tela agora.”           | Gera um arquivo React autocontido                                    | Exploração. Não substitui `init` nem é código de produção.                 |
| `doctor`              | “Esta cópia ainda é a v1.0.0 intacta?”       | Confere hashes, versão, dependências                                 | Ritual de PR. Se `doctor` reclama, alguém editou `src/improve`.            |
| `diff`                | “O que foi mexido na cópia?”                 | Lista missing/modified                                               | Transparência antes de um `upgrade`.                                       |
| `upgrade`             | “Saiu v1.1. Como puxo sem apagar o produto?” | Atualiza arquivos **não** modificados; o resto vira `.improve.patch` | Evoluir a marca sem esmagar hotfix.                                        |
| `upgrade --force`     | “Pode jogar fora o que eu alterei na cópia?” | Sobrescreve local                                                    | Perigoso. Só com autorização explícita.                                    |

Recipes do `artifact`: `landing-page`, `dashboard`, `app`, `slides`, `agent-workspace`, `artifact`.

## Estrutura para replicar no produto

Use esta árvore como padrão. Ajuste nomes de `app`/`features` ao framework (Vite ou Next). **Não** mude `src/improve` nem `improve.config.json` à mão.

```text
meu-app/
├── package.json
├── improve.config.json          ← inventário gerado pelo CLI
├── AGENTS.md                    ← bloco Improve + regras do produto
├── CLAUDE.md
├── .agents/skills/improve-design-system/
├── .claude/skills/improve-design-system/
└── src/
    ├── improve/                 ← CÓPIA do DS. Não editar no dia a dia
    │   ├── index.ts             ← já importa fontes e CSS
    │   ├── components/
    │   ├── styles/
    │   └── tokens/
    ├── styles/
    │   └── product.css          ← aqui: tema de produto, layout da página
    ├── app/                     ← rotas / páginas (ou pages/)
    │   └── ...
    └── features/                ← fluxos de negócio, composição
        └── diagnostico/
            └── DiagnosticoPage.tsx
```

`product.css` pode conter:

```css
[data-product='meu-app'] {
  /* só tokens semânticos, se o produto tiver identidade própria */
}
```

No código da página, só composição:

```tsx
import { Button, Card, CardBody } from '../improve';

export function DiagnosticoPage() {
  return (
    <Card>
      <CardBody>
        <Button variant="primary">Começar diagnóstico</Button>
      </CardBody>
    </Card>
  );
}
```

No Next, o import costuma ser `from '@/improve'` se o alias apontar para `src/improve`.

## Ritual de um produto novo

Substitua `meu-app` pelo nome do repositório.

```bash
# 1. App React (Vite ou Next, React 18 ou 19)
pnpm create vite meu-app --template react-ts
cd meu-app

# 2. Instalar a cópia pinada na tag
npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds init
pnpm install

# 3. Ver o catálogo e puxar o que a primeira entrega precisa
npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds list
npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds add app-shell sidebar page-header

# 4. Conferir a instalação
npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds doctor
```

Para olhar o componente “ao vivo” **antes** de montar a tela, no **repo do DS**:

```bash
pnpm dev          # specimen — página geral, mais simples
pnpm storybook    # inspeção, controles, a11y
```

O specimen não é um site no GitHub Pages. É a galeria local.

Quando o DS lançar v1.1:

```bash
npx -p "github:guilhermefaj/improve-design-system#v1.1.0" improve-ds upgrade
# se aparecer .improve.patch: ler, decidir, só então --force
npx -p "github:guilhermefaj/improve-design-system#v1.1.0" improve-ds doctor
```

## Superfície v1.0.0 (status)

- **Stable (60):** use em produto.
- **Beta:** `AgentHandoff`, `TraceViewer` — API pode evoluir; avise no PR.
- **Experimental:** `GeneratedUIBoundary`, `McpAppFrame` — só prova de conceito.
- **Fora de escopo:** template e page.

## O que falar para o Cursor / Claude no produto

Depois do `init`, o agente já encontra a skill. Reforce no primeiro prompt:

1. Ler `improve.config.json` e a skill Improve.
2. Reutilizar componente existente (`list` / `inspect`) antes de criar um novo.
3. Usar tokens `--ibs-*`; não inventar hex.
4. Não editar `src/improve` sem `diff` e revisão.
5. Rodar `doctor` no fim.

Se a tarefa for “site da Improve”, recipe `landing-page`. Se for SaaS, `app` ou `dashboard`. Se for agente, `agent-workspace`.

## Checklist para o time

- [ ] Produto criado (Vite ou Next) com `package.json`
- [ ] `improve-ds init` na tag **v1.0.0** (comando com `-p` e aspas)
- [ ] `pnpm install` (ou npm/yarn) depois do init
- [ ] `add` só dos organismos que a primeira entrega precisa
- [ ] `doctor` limpo
- [ ] Primeira tela usa `Hero`/`Section`/`Button` (ou `AppShell`) — sem CSS paralelo de marca
- [ ] Ninguém commitou hex de marca fora de token semântico
- [ ] Skill presente em `.agents/skills` (Cursor) e `.claude/skills` (Claude)
- [ ] Quando o DS lançar versão nova: `upgrade`, ler `.improve.patch`, nunca `--force` no piloto automático

## Quando voltar ao repositório do DS

Faça a mudança **no design system** (não no produto) se:

- a cor, o espaço ou o tipo precisa mudar em todos os produtos;
- um componente está errado ou incompleto;
- falta um padrão que vai se repetir (aí ele entra no manifesto, com teste e specimen).

## Folha para passar ao time (copie e ajuste)

```text
Improve Design System — acordo do time (v1.0.0)

1. Pinamos a tag v1.0.0. Ninguém instala a partir de main.
2. Comando padrão:
   npx -p "github:guilhermefaj/improve-design-system#v1.0.0" improve-ds <comando>
3. src/improve/ é cópia. Não editamos no dia a dia.
4. Páginas, copy e composição são do produto.
5. Cor de marca e Button.tsx mudam no repo do DS, depois upgrade.
6. Tema de produto = sobrescrever token semântico no CSS do app.
7. Todo PR de UI: doctor limpo.
8. upgrade --force só com autorização.
9. Specimen (pnpm dev no repo do DS) é a página geral. Storybook é inspeção.
10. Guia completo: docs/USO_EM_PROJETOS.md no repo improve-design-system.
```
