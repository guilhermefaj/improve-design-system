import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Boxes, Component, Layers3 } from 'lucide-react';
import { Badge, ButtonLink, Container, Grid, Heading, Section, Stack, Text } from '../components';

const levels = [
  { icon: <Box />, title: 'Foundations', count: '4 pilares', description: 'Marca, tokens, tipografia, layout e movimento.' },
  { icon: <Component />, title: 'Atoms', count: '20+', description: 'Controles indivisíveis, legíveis e acessíveis.' },
  { icon: <Boxes />, title: 'Molecules', count: '20+', description: 'Combinações simples com uma responsabilidade clara.' },
  { icon: <Layers3 />, title: 'Organisms', count: '15+', description: 'Seções completas para produto, SaaS e experiências agentic.' },
];

function Introduction() {
  return <><Section><Container><Stack gap={12}><Stack gap={5}><Badge tone="brand">Improve DS 0.3</Badge><Heading level={1} size={1}>Uma base clean para produtos que entendem o negócio.</Heading><Text size="lg" tone="muted">54 contratos de componentes para landing pages, SaaS, apresentações e interfaces agentic. React é a implementação; tokens e manifesto são a fonte de verdade.</Text><div><ButtonLink href="?path=/story/02-atoms-saas-controls--catalog" variant="primary" size="lg">Explorar componentes</ButtonLink></div></Stack><Grid columns={4}>{levels.map((level) => <article className="ibs-card ibs-card--interactive" key={level.title}><div className="ibs-card__body"><Stack gap={4}><span style={{ color: 'var(--ibs-color-secondary)', width: 28 }}>{level.icon}</span><div><Heading level={2} size={4}>{level.title}</Heading><Text size="sm" tone="muted">{level.count}</Text></div><Text>{level.description}</Text></Stack></div></article>)}</Grid><div style={{ padding: 'var(--ibs-space-6)', borderRadius: 'var(--ibs-radius-lg)', background: 'var(--ibs-color-surface)' }}><Heading level={2} size={3}>Como navegar</Heading><Text tone="muted" style={{ marginTop: 12 }}>Comece pelas Foundations, escolha componentes pela camada Atomic e use os painéis Controls, Accessibility e Docs para verificar cada estado. Templates e páginas ainda não fazem parte desta versão.</Text></div></Stack></Container></Section></>;
}

const meta = { title: '00 Introducao/Comece aqui', component: Introduction, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Introduction>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
