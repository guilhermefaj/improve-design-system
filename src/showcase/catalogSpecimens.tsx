import { type ReactNode } from 'react';
import { Heading, Text } from '../components';

export function SpecimenPanel({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="showcase-panel" id={id} data-specimen-id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <header>
        <div>
          <Heading level={3} size={4} id={id ? `${id}-title` : undefined}>
            {title}
          </Heading>
        </div>
        {description && (
          <Text size="sm" tone="muted">
            {description}
          </Text>
        )}
      </header>
      <div className="showcase-panel__body">{children}</div>
    </section>
  );
}
