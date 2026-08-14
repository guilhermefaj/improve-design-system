import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  AspectRatio,
  Collapsible,
  ContextMenu,
  DateRangePicker,
  DescriptionList,
  HoverCard,
  MultiSelect,
  ScrollArea,
  Tag,
  TimePicker,
} from '../components';

describe('v0.6 component additions', () => {
  it('removes a tag through an accessible control', () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Operações</Tag>);
    fireEvent.click(screen.getByRole('button', { name: 'Remover Operações' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('adds and removes values in the multi select', () => {
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        label="Segmentos"
        value={['growth']}
        onValueChange={onValueChange}
        options={[
          { value: 'growth', label: 'Growth' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />,
    );
    const input = screen.getByRole('combobox', { name: 'Segmentos' });
    fireEvent.focus(input);
    fireEvent.click(screen.getByRole('option', { name: 'Enterprise' }));
    expect(onValueChange).toHaveBeenCalledWith(['growth', 'enterprise']);
    fireEvent.click(screen.getByRole('button', { name: 'Remover Growth' }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it('renders a description list with terms and definitions', () => {
    render(<DescriptionList items={[{ term: 'Plano', description: 'Enterprise' }]} />);
    expect(screen.getByText('Plano')).toBeVisible();
    expect(screen.getByText('Enterprise')).toBeVisible();
  });

  it('reveals collapsible content when open by default', () => {
    render(
      <Collapsible label="Detalhes" defaultOpen>
        Conteúdo técnico
      </Collapsible>,
    );
    expect(screen.getByText('Conteúdo técnico')).toBeVisible();
  });

  it('labels the date range and time controls', () => {
    render(
      <>
        <DateRangePicker label="Período" />
        <TimePicker label="Horário" />
      </>,
    );
    expect(screen.getByLabelText('Período — início')).toBeInTheDocument();
    expect(screen.getByLabelText('Período — fim')).toBeInTheDocument();
    expect(screen.getByText('Horário')).toBeVisible();
  });

  it('renders hover card and context menu triggers', () => {
    render(
      <>
        <HoverCard trigger={<button type="button">Prévia</button>}>conteúdo</HoverCard>
        <ContextMenu items={[{ label: 'Renomear' }]}>
          <button type="button">Alvo</button>
        </ContextMenu>
      </>,
    );
    expect(screen.getByRole('button', { name: 'Prévia' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Alvo' })).toBeVisible();
  });

  it('renders scroll area and aspect ratio primitives', () => {
    const { container } = render(
      <>
        <ScrollArea maxBlockSize="10rem">
          <p>linha</p>
        </ScrollArea>
        <AspectRatio ratio={1}>
          <span>media</span>
        </AspectRatio>
      </>,
    );
    expect(container.querySelector('.ibs-scroll-area')).not.toBeNull();
    expect(container.querySelector('.ibs-aspect-ratio')).not.toBeNull();
  });
});
