import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Button,
  Combobox,
  DataGrid,
  NumberInput,
  SegmentedControl,
  Sidebar,
  Stepper,
  type DataGridColumn,
} from '../components';

describe('SaaS component layer', () => {
  it('exposes loading without allowing duplicate actions', () => {
    const action = vi.fn();
    render(
      <Button loading onClick={action}>
        Salvar
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Carregando' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('changes segmented and numeric values through accessible controls', () => {
    const onSegment = vi.fn();
    const onNumber = vi.fn();
    render(
      <>
        <SegmentedControl
          label="Período"
          value="month"
          onValueChange={onSegment}
          items={[
            { value: 'week', label: 'Semana' },
            { value: 'month', label: 'Mês' },
          ]}
        />
        <NumberInput label="Licenças" defaultValue={2} onValueChange={onNumber} />
      </>,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Semana' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar Licenças' }));
    expect(onSegment).toHaveBeenCalledWith('week');
    expect(onNumber).toHaveBeenCalledWith(3);
  });

  it('filters and selects an option in the combobox', () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        label="Plano"
        options={[
          { value: 'growth', label: 'Growth' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole('combobox', { name: 'Plano' });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'enter' } });
    fireEvent.click(screen.getByRole('option', { name: 'Enterprise' }));
    expect(onValueChange).toHaveBeenCalledWith('enterprise');
  });

  it('supports keyboard navigation in the combobox', () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        label="Plano"
        options={[
          { value: 'starter', label: 'Starter' },
          { value: 'growth', label: 'Growth' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole('combobox', { name: 'Plano' });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onValueChange).toHaveBeenCalledWith('growth');
  });

  it('announces step progress and active sidebar navigation', () => {
    render(
      <>
        <Stepper
          active={1}
          items={[
            { id: 'a', label: 'Empresa' },
            { id: 'b', label: 'Plano' },
          ]}
        />
        <Sidebar groups={[{ items: [{ label: 'Início', href: '#', active: true }] }]} />
      </>,
    );
    expect(screen.getByText('Plano').closest('li')).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page');
  });

  it('sorts and selects rows in the data grid', () => {
    type Row = { id: string; name: string };
    const rows: Row[] = [
      { id: 'b', name: 'Beta' },
      { id: 'a', name: 'Alpha' },
    ];
    const columns: DataGridColumn<Row>[] = [
      { id: 'name', header: 'Nome', cell: (row) => row.name, sortValue: (row) => row.name },
    ];
    const onSelectionChange = vi.fn();
    render(
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        caption="Clientes"
        selectable
        selectedIds={[]}
        onSelectionChange={onSelectionChange}
      />,
    );
    const table = screen.getByRole('table', { name: 'Clientes' });
    fireEvent.click(within(table).getByRole('button', { name: /Nome/ }));
    const bodyRows = within(table).getAllByRole('row').slice(1);
    expect(within(bodyRows[0]).getByText('Alpha')).toBeVisible();
    fireEvent.click(within(bodyRows[0]).getByRole('checkbox'));
    expect(onSelectionChange).toHaveBeenCalledWith(['a']);
  });
});
