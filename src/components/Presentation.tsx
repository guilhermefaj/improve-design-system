import type { HTMLAttributes, ReactNode } from 'react';
import { ImproveLogo } from './Logo';
import { cx } from './utils';

export type SlideProps = HTMLAttributes<HTMLElement> & {
  tone?: 'canvas' | 'warm' | 'ink' | 'brand';
  children: ReactNode;
};

export function Slide({ tone = 'canvas', className, children, ...props }: SlideProps) {
  return (
    <article className={cx('ibs-slide', `ibs-slide--${tone}`, className)} {...props}>
      {children}
    </article>
  );
}

export function SlideKicker(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cx('ibs-slide__kicker', props.className)} />;
}

export function SlideTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 {...props} className={cx('ibs-slide__title', className)}>
      {children}
    </h2>
  );
}

export function SlideFooter({ page, label = 'Improve Business' }: { page?: number | string; label?: string }) {
  return (
    <footer className="ibs-slide__footer">
      <ImproveLogo href="#" />
      <span>{label}</span>
      {page !== undefined && <span>{String(page).padStart(2, '0')}</span>}
    </footer>
  );
}

export function SlideMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="ibs-slide__metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export type SlideKickerProps = Parameters<typeof SlideKicker>[0];
export type SlideTitleProps = Parameters<typeof SlideTitle>[0];
export type SlideFooterProps = Parameters<typeof SlideFooter>[0];
export type SlideMetricProps = Parameters<typeof SlideMetric>[0];
