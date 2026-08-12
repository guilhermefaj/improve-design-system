# Auditoria agentic-first

## Veredito v0.2

O sistema mede duas capacidades separadas:

- **Agent-ready portability: 9/10.** Manifesto, schemas, tokens gerados, recipes, skill aberta, instruções Codex/Claude, CLI source-owned e starters autocontidos formam um contrato portátil.
- **Agentic UI maturity: 8/10.** O core representa execução, streaming, ferramentas, aprovação, retomada, proveniência, handoff, permissões e observabilidade sem depender de SDK.

## Dimensões

| Dimensão | Nota | Evidência |
| --- | ---: | --- |
| Fundação visual e acessibilidade | 9 | Tema claro/escuro, teclado, foco, contraste, responsividade e movimento reduzido. |
| Contrato legível por máquina | 9 | Manifesto versionado, três schemas, catálogo de props/estados e tokens DTCG. |
| Instalação e atualização | 9 | `init`, `add`, `doctor`, `diff`, `upgrade`, hashes e patches explícitos. |
| Portabilidade entre agentes | 9 | Skill canônica, adapters, `AGENTS.md`, `CLAUDE.md`, `llms.txt` e JSON consultável. |
| Documentação para geração | 9 | Seis recipes, regras positivas, anti-patterns e exemplos React/Artifact. |
| UI generativa e Artifacts | 8 | Três starters React em arquivo único, SVG inline e renderização sem rede. |
| Estados assíncronos e streaming | 8 | Vocabulário neutro de run, `AgentStatus`, `StreamingMessage`, erro e plano. |
| Transparência de ferramentas | 8 | `ToolCallCard` mostra propósito, tentativa, duração, entrada, saída, erro e retry. |
| Aprovação humana | 9 | Ação, sistema, destino, dados, risco, reversibilidade, escopo, editar e rejeitar. |
| Pausa, retomada e cancelamento | 8 | Estados compartilhados e APIs controladas; persistência pertence à aplicação. |
| Proveniência e confiança | 8 | Artefatos, citações, permissões, boundaries e trace. |
| Handoff entre agentes | 7 | Origem, destino, razão, contexto e estado; falta visualização de grafos complexos. |
| Observabilidade | 8 | Timeline, tentativa, duração, falha parcial e detalhes progressivos. |

## Contrato neutro

```ts
type AgentRunStatus =
  | 'queued'
  | 'thinking'
  | 'running'
  | 'awaiting_approval'
  | 'paused'
  | 'succeeded'
  | 'failed'
  | 'cancelled';
```

Componentes recebem estado por props e devolvem intenções por callbacks. OpenAI, Anthropic, MCP ou outro runtime entra por adapters na aplicação, nunca como dependência do core.

## Regras de interação

- Mudanças de etapa usam `aria-live="polite"`; tokens transmitidos individualmente não são anunciados.
- Aprovação informa consequência antes da ação e nunca oculta rejeição ou edição.
- Cancelamento preserva contexto suficiente para retomada; a aplicação persiste o estado serializável.
- Detalhes técnicos ficam progressivamente revelados em tool calls e traces.
- UI gerada vive dentro de um boundary nomeado, com autoria, status e fallback seguro.
- Fonte e permissão são conteúdo de primeira classe, não notas de rodapé invisíveis.

## Critério de maturidade

A story de referência e os testes demonstram streaming, ferramenta bem-sucedida ou recuperável, aprovação editável/rejeitável, cancelamento representável, artefato com fontes, handoff e trilha de execução. Persistência real e adapters de SDK são responsabilidades dos apps consumidores.
