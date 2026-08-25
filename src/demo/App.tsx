import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { Moon, Search, Sun } from 'lucide-react';
import {
  Badge,
  Container,
  Footer,
  Heading,
  Hero,
  IconButton,
  Section,
  SiteHeader,
  Stack,
  Text,
  Tooltip,
} from '../components';
import {
  catalogEntriesByCategory,
  filterCatalogEntries,
  resolveCatalogTargetId,
  type CatalogEntry,
} from '../showcase/catalog';
import { showcaseGroups, showcaseRegistry, showcaseVersion } from '../showcase/registry';
import './demo.css';

type Theme = 'light' | 'dark';

const navigation = [{ label: 'Componentes', href: '#catalogo' }];

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('ibs-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string>(showcaseRegistry[0]?.id ?? 'button');

  const filteredEntries = useMemo(() => filterCatalogEntries(query), [query]);
  const sidebarSections = useMemo(() => catalogEntriesByCategory(filteredEntries), [filteredEntries]);
  const visibleTargetIds = useMemo(() => {
    const ids = new Set<string>();
    for (const entry of filteredEntries) ids.add(resolveCatalogTargetId(entry));
    return ids;
  }, [filteredEntries]);

  useEffect(() => {
    window.localStorage.setItem('ibs-theme', theme);
  }, [theme]);

  useEffect(() => {
    const targets = showcaseRegistry
      .map((component) => document.getElementById(component.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const next = visible[0]?.target.id;
        if (next) setActiveId(next);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleTargetIds]);

  useEffect(() => {
    document.querySelectorAll('[data-active]').forEach((node) => node.removeAttribute('data-active'));
    const anchor = document.getElementById(activeId);
    if (!anchor) return;
    anchor.setAttribute('data-active', '');
    const chunk = anchor.closest('.showcase-stream-chunk');
    chunk?.setAttribute('data-active', '');
    const panel =
      chunk?.querySelector(`[data-specimen-id="${activeId}"]`) ?? chunk?.querySelector('.showcase-panel') ?? null;
    panel?.setAttribute('data-active', '');
  }, [activeId]);

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const themeLabel = `Ativar tema ${nextTheme === 'dark' ? 'escuro' : 'claro'}`;
  const componentCount = showcaseRegistry.length;

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, entry: CatalogEntry) => {
    event.preventDefault();
    const targetId = resolveCatalogTargetId(entry);
    setActiveId(targetId);
    scrollToId(targetId);
    window.history.replaceState(null, '', `#${targetId}`);
  };

  return (
    <div data-ibs-theme={theme}>
      <SiteHeader
        items={navigation}
        utilities={
          <Tooltip label={themeLabel}>
            <IconButton
              aria-pressed={theme === 'dark'}
              label={themeLabel}
              icon={theme === 'light' ? <Moon /> : <Sun />}
              variant="outline"
              onClick={() => setTheme(nextTheme)}
            />
          </Tooltip>
        }
      />
      <main>
        <Hero
          eyebrow={`Improve Design System · v${showcaseVersion}`}
          title="Um sistema. Uma fonte de verdade."
          description={`Catálogo plano de ${componentCount} componentes — manifesto, specimen e contratos para produtos e agentes.`}
          primaryAction={{ label: 'Explorar componentes', href: '#catalogo' }}
        />

        <Section tone="ink" className="showcase-summary">
          <Container>
            <div className="showcase-summary__grid">
              <div>
                <span>{componentCount}</span>
                <Text>componentes</Text>
              </div>
              <div>
                <span>{sidebarSections.length}</span>
                <Text>categorias</Text>
              </div>
              <div>
                <span>2</span>
                <Text>temas</Text>
              </div>
              <div>
                <span>1</span>
                <Text>catálogo plano</Text>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="catalogo" className="showcase-catalog">
          <Container>
            <Stack gap={8}>
              <div className="showcase-catalog__head">
                <Stack gap={4}>
                  <Badge tone="brand">Componentes · v{showcaseVersion}</Badge>
                  <Heading level={2} size={2}>
                    Catálogo
                  </Heading>
                  <Text size="lg" tone="muted">
                    Sidebar com todos os componentes. O item ativo e o painel em tela ficam sincronizados ao rolar.
                  </Text>
                </Stack>
                <div className="showcase-search">
                  <Search aria-hidden="true" />
                  <input
                    aria-label="Buscar componentes"
                    placeholder="Buscar componente ou categoria…"
                    value={query}
                    onChange={(event) => setQuery(event.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="showcase-catalog-layout">
                <aside className="showcase-catalog-index">
                  <span className="showcase-catalog-index__label">Componentes</span>
                  <nav aria-label="Lista de componentes" className="showcase-component-nav">
                    {sidebarSections.length ? (
                      sidebarSections.map((section) => (
                        <div className="showcase-component-nav__group" key={section.category}>
                          <span className="showcase-component-nav__heading">{section.label}</span>
                          {section.entries.map((entry) => {
                            const targetId = resolveCatalogTargetId(entry);
                            return (
                              <a
                                key={entry.id}
                                href={entry.href}
                                aria-current={activeId === targetId ? 'location' : undefined}
                                data-alias={entry.status === 'alias' ? '' : undefined}
                                onClick={(event) => onNavClick(event, entry)}
                              >
                                {entry.name}
                              </a>
                            );
                          })}
                        </div>
                      ))
                    ) : (
                      <Text size="sm" tone="muted">
                        Nenhum resultado.
                      </Text>
                    )}
                  </nav>
                </aside>

                <div className="showcase-catalog-content">
                  {showcaseGroups.map((group) => {
                    const Catalog = group.Render;
                    const visibleIds = group.componentIds.filter((id) => visibleTargetIds.has(id));
                    if (query.trim() && !visibleIds.length) return null;
                    return (
                      <div className="showcase-stream-chunk" key={group.id} data-group={group.id}>
                        {group.componentIds.map((id) => (
                          <div
                            id={id}
                            key={id}
                            className="showcase-stream-anchor"
                            hidden={query.trim() ? !visibleTargetIds.has(id) : undefined}
                            tabIndex={-1}
                          />
                        ))}
                        <Catalog />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer
        description="Design que entende o negócio e transforma com IA de forma profissional."
        links={navigation}
        social={[
          { label: 'GitHub', href: 'https://github.com/guilhermefaj/improve-design-system' },
          { label: 'Improve Business', href: 'https://improve.business/' },
        ]}
      />
    </div>
  );
}
