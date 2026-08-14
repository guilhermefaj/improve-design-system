import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  AgentHandoff,
  AgentStatus,
  ApprovalCard,
  CitationList,
  GeneratedUIBoundary,
  McpAppFrame,
  PermissionScope,
  PlanSteps,
  StreamingMessage,
  ToolCallCard,
  TraceViewer,
} from '../components';

describe('agentic interaction contracts', () => {
  it('announces execution and streaming state without exposing animation as content', () => {
    render(
      <>
        <AgentStatus status="running" detail="Consultando dados" />
        <StreamingMessage isStreaming>Resposta parcial</StreamingMessage>
      </>,
    );
    expect(screen.getByRole('status', { name: /Executando/ })).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Resposta parcial').closest('article')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Resposta em andamento')).toBeInTheDocument();
  });

  it('shows tool purpose, attempt, duration, recoverable error and retry', () => {
    const onRetry = vi.fn();
    render(
      <ToolCallCard
        name="CRM"
        purpose="Atualizar oportunidade"
        status="failed"
        attempt={2}
        durationMs={840}
        error="Tempo esgotado"
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole('region', { name: 'Ferramenta CRM' })).toHaveTextContent('Atualizar oportunidade');
    expect(screen.getByText('Tentativa 2')).toBeVisible();
    expect(screen.getByText('840 ms')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: /Tentar novamente/ }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('requires explicit human approval and supports edit and rejection', () => {
    const onApprove = vi.fn();
    const onEdit = vi.fn();
    const onReject = vi.fn();
    render(
      <ApprovalCard
        title="Publicar relatório"
        action="Enviar documento"
        system="Google Drive"
        destination="Pasta do cliente"
        dataScopes={['Relatório executivo']}
        consequence="O cliente receberá a nova versão."
        risk="high"
        reversible={false}
        onApprove={onApprove}
        onEdit={onEdit}
        onReject={onReject}
      />,
    );
    expect(screen.getByRole('region', { name: 'Publicar relatório' })).toHaveTextContent('Alto risco');
    expect(screen.getByText('Não')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: /Aprovar ação/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Editar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rejeitar' }));
    expect(onApprove).toHaveBeenCalledOnce();
    expect(onEdit).toHaveBeenCalledOnce();
    expect(onReject).toHaveBeenCalledOnce();
  });

  it('represents resumable plans, permissions and handoffs with accessible structure', () => {
    render(
      <>
        <PlanSteps
          steps={[
            { id: '1', label: 'Pesquisar', status: 'completed' },
            { id: '2', label: 'Revisar', status: 'in_progress' },
          ]}
        />
        <PermissionScope resource="CRM" permissions={['Ler contatos']} duration="once" />
        <AgentHandoff from="Pesquisador" to="Revisor" reason="Validar as fontes" context="3 fontes verificadas" />
      </>,
    );
    expect(screen.getByRole('list', { name: 'Plano de execução' })).toBeVisible();
    expect(screen.getByText('Revisar').closest('li')).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('region', { name: 'Permissão para CRM' })).toHaveTextContent('Uma vez');
    expect(screen.getByRole('region', { name: 'Transferência de Pesquisador para Revisor' })).toHaveTextContent(
      'Validar as fontes',
    );
  });

  it('keeps provenance and generated boundaries inspectable', () => {
    const events = [
      {
        id: 'e1',
        runId: 'r1',
        type: 'search',
        status: 'succeeded' as const,
        timestamp: '2026-08-12T12:00:00Z',
        label: 'Pesquisa concluída',
      },
    ];
    render(
      <>
        <CitationList
          items={[
            { id: 'c1', title: 'Fonte primária', source: 'Improve', href: 'https://improve.business', verified: true },
          ]}
        />
        <TraceViewer traceId="trace-1" items={events} />
        <GeneratedUIBoundary title="Resumo gerado" status="failed" fallback={<p>Versão segura</p>} />
        <McpAppFrame name="Analytics" server="analytics.local" status="failed" />
      </>,
    );
    expect(screen.getByRole('list', { name: 'Fontes' })).toHaveTextContent('Verificada');
    expect(screen.getByText(/Trace trace-1/)).toBeVisible();
    expect(screen.getByRole('region', { name: 'Resumo gerado' })).toHaveTextContent('Versão segura');
    expect(screen.getByRole('region', { name: 'Aplicativo MCP Analytics' })).toHaveTextContent('Falha na conexão');
  });
});
