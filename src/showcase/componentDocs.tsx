import type { ComponentType } from 'react';
import { showcaseRegistry } from './registry';

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
