import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bot, Building2, Check, FolderKanban, Home, Settings, Sparkles, Users } from 'lucide-react';
import { ActivityFeed, AppShell, Badge, Button, Chip, DataGrid, FilterBar, Grid, Heading, ImproveLogo, MetricCard, PageHeader, PricingCard, Sidebar, Stack, type DataGridColumn } from '../components';

type Customer = { id: string; name: string; plan: string; users: number; status: string };
const customers: Customer[] = [{ id: '1', name: 'Acme', plan: 'Growth', users: 18, status: 'Ativo' }, { id: '2', name: 'Lumina', plan: 'Enterprise', users: 62, status: 'Ativo' }, { id: '3', name: 'Nexo', plan: 'Starter', users: 4, status: 'Trial' }];
const columns: DataGridColumn<Customer>[] = [{ id: 'name', header: 'Cliente', cell: (row) => <strong>{row.name}</strong>, sortValue: (row) => row.name }, { id: 'plan', header: 'Plano', cell: (row) => row.plan, sortValue: (row) => row.plan }, { id: 'users', header: 'Usuários', cell: (row) => row.users, sortValue: (row) => row.users, align: 'end' }, { id: 'status', header: 'Status', cell: (row) => <Badge tone={row.status === 'Ativo' ? 'success' : 'brand'}>{row.status}</Badge> }];

function OrganismCatalog() {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const rows = customers.filter((item) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <Stack gap={10}>
    <AppShell sidebar={<Sidebar brand={<ImproveLogo compact />} groups={[{ items: [{ label: 'Início', href: '#', icon: <Home />, active: true }, { label: 'Clientes', href: '#', icon: <Users /> }, { label: 'Projetos', href: '#', icon: <FolderKanban />, badge: 8 }, { label: 'Agentes', href: '#', icon: <Bot /> }] }, { label: 'Administração', items: [{ label: 'Configurações', href: '#', icon: <Settings /> }] }]} />} header={<strong>Workspace Improve</strong>}><Stack gap={6}><PageHeader eyebrow="Customer success" title="Clientes" description="Acompanhe adoção, risco e expansão." actions={<Button leadingIcon={<Building2 />}>Novo cliente</Button>} /><Grid columns={3}><MetricCard label="Receita recorrente" value="R$ 184 mil" change={12.4} changeLabel="vs. mês anterior" values={[20, 24, 23, 31, 36, 40]} /><MetricCard label="Contas ativas" value="128" change={6.1} values={[80, 84, 92, 101, 113, 128]} /><MetricCard label="Uso de IA" value="74%" change={-1.8} values={[64, 70, 76, 78, 75, 74]} tone="brand" /></Grid><FilterBar query={query} onQueryChange={setQuery} filters={<><Chip selected>Ativos</Chip><Chip>Enterprise</Chip></>} activeCount={1} onClear={() => undefined} /><DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} caption="Clientes" selectable selectedIds={selected} onSelectionChange={setSelected} /></Stack></AppShell>
    <section aria-labelledby="pricing-title"><Stack gap={4}><Heading id="pricing-title" level={2} size={3}>Planos para cada estágio</Heading><Grid columns={3}><PricingCard name="Starter" description="Para validar a operação." price="R$ 490" suffix="/mês" features={['5 usuários', '1 workspace', 'Suporte por e-mail']} action={{ label: 'Começar', href: '#' }} /><PricingCard name="Growth" description="Para operações em escala." price="R$ 1.490" suffix="/mês" features={['30 usuários', 'Automações com IA', 'Analytics avançado']} action={{ label: 'Escolher Growth', href: '#' }} highlighted badge={<Badge tone="brand">Mais escolhido</Badge>} /><PricingCard name="Enterprise" description="Governança e personalização." price="Sob consulta" features={['SSO e auditoria', 'Agentes dedicados', 'SLA personalizado']} action={{ label: 'Falar com especialista', href: '#' }} /></Grid></Stack></section>
    <ActivityFeed items={[{ id: '1', actor: { name: 'Marina Costa' }, content: <>aprovou a automação <strong>Onboarding inteligente</strong>.</>, timestamp: '2026-08-13T10:10:00-03:00', icon: <Check /> }, { id: '2', actor: { name: 'Improve AI' }, content: <>gerou três recomendações para a conta Lumina.</>, timestamp: '2026-08-13T09:42:00-03:00', icon: <Sparkles /> }]} />
  </Stack>;
}

const meta = { title: '04 Organisms/SaaS Workspace', component: OrganismCatalog, tags: ['autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof OrganismCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
