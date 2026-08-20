import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { MotionPreset } from './Button';
import { ButtonLink } from './Button';
import { Container, Stack } from './Layout';
import { Eyebrow, Heading, Text } from './Typography';

export type MarketingAction = { label: string; href: string };
export type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  titleLevel?: 1 | 2 | 3;
  description: ReactNode;
  primaryAction: MarketingAction;
  secondaryAction?: MarketingAction;
};
export type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  motion?: MotionPreset;
};
export type EcosystemCardAccent = 'brand' | 'strategy' | 'ux' | 'technology' | 'implementation' | 'talent' | 'events';
export type EcosystemCardProps = {
  accent?: EcosystemCardAccent;
  title: string;
  description: string;
  motion?: MotionPreset;
};
export type ServicePanelAccent =
  'brand' | 'secondary' | 'strategy' | 'ux' | 'technology' | 'implementation' | 'talent' | 'events';
export type ServicePanelItem = { icon: ReactNode; label: string };
export interface ServicePanelProps {
  title: string;
  accent?: ServicePanelAccent;
  items: ServicePanelItem[];
}
export type LogoCloudProps = { labels: string[]; label?: string };

const servicePanelAccents: Record<ServicePanelAccent, string> = {
  brand: 'var(--ibs-color-brand)',
  secondary: 'var(--ibs-color-secondary)',
  strategy: 'var(--ibs-accent-strategy)',
  ux: 'var(--ibs-accent-ux)',
  technology: 'var(--ibs-accent-technology)',
  implementation: 'var(--ibs-accent-implementation)',
  talent: 'var(--ibs-accent-talent)',
  events: 'var(--ibs-accent-events)',
};

export function Hero({ eyebrow, title, titleLevel = 1, description, primaryAction, secondaryAction }: HeroProps) {
  return (
    <section className="ibs-hero">
      <Container className="ibs-hero__grid">
        <Stack gap={6}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading level={titleLevel} size={1} className="ibs-hero__headline">
            {title}
          </Heading>
        </Stack>
        <Stack gap={6} className="ibs-hero__aside">
          <Text size="lg">{description}</Text>
          <div className="ibs-cluster">
            <ButtonLink href={primaryAction.href} variant="primary" size="lg" trailingIcon={<ArrowUpRight />}>
              {primaryAction.label}
            </ButtonLink>
            {secondaryAction && (
              <ButtonLink href={secondaryAction.href} variant="outline" size="lg">
                {secondaryAction.label}
              </ButtonLink>
            )}
          </div>
        </Stack>
      </Container>
    </section>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  href = '#',
  linkLabel = 'Ver mais',
  motion = 'subtle',
}: FeatureCardProps) {
  return (
    <article className={`ibs-feature-card ibs-motion--${motion}`}>
      <Stack gap={6}>
        <span className="ibs-feature-card__icon" aria-hidden="true">
          {icon}
        </span>
        <div>
          <Heading level={3} size={4}>
            {title}
          </Heading>
          {description && (
            <Text tone="muted" style={{ marginTop: 'var(--ibs-space-3)' }}>
              {description}
            </Text>
          )}
        </div>
      </Stack>
      <a className="ibs-feature-card__link" href={href}>
        {linkLabel}
        <ArrowUpRight aria-hidden="true" size={17} />
      </a>
    </article>
  );
}

export function EcosystemCard({ accent = 'brand', title, description, motion = 'subtle' }: EcosystemCardProps) {
  const accentValue = accent === 'brand' ? 'var(--ibs-color-brand)' : `var(--ibs-accent-${accent})`;
  return (
    <article
      className={`ibs-ecosystem-card ibs-motion--${motion}`}
      style={{ '--ibs-card-accent': accentValue } as CSSProperties}
    >
      <div className="ibs-ecosystem-card__body">
        <Heading level={3} size={4}>
          {title}
        </Heading>
        <Text tone="muted" size="sm" style={{ marginTop: 'var(--ibs-space-2)' }}>
          {description}
        </Text>
      </div>
    </article>
  );
}

export function ServicePanel({ title, accent = 'brand', items }: ServicePanelProps) {
  return (
    <div>
      <Heading
        level={3}
        size={4}
        className="ibs-service-panel__title"
        style={{ '--ibs-panel-accent': servicePanelAccents[accent] } as CSSProperties}
      >
        {title}
      </Heading>
      <div className="ibs-service-panel">
        {items.map((item) => (
          <div className="ibs-service-panel__item" key={item.label}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoCloud({ labels, label = 'Empresas que confiam na Improve' }: LogoCloudProps) {
  return (
    <div className="ibs-logo-cloud" aria-label={label}>
      {labels.map((item) => (
        <div className="ibs-logo-cloud__item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}
