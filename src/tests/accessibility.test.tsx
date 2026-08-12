import axe from 'axe-core';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AgentStatus, ApprovalCard, ToolCallCard } from '../components';

describe('automated accessibility', () => {
  it('has no critical axe violations in the agentic approval flow', async () => {
    const { container } = render(<main>
      <h1>Execução assistida</h1>
      <AgentStatus status="awaiting_approval" detail="Revise a ação proposta" />
      <ToolCallCard name="Drive" purpose="Preparar relatório" status="succeeded" durationMs={420} output="Arquivo pronto" />
      <ApprovalCard title="Compartilhar relatório" action="Compartilhar arquivo" system="Drive" destination="Cliente" consequence="O arquivo ficará visível para o destinatário." reversible dataScopes={['Relatório']} onApprove={vi.fn()} onReject={vi.fn()} onEdit={vi.fn()} />
    </main>);
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(result.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))).toEqual([]);
  });
});
