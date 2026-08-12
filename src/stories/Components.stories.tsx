import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight } from 'lucide-react';
import { Alert, Badge, Button, Checkbox, Cluster, FormField, Input, Stack, Switch } from '../components';

function ComponentSet() {
  return <Stack gap={8}><Cluster><Button trailingIcon={<ArrowRight />}>Continuar</Button><Button variant="primary">Começar agora</Button><Button variant="outline">Saiba mais</Button><Button variant="ghost">Cancelar</Button></Cluster><Cluster><Badge>Neutro</Badge><Badge tone="brand">Em evolução</Badge><Badge tone="success">Ativo</Badge><Badge tone="info">Novo</Badge></Cluster><div style={{ maxWidth: 420 }}><Stack gap={5}><FormField label="Empresa" hint="Como devemos identificar sua organização?"><Input placeholder="Nome da empresa" /></FormField><Checkbox label="Aceito receber um diagnóstico inicial" defaultChecked /><Switch label="Incluir recomendações com IA" defaultChecked /></Stack></div><Alert tone="success" title="Diagnóstico concluído">Encontramos três oportunidades de alto impacto.</Alert></Stack>;
}

const meta = { title: 'Improve DS/Components', component: ComponentSet } satisfies Meta<typeof ComponentSet>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Core: Story = {};
