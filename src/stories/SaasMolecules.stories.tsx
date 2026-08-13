import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command, Plus } from 'lucide-react';
import { Button, Cluster, Combobox, CommandPalette, DatePicker, EmptyState, FileUpload, Grid, Popover, Sheet, Stack, Stepper, Toast } from '../components';

function MoleculeCatalog() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState('growth');
  return <Stack gap={8}>
    <Stepper active={step} onStepChange={setStep} items={[{ id: 'company', label: 'Empresa' }, { id: 'plan', label: 'Plano', description: 'Escolha o melhor cenário' }, { id: 'review', label: 'Revisão' }]} />
    <Grid columns={2}><Combobox label="Plano" value={plan} onValueChange={setPlan} options={[{ value: 'starter', label: 'Starter', description: 'Até 5 usuários' }, { value: 'growth', label: 'Growth', description: 'Até 30 usuários' }, { value: 'enterprise', label: 'Enterprise', description: 'Governança avançada' }]} /><DatePicker label="Início do contrato" hint="Você poderá alterar depois." /></Grid>
    <FileUpload accept=".pdf,.csv,.xlsx" multiple onFiles={() => undefined} />
    <Cluster><Popover trigger={<Button variant="outline">Abrir popover</Button>} title="Contexto rápido">Informação complementar sem interromper o fluxo.</Popover><Sheet trigger={<Button variant="outline">Abrir painel</Button>} title="Detalhes da conta" description="Edite sem sair da página." footer={<Button fullWidth>Salvar alterações</Button>}><EmptyState compact title="Painel lateral" description="Ideal para edição contextual e inspeção." /></Sheet><CommandPalette trigger={<Button leadingIcon={<Command />}>Abrir comandos</Button>} items={[{ id: 'new', label: 'Criar projeto', shortcut: 'N', icon: <Plus /> }, { id: 'search', label: 'Buscar clientes', shortcut: '/' }]} /></Cluster>
    <Grid columns={2}><Toast title="Alterações salvas" description="As permissões foram atualizadas." tone="success" onDismiss={() => undefined} /><Toast title="Falha na sincronização" description="Tente novamente em alguns instantes." tone="danger" action={<Button size="sm" variant="outline">Repetir</Button>} /></Grid>
  </Stack>;
}

const meta = { title: '03 Molecules/SaaS Patterns', component: MoleculeCatalog, tags: ['autodocs'] } satisfies Meta<typeof MoleculeCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
