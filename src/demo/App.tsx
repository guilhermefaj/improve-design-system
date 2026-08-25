import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { Moon, Search, Sun } from 'lucide-react';
import { IconButton, ImproveLogo, Text, Tooltip } from '../components';
import {
  catalogEntriesByCategory,
  filterCatalogEntries,
  type CatalogEntry,
} from '../showcase/catalog';
import { componentSpecimens } from '../showcase/componentSpecimens';
import { showcaseVersion } from '../showcase/registry';
import './demo.css';
import '../showcase/showcase.css';

type Theme = 'light' | 'dark';

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
  const pinnedIdRef = useRef<string | null>(null);

  const filteredEntries = useMemo(() => filterCatalogEntries(query), [query]);
  const sidebarSections = useMemo(() => catalogEntriesByCategory(filteredEntries), [filteredEntries]);
  const orderedEntries = useMemo(
    () => sidebarSections.flatMap((section) => section.entries),
    [sidebarSections],
  );
  const [activeId, setActiveId] = useState<string>(() => orderedEntries[0]?.id ?? 'button');
  const resolvedActiveId = orderedEntries.some((entry) => entry.id === activeId)
    ? activeId
    : (orderedEntries[0]?.id ?? activeId);

  useEffect(() => {
    window.localStorage.setItem('ibs-theme', theme);
  }, [theme]);

  useEffect(() => {
    const targets = orderedEntries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const pinned = pinnedIdRef.current;
        if (pinned) {
          const pinnedVisible = visible.some((entry) => entry.target.id === pinned);
          setActiveId(pinned);
          if (pinnedVisible) pinnedIdRef.current = null;
          return;
        }
        const next = visible[0]?.target.id;
        if (next) setActiveId(next);
      },
      { rootMargin: '-12% 0px -62% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [orderedEntries]);

  useEffect(() => {
    document.querySelectorAll('.showcase-panel[data-active]').forEach((node) => node.removeAttribute('data-active'));
    document.getElementById(resolvedActiveId)?.setAttribute('data-active', '');
  }, [resolvedActiveId]);

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const themeLabel = `Ativar tema ${nextTheme === 'dark' ? 'escuro' : 'claro'}`;

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, entry: CatalogEntry) => {
    event.preventDefault();
    pinnedIdRef.current = entry.id;
    setActiveId(entry.id);
    scrollToId(entry.id);
    window.history.replaceState(null, '', `#${entry.id}`);
  };

  return (
    <div className="showcase-app" data-ibs-theme={theme}>
      <aside className="showcase-sidebar">
        <div className="showcase-sidebar__brand">
          <ImproveLogo href="#catalogo" compact />
          <div className="showcase-sidebar__brand-text">
            <h1 className="showcase-sidebar__title">Improve</h1>
            <span className="showcase-sidebar__meta">Design System · v{showcaseVersion}</span>
          </div>
          <Tooltip label={themeLabel}>
            <IconButton
              aria-pressed={theme === 'dark'}
              label={themeLabel}
              icon={theme === 'light' ? <Moon /> : <Sun />}
              variant="outline"
              size="sm"
              onClick={() => setTheme(nextTheme)}
            />
          </Tooltip>
        </div>

        <div className="showcase-search">
          <Search aria-hidden="true" />
          <input
            aria-label="Buscar componentes"
            placeholder="Buscar componente…"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </div>

        <nav aria-label="Lista de componentes" className="showcase-component-nav" id="catalogo">
          {sidebarSections.length ? (
            sidebarSections.map((section) => (
              <div className="showcase-component-nav__group" key={section.category}>
                <span className="showcase-component-nav__heading">{section.label}</span>
                {section.entries.map((entry) => (
                  <a
                    key={entry.id}
                    href={`#${entry.id}`}
                    aria-current={resolvedActiveId === entry.id ? 'location' : undefined}
                    onClick={(event) => onNavClick(event, entry)}
                  >
                    {entry.name}
                  </a>
                ))}
              </div>
            ))
          ) : (
            <Text size="sm" tone="muted">
              Nenhum resultado.
            </Text>
          )}
        </nav>
      </aside>

      <main className="showcase-main">
        <div className="showcase-catalog-content">
          {orderedEntries.map((entry) => {
            const Specimen = componentSpecimens[entry.id];
            if (!Specimen) return null;
            return <Specimen key={entry.id} />;
          })}
        </div>
      </main>
    </div>
  );
}
