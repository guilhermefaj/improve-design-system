import manifest from '../../design-system.manifest.json';

export type CatalogStatus = 'stable' | 'planned' | 'alias';

export type CatalogCategory =
  | 'foundation'
  | 'action'
  | 'form'
  | 'feedback'
  | 'data-display'
  | 'navigation'
  | 'overlay'
  | 'marketing'
  | 'presentation'
  | 'agentic'
  | 'trust'
  | 'saas';

export type CatalogEntry = {
  id: string;
  name: string;
  href: string;
  category: CatalogCategory;
  status: CatalogStatus;
  description: string;
  aliasOf?: string;
  improveOnly?: boolean;
};

/** Display order and labels for sidebar sections (shadcn-like). */
export const categoryOrder: CatalogCategory[] = [
  'foundation',
  'action',
  'form',
  'feedback',
  'data-display',
  'navigation',
  'overlay',
  'saas',
  'marketing',
  'presentation',
  'agentic',
  'trust',
];

export const categoryLabels: Record<CatalogCategory, string> = {
  foundation: 'Foundation',
  action: 'Action',
  form: 'Form',
  feedback: 'Feedback',
  'data-display': 'Data display',
  navigation: 'Navigation',
  overlay: 'Overlay',
  saas: 'SaaS',
  marketing: 'Marketing',
  presentation: 'Presentation',
  agentic: 'Agentic',
  trust: 'Trust',
};

const improveOnlyIds = new Set([
  'logo',
  'chip',
  'tag',
  'search-input',
  'password-input',
  'number-input',
  'sparkline',
  'segmented-control',
  'stepper',
  'multi-select',
  'date-range-picker',
  'time-picker',
  'file-upload',
  'app-shell',
  'page-header',
  'metric-card',
  'data-grid',
  'filter-bar',
  'pricing-card',
  'activity-feed',
  'hero',
  'feature-card',
  'ecosystem-card',
  'service-panel',
  'logo-cloud',
  'site-header',
  'footer',
  'action-menu',
  'select-menu',
  'slides',
  'agent-status',
  'streaming-message',
  'tool-call-card',
  'approval-card',
  'run-timeline',
  'agent-error',
  'plan-steps',
  'artifact-card',
  'citation-list',
  'permission-scope',
  'agent-handoff',
  'generated-ui-boundary',
  'mcp-app-frame',
  'trace-viewer',
  'empty-state',
  'command-palette',
  'marketing',
  'navigation',
  'layout',
  'typography',
]);

const primaryEntries: CatalogEntry[] = manifest.components.map((component) => ({
  id: component.id,
  name: component.name,
  href: `#${component.id}`,
  category: component.category as CatalogCategory,
  status: 'stable' as const,
  description: component.description,
  improveOnly: improveOnlyIds.has(component.id),
}));

/** Canonical catalog only — no alias duplicates in the specimen sidebar. */
export const catalogEntries: CatalogEntry[] = primaryEntries;

export const catalogById = new Map(catalogEntries.map((entry) => [entry.id, entry]));

export function resolveCatalogTargetId(entry: CatalogEntry): string {
  return entry.id;
}

export function navigableCatalogEntries(): CatalogEntry[] {
  return catalogEntries.filter((entry) => entry.status === 'stable');
}

export function catalogEntriesByCategory(entries: CatalogEntry[] = navigableCatalogEntries()): Array<{
  category: CatalogCategory;
  label: string;
  entries: CatalogEntry[];
}> {
  const byCategory = new Map<CatalogCategory, CatalogEntry[]>();
  for (const entry of entries) {
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }
  return categoryOrder
    .filter((category) => byCategory.has(category))
    .map((category) => ({
      category,
      label: categoryLabels[category],
      entries: (byCategory.get(category) ?? []).slice().sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    }));
}

export function filterCatalogEntries(
  query: string,
  entries: CatalogEntry[] = navigableCatalogEntries(),
): CatalogEntry[] {
  const normalized = query.trim().toLocaleLowerCase('pt-BR');
  if (!normalized) return entries;
  return entries.filter((entry) =>
    [entry.name, entry.description, entry.id, entry.category]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('pt-BR')
      .includes(normalized),
  );
}
