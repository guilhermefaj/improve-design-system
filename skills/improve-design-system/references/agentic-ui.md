# UI agentic

## Estados canônicos

`queued`, `thinking`, `running`, `awaiting_approval`, `paused`, `succeeded`, `failed`, `cancelled`.

## Componentes

- `AgentStatus`: etapa resumida e região viva moderada.
- `StreamingMessage`: conteúdo progressivo sem anunciar cada token.
- `ToolCallCard`: ferramenta, propósito, estado, entrada resumida, saída, duração e recuperação.
- `ApprovalCard`: ação, sistema, destino, dados, consequência, risco, reversibilidade e escopo.
- `RunTimeline`: eventos, atores e falhas parciais.
- `AgentError`: preservar contexto e oferecer repetir, editar ou cancelar.
- `PlanSteps`: tornar intenção e progresso visíveis.
- `ArtifactCard`, `CitationList`, `PermissionScope`, `AgentHandoff`, `TraceViewer`: confiança e auditoria.

## Regras

- Diferenciar pensar, agir e aguardar uma pessoa.
- Exigir aprovação informada para ação externa, financeira, sensível ou irreversível.
- Anunciar mudanças de etapa; não anunciar cada token transmitido.
- Preservar contexto em erro, cancelamento e retomada.
- Revelar detalhes técnicos progressivamente.
- Manter SDKs de agentes fora do core; adaptar eventos para os tipos neutros.
