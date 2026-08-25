import type { ComponentType } from 'react';
import { Stack } from '../components';
import manifest from '../../design-system.manifest.json';
import { componentSpecimens } from './componentSpecimens';
import { SpecimenPanel } from './catalogSpecimens';

type ManifestComponent = (typeof manifest.components)[number];
export type ShowcaseGroupId =
  | 'foundations'
  | 'atoms-core'
  | 'atoms-saas'
  | 'molecules-core'
  | 'molecules-saas'
  | 'organisms-brand'
  | 'agentic'
  | 'organisms-saas'
  | 'presentation';

export type ShowcaseGroup = {
  id: ShowcaseGroupId;
  title: string;
  description: string;
  componentIds: string[];
  Render: ComponentType;
};

export { SpecimenPanel };

/**
 * Builds a group `Render` that streams the individual `componentSpecimens`
 * panels for the group's ids, in order. Each panel already carries its own
 * `id`/`data-specimen-id`, so scroll-spy and search targeting keep working
 * without duplicate anchor elements.
 */
function renderGroup(componentIds: string[]): ComponentType {
  function GroupRender() {
    return (
      <Stack gap={7}>
        {componentIds.map((id) => {
          const Specimen = componentSpecimens[id];
          return Specimen ? <Specimen key={id} /> : null;
        })}
      </Stack>
    );
  }
  return GroupRender;
}

export const showcaseGroups: ShowcaseGroup[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Layout, tipografia, rolagem, proporção, direção e painéis redimensionáveis.',
    componentIds: ['layout', 'typography', 'scroll-area', 'aspect-ratio', 'direction', 'resizable'],
    Render: renderGroup(['layout', 'typography', 'scroll-area', 'aspect-ratio', 'direction', 'resizable']),
  },
  {
    id: 'atoms-core',
    title: 'Core actions',
    description: 'Ações, marca e primitives essenciais.',
    componentIds: ['button', 'logo'],
    Render: renderGroup(['button', 'logo']),
  },
  {
    id: 'atoms-saas',
    title: 'SaaS controls',
    description: 'Controles compactos para produto e dashboards.',
    componentIds: [
      'kbd',
      'button-group',
      'chip',
      'toggle',
      'segmented-control',
      'slider',
      'search-input',
      'password-input',
      'number-input',
      'sparkline',
      'tag',
      'label',
      'marker',
      'item',
      'chart',
      'toggle-group',
    ],
    Render: renderGroup([
      'kbd',
      'button-group',
      'chip',
      'toggle',
      'segmented-control',
      'slider',
      'search-input',
      'password-input',
      'number-input',
      'sparkline',
      'tag',
      'label',
      'marker',
      'item',
      'chart',
      'toggle-group',
    ]),
  },
  {
    id: 'molecules-core',
    title: 'Core patterns',
    description: 'Dados, formulários, feedback e disclosures.',
    componentIds: [
      'card',
      'data-display',
      'form',
      'feedback',
      'overlays',
      'description-list',
      'hover-card',
      'context-menu',
      'collapsible',
      'native-select',
      'input-group',
      'input-otp',
      'table',
      'dropdown-menu',
      'alert-dialog',
      'carousel',
    ],
    Render: renderGroup([
      'card',
      'data-display',
      'form',
      'feedback',
      'overlays',
      'description-list',
      'hover-card',
      'context-menu',
      'collapsible',
      'native-select',
      'input-group',
      'input-otp',
      'table',
      'dropdown-menu',
      'alert-dialog',
      'carousel',
    ]),
  },
  {
    id: 'molecules-saas',
    title: 'SaaS patterns',
    description: 'Seleção, contexto, upload e notificações.',
    componentIds: [
      'empty-state',
      'popover',
      'sheet',
      'stepper',
      'combobox',
      'command-palette',
      'date-picker',
      'file-upload',
      'toast',
      'multi-select',
      'date-range-picker',
      'time-picker',
      'calendar',
      'drawer',
      'attachment',
      'questionnaire',
    ],
    Render: renderGroup([
      'empty-state',
      'popover',
      'sheet',
      'stepper',
      'combobox',
      'command-palette',
      'date-picker',
      'file-upload',
      'toast',
      'multi-select',
      'date-range-picker',
      'time-picker',
      'calendar',
      'drawer',
      'attachment',
      'questionnaire',
    ]),
  },
  {
    id: 'organisms-brand',
    title: 'Brand',
    description: 'Navegação e padrões institucionais.',
    componentIds: ['dialog', 'navigation', 'marketing', 'navigation-menu', 'menubar'],
    Render: renderGroup(['dialog', 'navigation', 'marketing', 'navigation-menu', 'menubar']),
  },
  {
    id: 'organisms-saas',
    title: 'SaaS workspace',
    description: 'Shell, métricas, dados, filtros, preços e atividade.',
    componentIds: [
      'app-shell',
      'sidebar',
      'page-header',
      'metric-card',
      'data-grid',
      'filter-bar',
      'pricing-card',
      'activity-feed',
    ],
    Render: renderGroup([
      'app-shell',
      'sidebar',
      'page-header',
      'metric-card',
      'data-grid',
      'filter-bar',
      'pricing-card',
      'activity-feed',
    ]),
  },
  {
    id: 'agentic',
    title: 'Agentic & Trust',
    description: 'Status, execução, aprovação, artefatos, fontes, permissões, rastreabilidade e handoff.',
    componentIds: [
      'agent-status',
      'streaming-message',
      'agent-error',
      'artifact-card',
      'citation-list',
      'permission-scope',
      'tool-call-card',
      'approval-card',
      'run-timeline',
      'plan-steps',
      'agent-handoff',
      'generated-ui-boundary',
      'mcp-app-frame',
      'trace-viewer',
      'bubble',
      'message',
      'message-scroller',
    ],
    Render: renderGroup([
      'agent-status',
      'streaming-message',
      'agent-error',
      'artifact-card',
      'citation-list',
      'permission-scope',
      'tool-call-card',
      'approval-card',
      'run-timeline',
      'plan-steps',
      'agent-handoff',
      'generated-ui-boundary',
      'mcp-app-frame',
      'trace-viewer',
      'bubble',
      'message',
      'message-scroller',
    ]),
  },
  {
    id: 'presentation',
    title: 'Presentation',
    description: 'Primitivos 16:9 para decisões e narrativas.',
    componentIds: ['slides'],
    Render: renderGroup(['slides']),
  },
];

const manifestById = new Map(manifest.components.map((component) => [component.id, component]));
export const showcaseRegistry = showcaseGroups.flatMap((group) =>
  group.componentIds.map((id) => ({
    ...(manifestById.get(id) as ManifestComponent),
    groupId: group.id,
    Render: group.Render,
  })),
);
export const showcaseVersion = manifest.version;
