import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Attachment, DirectionProvider, InputOTP, Label, Marker, ToggleGroup, useDirection } from '../components';

function DirectionProbe() {
  const dir = useDirection();
  return <span>dir:{dir}</span>;
}

describe('catalog v1.1 promotions', () => {
  it('associates Label with an input', () => {
    render(
      <>
        <Label htmlFor="company">Empresa</Label>
        <input id="company" />
      </>,
    );
    expect(screen.getByLabelText('Empresa')).toBeInTheDocument();
  });

  it('exposes OTP slots with an accessible name', () => {
    const onValueChange = vi.fn();
    render(<InputOTP label="Código" value="" onValueChange={onValueChange} />);
    expect(screen.getByLabelText('Código')).toBeInTheDocument();
  });

  it('provides direction context', () => {
    render(
      <DirectionProvider dir="rtl">
        <DirectionProbe />
      </DirectionProvider>,
    );
    expect(screen.getByText('dir:rtl')).toBeVisible();
  });

  it('marks selected toggle group option', () => {
    render(
      <ToggleGroup
        label="Vista"
        value="list"
        items={[
          { value: 'list', label: 'Lista' },
          { value: 'board', label: 'Quadro' },
        ]}
      />,
    );
    expect(screen.getByRole('radio', { name: 'Lista' })).toHaveAttribute('aria-checked', 'true');
  });

  it('removes an attachment through an accessible control', () => {
    const onRemove = vi.fn();
    render(<Attachment files={[{ name: 'brief.pdf' }]} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remover brief.pdf' }));
    expect(onRemove).toHaveBeenCalledWith(0);
  });

  it('announces marker status labels', () => {
    render(<Marker tone="success" label="Concluído" />);
    expect(screen.getByLabelText('Concluído')).toBeInTheDocument();
  });
});
