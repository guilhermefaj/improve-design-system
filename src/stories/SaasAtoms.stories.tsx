import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Bold, Filter } from 'lucide-react';
import { Button, ButtonGroup, Chip, Cluster, Grid, Kbd, NumberInput, PasswordInput, SearchInput, SegmentedControl, Slider, Sparkline, Stack, Toggle } from '../components';

function AtomCatalog() {
  const [segment, setSegment] = useState('month');
  const [selected, setSelected] = useState(true);
  return <Stack gap={8}>
    <ButtonGroup><Button variant="primary" trailingIcon={<ArrowRight />} motion="subtle">Microinteração sutil</Button><Button variant="primary" trailingIcon={<ArrowRight />} motion="expressive">Expressiva</Button><Button variant="outline" motion="none">Sem movimento</Button></ButtonGroup>
    <Cluster><Chip selected={selected} onClick={() => setSelected(!selected)}>Enterprise</Chip><Chip removable onRemove={() => undefined}>Automação</Chip><Toggle pressed icon={<Bold />}>Negrito</Toggle><Toggle icon={<Filter />}>Filtros</Toggle></Cluster>
    <SegmentedControl label="Período" value={segment} onValueChange={setSegment} items={[{ value: 'week', label: 'Semana' }, { value: 'month', label: 'Mês' }, { value: 'year', label: 'Ano' }]} />
    <Grid columns={2}><SearchInput aria-label="Buscar clientes" placeholder="Buscar clientes" /><PasswordInput aria-label="Senha" placeholder="Sua senha" /><NumberInput label="Licenças" min={1} max={100} defaultValue={12} /><Slider label="Automação" defaultValue={62} valueLabel={(value) => `${value}%`} /></Grid>
    <Cluster><Kbd>⌘ K</Kbd><Kbd>Ctrl</Kbd><Kbd>Enter</Kbd><Sparkline values={[12, 18, 15, 29, 25, 38, 44]} label="Crescimento no período" /><Sparkline tone="brand" values={[31, 25, 27, 19, 24, 16, 21]} label="Variação no período" /></Cluster>
  </Stack>;
}

const meta = { title: '02 Atoms/SaaS Controls', component: AtomCatalog, tags: ['autodocs'] } satisfies Meta<typeof AtomCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
