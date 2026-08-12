import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from './Button';
import { Container, Stack } from './Layout';
import { Eyebrow, Heading, Text } from './Typography';

export function Hero({ eyebrow, title, description, primaryAction, secondaryAction }: { eyebrow?: string; title: ReactNode; description: ReactNode; primaryAction: { label: string; href: string }; secondaryAction?: { label: string; href: string } }) {
  return <section className="ibs-hero"><Container className="ibs-hero__grid"><Stack gap={6}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<Heading level={1} size={1} className="ibs-hero__headline">{title}</Heading></Stack><Stack gap={6} className="ibs-hero__aside"><Text size="lg">{description}</Text><div className="ibs-cluster"><ButtonLink href={primaryAction.href} variant="primary" size="lg" trailingIcon={<ArrowUpRight />}>{primaryAction.label}</ButtonLink>{secondaryAction && <ButtonLink href={secondaryAction.href} variant="ghost" size="lg">{secondaryAction.label}</ButtonLink>}</div></Stack></Container></section>;
}

export function FeatureCard({ icon, title, description, href = '#', linkLabel = 'Ver mais' }: { icon: ReactNode; title: string; description?: string; href?: string; linkLabel?: string }) {
  return <article className="ibs-feature-card"><Stack gap={6}>{icon}<div><Heading level={3} size={4}>{title}</Heading>{description && <Text tone="muted" style={{ marginTop: 'var(--ibs-space-3)' }}>{description}</Text>}</div></Stack><a className="ibs-feature-card__link" href={href}>{linkLabel}<ArrowUpRight aria-hidden="true" size={17} /></a></article>;
}

export function EcosystemCard({ accent = 'brand', title, description }: { accent?: 'brand' | 'strategy' | 'ux' | 'technology' | 'implementation' | 'talent' | 'events'; title: string; description: string }) {
  const accentValue = accent === 'brand' ? 'var(--ibs-color-brand)' : `var(--ibs-accent-${accent})`;
  return <article className="ibs-ecosystem-card" style={{ '--ibs-card-accent': accentValue } as CSSProperties}><div className="ibs-ecosystem-card__body"><Heading level={3} size={4}>{title}</Heading><Text tone="muted" size="sm" style={{ marginTop: 'var(--ibs-space-2)' }}>{description}</Text></div></article>;
}

export function ServicePanel({ title, accent = 'var(--ibs-color-brand)', items }: { title: string; accent?: string; items: Array<{ icon: ReactNode; label: string }> }) {
  return <div><Heading level={3} size={4} className="ibs-service-panel__title" style={{ '--ibs-panel-accent': accent } as CSSProperties}>{title}</Heading><div className="ibs-service-panel">{items.map((item) => <div className="ibs-service-panel__item" key={item.label}>{item.icon}<span>{item.label}</span></div>)}</div></div>;
}

export function LogoCloud({ labels, label = 'Empresas que confiam na Improve' }: { labels: string[]; label?: string }) {
  return <div className="ibs-logo-cloud" aria-label={label}>{labels.map((item) => <div className="ibs-logo-cloud__item" key={item}>{item}</div>)}</div>;
}
