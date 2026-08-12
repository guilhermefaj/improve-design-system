import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4;
  size?: 1 | 2 | 3 | 4;
  family?: 'display' | 'body';
  children: ReactNode;
};

export function Heading({ level = 2, size = level, family = 'display', className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return <Tag className={cx('ibs-heading', `ibs-heading--${size}`, family === 'body' && 'ibs-heading--body', className)} {...props}>{children}</Tag>;
}

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'muted';
  strong?: boolean;
};

export function Text({ size = 'md', tone = 'default', strong = false, className, ...props }: TextProps) {
  return <p className={cx('ibs-text', size !== 'md' && `ibs-text--${size}`, tone === 'muted' && 'ibs-text--muted', strong && 'ibs-text--strong', className)} {...props} />;
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('ibs-eyebrow', className)} {...props} />;
}

export function AccentText({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('ibs-accent-text', className)} {...props} />;
}

export function SupportingLabel({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('ibs-supporting-label', className)} {...props} />;
}
