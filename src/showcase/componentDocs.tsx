import type { ComponentType } from 'react';
import manifest from '../../design-system.manifest.json';
import { Badge, Grid, Heading, Stack, Text } from '../components';
import { showcaseRegistry } from './registry';

export type ComponentDocumentationProps = {
  componentId: string;
  variant?: string;
  state?: string;
  theme?: 'light' | 'dark';
  motion?: 'none' | 'subtle' | 'expressive';
  disabled?: boolean;
};

export type ComponentDocumentationEntry = {
  id: string;
  title: string;
  description: string;
  variants: string[];
  states: string[];
  whenToUse: string;
  whenNotToUse: string;
  snippet: string;
  Render: ComponentType;
};

const usageByCategory: Record<string, [string, string]> = {
  action: ['Quando a pessoa precisa iniciar uma ação inequívoca.', 'Para navegação passiva ou conteúdo sem ação.'],
  form: ['Para coletar ou editar informação com rótulo e feedback.', 'Sem label, validação ou propósito explícito.'],
  feedback: [
    'Para comunicar estado, progresso, sucesso ou falha.',
    'Como decoração ou substituto de instruções permanentes.',
  ],
  navigation: ['Para orientar deslocamento entre contextos estáveis.', 'Para ações que alteram dados imediatamente.'],
  agentic: [
    'Para tornar execução, decisão e recuperação observáveis.',
    'Para expor raciocínio interno bruto ou esconder consequências.',
  ],
  trust: [
    'Quando origem, permissão ou rastreabilidade afetam confiança.',
    'Para metadados irrelevantes à decisão atual.',
  ],
};

export const componentDocumentationRegistry: ComponentDocumentationEntry[] = showcaseRegistry.map((entry) => {
  const [whenToUse, whenNotToUse] = usageByCategory[entry.category] ?? [
    `Quando ${entry.name} resolve uma necessidade recorrente descrita pelo sistema.`,
    'Quando uma composição existente oferece o mesmo resultado com menos complexidade.',
  ];
  return {
    id: entry.id,
    title: entry.name,
    description: entry.description,
    variants: [...entry.variants],
    states: [...entry.states],
    whenToUse,
    whenNotToUse,
    snippet: `import { ${entry.primaryExport} } from '@improve-business/design-system';`,
    Render: entry.Render,
  };
});

const documentationById = new Map(componentDocumentationRegistry.map((entry) => [entry.id, entry]));

export function ComponentDocumentation({
  componentId,
  variant,
  state,
  theme = 'light',
  motion = 'subtle',
  disabled = false,
}: ComponentDocumentationProps) {
  const entry = documentationById.get(componentId);
  if (!entry) throw new Error(`Unknown component documentation id: ${componentId}`);
  const Render = entry.Render;
  const level = manifest.components.find((item) => item.id === componentId)?.atomicLevel;
  return (
    <article
      className="showcase-component-doc"
      data-ibs-theme={theme}
      data-motion={motion}
      data-state={state}
      data-disabled={disabled || undefined}
    >
      <header className="showcase-component-doc__header">
        <Stack gap={3}>
          <Badge tone={entry.id.includes('agent') ? 'info' : 'brand'}>{level}</Badge>
          <Heading level={1} size={2}>
            {entry.title}
          </Heading>
          <Text tone="muted">{entry.description}</Text>
        </Stack>
        <Grid columns={2} gap={4}>
          <div>
            <strong>Quando usar</strong>
            <Text size="sm">{entry.whenToUse}</Text>
          </div>
          <div>
            <strong>Quando não usar</strong>
            <Text size="sm">{entry.whenNotToUse}</Text>
          </div>
        </Grid>
      </header>
      <section className="showcase-component-doc__preview" aria-label={`Playground de ${entry.title}`}>
        <div className={`ibs-motion--${motion}`} data-variant={variant} data-state={state}>
          <Render />
        </div>
      </section>
      <footer className="showcase-component-doc__contract">
        <div>
          <strong>Variantes</strong>
          <Text size="sm">{entry.variants.join(', ') || 'Sem variantes'}</Text>
        </div>
        <div>
          <strong>Estados</strong>
          <Text size="sm">{entry.states.join(', ') || 'Estado padrão'}</Text>
        </div>
        <pre>
          <code>{entry.snippet}</code>
        </pre>
      </footer>
    </article>
  );
}
