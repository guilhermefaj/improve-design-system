import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Moon, Search, Sun } from 'lucide-react';
import {
  Badge,
  ButtonLink,
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
import { showcaseGroups, showcaseRegistry, showcaseVersion, type ShowcaseGroupId } from '../showcase/registry';
import './demo.css';

type Theme = 'light' | 'dark';

const STORYBOOK_HREF = 'http://127.0.0.1:6006';

const navigation = [
  { label: 'Foundations', href: '#foundations' },
  { label: 'Atoms', href: '#atoms-core' },
  { label: 'Molecules', href: '#molecules-core' },
  { label: 'Organisms', href: '#organisms-brand' },
  { label: 'Agentic', href: '#agentic' },
  { label: 'Presentation', href: '#presentation' },
];

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('ibs-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<ShowcaseGroupId>('foundations');

  const visibleGroups = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) return showcaseGroups;
    return showcaseGroups.filter((group) => {
      const components = showcaseRegistry.filter((item) => item.groupId === group.id);
      return [group.title, group.description, ...components.flatMap((item) => [item.name, item.description, item.id])]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(normalized);
    });
  }, [query]);

  useEffect(() => {
    window.localStorage.setItem('ibs-theme', theme);
  }, [theme]);

  useEffect(() => {
    const elements = visibleGroups
      .map((group) => document.getElementById(group.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        const next = visible[0]?.target.id as ShowcaseGroupId | undefined;
        if (next) setActiveGroup(next);
      },
      { rootMargin: '-96px 0px -62% 0px', threshold: [0, 0.08, 0.25] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleGroups]);

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const themeLabel = `Ativar tema ${nextTheme === 'dark' ? 'escuro' : 'claro'}`;
  const componentCount = showcaseRegistry.length;

  return (
    <div data-ibs-theme={theme}>
      <SiteHeader
        items={navigation}
        action={{ label: 'Storybook', href: STORYBOOK_HREF }}
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
          description={`Specimen editorial e Storybook técnico compartilham o mesmo registro de ${componentCount} componentes, tokens e exemplos — de landing pages a SaaS e experiências agentic.`}
          primaryAction={{ label: 'Explorar o sistema', href: '#catalogo' }}
          secondaryAction={{ label: 'Abrir Storybook', href: STORYBOOK_HREF }}
        />

        <Section tone="ink" className="showcase-summary">
          <Container>
            <div className="showcase-summary__grid">
              <div>
                <span>{componentCount}</span>
                <Text>contratos de componentes</Text>
              </div>
              <div>
                <span>4</span>
                <Text>camadas Atomic</Text>
              </div>
              <div>
                <span>2</span>
                <Text>temas complementares</Text>
              </div>
              <div>
                <span>1</span>
                <Text>registro compartilhado</Text>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="catalogo" className="showcase-catalog">
          <Container>
            <Stack gap={10}>
              <div className="showcase-catalog__head">
                <Stack gap={4}>
                  <Badge tone="brand">Catálogo v{showcaseVersion}</Badge>
                  <Heading level={2} size={2}>
                    Do fundamento ao produto.
                  </Heading>
                  <Text size="lg" tone="muted">
                    Busque por componente, responsabilidade ou padrão. Cada seção abaixo é a mesma usada pelo Storybook.
                  </Text>
                </Stack>
                <div className="showcase-search">
                  <Search aria-hidden="true" />
                  <input
                    aria-label="Buscar no Design System"
                    placeholder="Buscar componente ou padrão…"
                    value={query}
                    onChange={(event) => setQuery(event.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="showcase-catalog-layout">
                <aside className="showcase-catalog-index">
                  <span className="showcase-catalog-index__label">Explorar</span>
                  <nav aria-label="Seções do catálogo">
                    {showcaseGroups.map((group, index) => (
                      <a
                        href={`#${group.id}`}
                        key={group.id}
                        aria-current={activeGroup === group.id ? 'location' : undefined}
                        onClick={() => setActiveGroup(group.id)}
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {group.title}
                      </a>
                    ))}
                  </nav>
                </aside>

                <div className="showcase-catalog-content">
                  {visibleGroups.length ? (
                    visibleGroups.map((group) => {
                      const components = showcaseRegistry.filter((item) => item.groupId === group.id);
                      const Catalog = group.Render;
                      const ordinal = showcaseGroups.findIndex((item) => item.id === group.id) + 1;
                      return (
                        <Section id={group.id} className="showcase-group" key={group.id}>
                          <div className="showcase-group__head">
                            <Stack gap={3}>
                              <span className="showcase-group__index">{String(ordinal).padStart(2, '0')}</span>
                              <Heading level={2} size={2}>
                                {group.title}
                              </Heading>
                              <Text tone="muted">{group.description}</Text>
                            </Stack>
                            <div className="showcase-component-list" aria-label="Componentes desta seção">
                              {components.map((component) => (
                                <span key={component.id}>{component.name}</span>
                              ))}
                            </div>
                          </div>
                          <Catalog />
                        </Section>
                      );
                    })
                  ) : (
                    <div className="showcase-empty">
                      <Heading level={2} size={3}>
                        Nenhum componente encontrado.
                      </Heading>
                      <Text tone="muted">Tente buscar por “form”, “agent”, “data” ou “button”.</Text>
                    </div>
                  )}
                </div>
              </div>
            </Stack>
          </Container>
        </Section>

        <Section tone="brand" className="demo-cta">
          <Container>
            <div className="showcase-release">
              <div>
                <Heading level={2}>Pronto para construir com consistência.</Heading>
                <Text>
                  Use o manifesto para agentes, o Storybook para inspeção e este specimen para direção visual.
                </Text>
              </div>
              <ButtonLink href={STORYBOOK_HREF} variant="solid" trailingIcon={<ArrowRight />}>
                Abrir catálogo técnico
              </ButtonLink>
            </div>
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
