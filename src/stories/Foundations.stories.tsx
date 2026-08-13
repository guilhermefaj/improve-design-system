import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Eyebrow, Grid, Heading, Section, Stack, Text } from '../components';

function Foundations() {
  return <Section><Container><Stack gap={12}><Stack gap={4}><Eyebrow>Foundations</Eyebrow><Heading level={1} size={2}>A identidade Improve em código.</Heading><Text size="lg" tone="muted">Tokens semânticos conectam marca, interface e acessibilidade.</Text></Stack><Grid columns={4} gap={4}>{[
    ['Orange', '#f2703e'], ['Purple', '#483c8f'], ['Dark gray', '#4f4f51'], ['Cream', '#f5f2f0'],
  ].map(([name, value]) => <div key={name} style={{ border: '1px solid var(--ibs-color-border)', borderRadius: 'var(--ibs-radius-lg)', overflow: 'hidden' }}><div style={{ height: 120, background: value }} /><div style={{ padding: 16 }}><strong>{name}</strong><br /><code>{value}</code></div></div>)}</Grid><div><Heading level={2} size={1}>Design que entende o negócio.</Heading><Text size="lg" style={{ marginTop: 24 }}>Inter na interface. Clash Display nos títulos. Expressão com intenção, nunca como ruído.</Text></div></Stack></Container></Section>;
}

const meta = { title: '01 Foundations/Overview', component: Foundations, tags: ['autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Foundations>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
