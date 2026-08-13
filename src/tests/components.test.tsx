import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion, Button, Checkbox, Dialog, FormField, Input, Tabs } from '../components';
import { flatTokens } from '../tokens/generated';

function contrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const channels = hex.slice(1).match(/.{2}/g)!.map((value) => Number.parseInt(value, 16) / 255).map((value) => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

describe('Improve Design System', () => {
  it('renders button semantics and calls its action', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continuar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('exposes the semantic primary action variant', () => {
    render(<Button variant="primary">Aprovar ação</Button>);
    expect(screen.getByRole('button', { name: 'Aprovar ação' })).toHaveClass('ibs-button--primary');
  });

  it('keeps the primary action on the exact brand anchor and documents its contrast exception', () => {
    expect(flatTokens['color.action-primary']).toBe('#f2703e');
    expect(contrastRatio(flatTokens['color.action-primary-text'], flatTokens['color.action-primary'])).toBeLessThan(4.5);
    expect(contrastRatio(flatTokens['color.secondary'], '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });

  it('associates labels, hints and invalid state with form controls', () => {
    render(<FormField label="Empresa" error="Informe a empresa" required><Input /></FormField>);
    const input = screen.getByRole('textbox', { name: /Empresa/ });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Informe a empresa');
  });

  it('toggles checkbox by its visible label', () => {
    render(<Checkbox label="Aceito os termos" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos' });
    fireEvent.click(screen.getByText('Aceito os termos'));
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('provides accessible Radix semantics for tabs and accordion', () => {
    render(<><Tabs items={[{ value: 'one', label: 'Primeiro', content: 'Conteúdo um' }, { value: 'two', label: 'Segundo', content: 'Conteúdo dois' }]} /><Accordion items={[{ value: 'a', title: 'Segurança', content: 'Rastreabilidade' }]} /></>);
    expect(screen.getByRole('tablist', { name: 'Seções' })).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Primeiro' })).toHaveAttribute('aria-selected', 'true');
    const secondTab = screen.getByRole('tab', { name: 'Segundo' });
    expect(secondTab).toHaveAttribute('aria-selected', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'Segurança' }));
    expect(screen.getByText('Rastreabilidade')).toBeVisible();
  });

  it('moves focus into a dialog and exposes its accessible name', async () => {
    render(<Dialog trigger={<Button>Abrir</Button>} title="Novo diagnóstico" description="Comece pela dor." />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(await screen.findByRole('dialog', { name: 'Novo diagnóstico' })).toBeVisible();
  });
});
