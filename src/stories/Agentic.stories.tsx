import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AgentError,
  AgentHandoff,
  AgentStatus,
  ApprovalCard,
  ArtifactCard,
  CitationList,
  Cluster,
  Grid,
  Heading,
  McpAppFrame,
  PermissionScope,
  PlanSteps,
  RunTimeline,
  Stack,
  StreamingMessage,
  Text,
  ToolCallCard,
  TraceViewer,
  type AgentEvent,
} from '../components';

const events: AgentEvent[] = [
  { id: '1', runId: 'run-42', type: 'plan.created', label: 'Plano criado', detail: 'Três etapas priorizadas.', status: 'succeeded', timestamp: '2026-08-12T13:00:00-03:00', actor: { id: 'agent-1', label: 'Improve AI', kind: 'agent' } },
  { id: '2', runId: 'run-42', type: 'tool.started', label: 'Dados consultados', detail: 'Analisando solicitações recentes.', status: 'running', timestamp: '2026-08-12T13:00:04-03:00', actor: { id: 'tool-1', label: 'Analytics', kind: 'tool' } },
  { id: '3', runId: 'run-42', type: 'approval.required', label: 'Aprovação solicitada', detail: 'Envio externo requer controle humano.', status: 'awaiting_approval', timestamp: '2026-08-12T13:00:09-03:00', actor: { id: 'agent-1', label: 'Improve AI', kind: 'agent' } },
];

function AgenticSpecimen() {
  return (
    <Stack gap={8}>
      <div><Heading level={2} size={2}>Agentic interaction</Heading><Text tone="muted" style={{ marginTop: 'var(--ibs-space-3)' }}>Execuções observáveis, controláveis, retomáveis e auditáveis.</Text></div>
      <Cluster><AgentStatus status="thinking" detail="Revisando contexto" /><AgentStatus status="running" detail="Consultando dados" /><AgentStatus status="awaiting_approval" /><AgentStatus status="succeeded" /></Cluster>
      <StreamingMessage isStreaming>Encontrei três oportunidades recorrentes. Estou organizando impacto, esforço e dependências antes de propor uma priorização.</StreamingMessage>
      <Grid columns={2}>
        <ToolCallCard name="Analytics" purpose="Agrupar solicitações por causa e impacto" status="succeeded" input="90 dias de solicitações" output="3 padrões priorizados" durationMs={842} />
        <ToolCallCard name="CRM" purpose="Localizar responsáveis pelas contas afetadas" status="failed" error="Permissão insuficiente para leitura" onRetry={() => undefined} />
      </Grid>
      <ApprovalCard title="Enviar recomendação ao time de Operações?" action="Publicar relatório e notificar responsáveis" system="Microsoft Teams" destination="Canal Operações" dataScopes={['Resumo agregado de solicitações', 'Responsáveis pelas iniciativas']} consequence="O conteúdo ficará visível para todos os membros do canal e a publicação não poderá ser recolhida pelo agente." risk="medium" reversible={false} onApprove={() => undefined} onEdit={() => undefined} onReject={() => undefined} />
      <Grid columns={2}>
        <PlanSteps steps={[{ id: 'p1', label: 'Entender o contexto', status: 'completed' }, { id: 'p2', label: 'Analisar padrões', status: 'in_progress', detail: 'Comparando impacto e esforço.' }, { id: 'p3', label: 'Preparar recomendação', status: 'pending' }]} />
        <RunTimeline events={events} />
      </Grid>
      <AgentError message="A consulta ao CRM expirou. Os resultados de Analytics foram preservados." onRetry={() => undefined} onEdit={() => undefined} onCancel={() => undefined} />
      <Grid columns={2}>
        <ArtifactCard artifact={{ title: 'Recomendação operacional', type: 'PDF', version: 'v3', author: 'Improve AI', size: '1,4 MB', href: '#' }} />
        <PermissionScope resource="CRM" permissions={['Ler contas e responsáveis', 'Consultar histórico de contato']} duration="session" status="granted" onRevoke={() => undefined} />
      </Grid>
      <AgentHandoff from="Agente de diagnóstico" to="Agente de implementação" reason="A recomendação foi aprovada e está pronta para detalhamento." context="Objetivo, restrições, evidências e artefatos foram transferidos." status="succeeded" />
      <CitationList items={[{ id: 'c1', title: 'Relatório de solicitações — Q2', source: 'Analytics interno', href: '#', verified: true, summary: 'Base usada para frequência e impacto.' }, { id: 'c2', title: 'Política de automação', source: 'Knowledge Base', href: '#', verified: true }]} />
      <McpAppFrame name="Painel de iniciativas" server="improve-operations" status="connected"><Text>Recurso MCP conectado e pronto para interação.</Text></McpAppFrame>
      <TraceViewer traceId="run-42" items={events.map((event, index) => ({ ...event, durationMs: 240 + index * 110, inputSummary: index === 1 ? '90 dias' : undefined, outputSummary: index === 1 ? '3 padrões' : undefined }))} />
    </Stack>
  );
}

const meta = { title: '05 Agentic Patterns/Overview', component: AgenticSpecimen, tags: ['autodocs'] } satisfies Meta<typeof AgenticSpecimen>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Workspace: Story = {};
