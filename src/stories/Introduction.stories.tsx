import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Boxes, Component, Layers3 } from 'lucide-react';
import { Badge, ButtonLink, Container, Grid, Heading, Section, Stack, Text } from '../components';
import { showcaseRegistry, showcaseVersion } from '../showcase/registry';

const levels = [
  {
    icon: <Box />,
    title: 'Foundations',
    level: 'foundation',
    description: 'Marca, tokens, tipografia, layout e movimento.',
  },
  { icon: <Component />, title: 'Atoms', level: 'atom', description: 'Controles indivisíveis, legíveis e acessíveis.' },
  {
    icon: <Boxes />,
    title: 'Molecules',
    level: 'molecule',
    description: 'Combinações simples com uma responsabilidade clara.',
  },
  {
    icon: <Layers3 />,
    title: 'Organisms',
    level: 'organism',
    description: 'Seções completas para produto, SaaS e experiências agentic.',
  },
];

function Introduction() {
  return (
    <Section>
      <Container>
        <Stack gap={12}>
          <Stack gap={5}>
            <Badge tone="brand">Improve DS {showcaseVersion}</Badge>
            <Heading level={1} size={1}>
              Uma base clean para produtos que entendem o negócio.
            </Heading>
            <Text size="lg" tone="muted">
              {showcaseRegistry.length} contratos para landing pages, SaaS, apresentações e interfaces agentic. Specimen
              e Storybook consomem o mesmo registro compartilhado.
            </Text>
            <div>
              <ButtonLink href="?path=/story/01-foundations-overview--overview" variant="primary" size="lg">
                Explorar o sistema
              </ButtonLink>
            </div>
          </Stack>
          <Grid columns={4}>
            {levels.map((level) => (
              <article className="ibs-card ibs-card--interactive" key={level.title}>
                <div className="ibs-card__body">
                  <Stack gap={4}>
                    <span style={{ color: 'var(--ibs-color-secondary)', width: 28 }}>{level.icon}</span>
                    <div>
                      <Heading level={2} size={4}>
                        {level.title}
                      </Heading>
                      <Text size="sm" tone="muted">
                        {showcaseRegistry.filter((item) => item.atomicLevel === level.level).length} contratos
                      </Text>
                    </div>
                    <Text>{level.description}</Text>
                  </Stack>
                </div>
              </article>
            ))}
          </Grid>
          <div
            style={{
              padding: 'var(--ibs-space-6)',
              borderRadius: 'var(--ibs-radius-lg)',
              background: 'var(--ibs-color-surface)',
            }}
          >
            <Heading level={2} size={3}>
              Como navegar
            </Heading>
            <Text tone="muted" style={{ marginTop: 12 }}>
              Comece pelas Foundations, escolha componentes pela camada Atomic e use Controls e Accessibility para
              verificar cada estado.
            </Text>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}

const meta = {
  title: '00 Introducao/Comece aqui',
  component: Introduction,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Introduction>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
