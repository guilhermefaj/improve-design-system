import { useMemo, useState } from 'react';
import { ArrowRight, Moon, Search, Sun } from 'lucide-react';
import { Badge, ButtonLink, Container, Footer, Heading, Hero, IconButton, Section, SiteHeader, Stack, Text, Tooltip } from '../components';
import { showcaseGroups, showcaseRegistry, showcaseVersion } from '../showcase/registry';
import './demo.css';

const navigation = [
  { label: 'Foundations', href: '#foundations', current: true },
  { label: 'Atoms', href: '#atoms-core' },
  { label: 'Molecules', href: '#molecules-core' },
  { label: 'Organisms', href: '#organisms-brand' },
  { label: 'Agentic', href: '#agentic' },
  { label: 'Presentation', href: '#presentation' },
];

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [query, setQuery] = useState('');
  const visibleGroups = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) return showcaseGroups;
    return showcaseGroups.filter((group) => {
      const components = showcaseRegistry.filter((item) => item.groupId === group.id);
      return [group.title, group.description, ...components.flatMap((item) => [item.name, item.description, item.id])].join(' ').toLocaleLowerCase('pt-BR').includes(normalized);
    });
  }, [query]);

  return <div data-ibs-theme={theme}>
    <SiteHeader items={navigation} action={{ label: 'Storybook', href: './storybook/' }} />
    <main>
      <Hero eyebrow={`Improve Design System · v${showcaseVersion}`} title="Um sistema. Uma fonte de verdade." description="Specimen editorial e Storybook técnico compartilham o mesmo registro de 54 componentes, tokens e exemplos — de landing pages a SaaS e experiências agentic." primaryAction={{ label: 'Explorar o sistema', href: '#catalogo' }} secondaryAction={{ label: 'Abrir Storybook', href: './storybook/' }} />

      <Section tone="ink" className="showcase-summary">
        <Container><div className="showcase-summary__grid"><div><span>54</span><Text>contratos de componentes</Text></div><div><span>4</span><Text>camadas Atomic</Text></div><div><span>2</span><Text>temas complementares</Text></div><div><span>1</span><Text>registro compartilhado</Text></div></div></Container>
      </Section>

      <Section id="catalogo" className="showcase-catalog">
        <Container><Stack gap={10}>
          <div className="showcase-catalog__head"><Stack gap={4}><Badge tone="brand">Catálogo v{showcaseVersion}</Badge><Heading level={2} size={2}>Do fundamento ao produto.</Heading><Text size="lg" tone="muted">Busque por componente, responsabilidade ou padrão. Cada seção abaixo é a mesma usada pelo Storybook.</Text></Stack><div className="showcase-search"><Search aria-hidden="true" /><input aria-label="Buscar no Design System" placeholder="Buscar componente ou padrão…" value={query} onChange={(event) => setQuery(event.currentTarget.value)} /><Tooltip label={`Ativar tema ${theme === 'light' ? 'escuro' : 'claro'}`}><IconButton label={`Ativar tema ${theme === 'light' ? 'escuro' : 'claro'}`} icon={theme === 'light' ? <Moon /> : <Sun />} variant="outline" onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} /></Tooltip></div></div>
          <nav className="showcase-anchor-nav" aria-label="Seções do catálogo">{showcaseGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}</nav>
          {visibleGroups.length ? visibleGroups.map((group, index) => {
            const components = showcaseRegistry.filter((item) => item.groupId === group.id);
            const Catalog = group.Render;
            return <Section id={group.id} tone={index % 2 === 0 ? 'warm' : 'canvas'} className="showcase-group" key={group.id}><div className="showcase-group__head"><Stack gap={3}><span className="showcase-group__index">{String(index + 1).padStart(2, '0')}</span><Heading level={2} size={2}>{group.title}</Heading><Text tone="muted">{group.description}</Text></Stack><div className="showcase-component-list" aria-label="Componentes desta seção">{components.map((component) => <span key={component.id}>{component.name}</span>)}</div></div><Catalog /></Section>;
          }) : <div className="showcase-empty"><Heading level={2} size={3}>Nenhum componente encontrado.</Heading><Text tone="muted">Tente buscar por “form”, “agent”, “data” ou “button”.</Text></div>}
        </Stack></Container>
      </Section>

      <Section tone="brand" className="demo-cta"><Container><div className="showcase-release"><div><Heading level={2}>Pronto para construir com consistência.</Heading><Text>Use o manifesto para agentes, o Storybook para inspeção e este specimen para direção visual.</Text></div><ButtonLink href="./storybook/" variant="solid" trailingIcon={<ArrowRight />}>Abrir catálogo técnico</ButtonLink></div></Container></Section>
    </main>
    <Footer description="Design que entende o negócio e transforma com IA de forma profissional." links={navigation.map((item) => ({ label: item.label, href: item.href }))} social={[{ label: 'GitHub', href: 'https://github.com/guilhermefaj/improve-design-system' }, { label: 'Improve Business', href: 'https://improve.business/' }]} />
  </div>;
}
