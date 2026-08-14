import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';

type Space = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

export function Container({
  narrow = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { narrow?: boolean }) {
  return <div className={cx('ibs-container', narrow && 'ibs-container--narrow', className)} {...props} />;
}

export function Stack({ gap = 6, className, style, ...props }: HTMLAttributes<HTMLDivElement> & { gap?: Space }) {
  return (
    <div
      className={cx('ibs-stack', className)}
      style={{ '--ibs-stack-gap': `var(--ibs-space-${gap})`, ...style } as CSSProperties}
      {...props}
    />
  );
}

export function Cluster({ gap = 4, className, style, ...props }: HTMLAttributes<HTMLDivElement> & { gap?: Space }) {
  return (
    <div
      className={cx('ibs-cluster', className)}
      style={{ '--ibs-cluster-gap': `var(--ibs-space-${gap})`, ...style } as CSSProperties}
      {...props}
    />
  );
}

export function Grid({
  columns = 3,
  gap = 6,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { columns?: 1 | 2 | 3 | 4 | 6; gap?: Space }) {
  return (
    <div
      className={cx('ibs-grid', className)}
      style={{ '--ibs-grid-cols': columns, '--ibs-grid-gap': `var(--ibs-space-${gap})`, ...style } as CSSProperties}
      {...props}
    />
  );
}

export type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: 'canvas' | 'warm' | 'ink' | 'brand';
  children: ReactNode;
};

export function Section({ tone = 'canvas', className, children, ...props }: SectionProps) {
  return (
    <section className={cx('ibs-section', tone !== 'canvas' && `ibs-section--${tone}`, className)} {...props}>
      {children}
    </section>
  );
}

export type ContainerProps = Parameters<typeof Container>[0];
export type StackProps = Parameters<typeof Stack>[0];
export type ClusterProps = Parameters<typeof Cluster>[0];
export type GridProps = Parameters<typeof Grid>[0];
