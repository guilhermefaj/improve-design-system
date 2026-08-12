import type { HTMLAttributes, ReactNode } from 'react';
import { ImproveLogo } from './Logo';
import { cx } from './utils';

export type SlideProps = HTMLAttributes<HTMLElement> & {
  tone?: 'canvas' | 'warm' | 'ink' | 'brand';
  children: ReactNode;
};

export function Slide({ tone = 'canvas', className, children, ...props }: SlideProps) {
  return <article className={cx('ibs-slide', `ibs-slide--${tone}`, className)} {...props}>{children}</article>;
}

export function SlideKicker(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cx('ibs-slide__kicker', props.className)} />;
}

export function SlideTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className={cx('ibs-slide__title', props.className)} />;
}

export function SlideFooter({ page, label = 'Improve Business' }: { page?: number | string; label?: string }) {
  return <footer className="ibs-slide__footer"><ImproveLogo href="#" /><span>{label}</span>{page !== undefined && <span>{String(page).padStart(2, '0')}</span>}</footer>;
}

export function SlideMetric({ value, label }: { value: string; label: string }) {
  return <div className="ibs-slide__metric"><strong>{value}</strong><span>{label}</span></div>;
}
