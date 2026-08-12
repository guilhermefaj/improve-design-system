import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { cx } from './utils';

export type ImproveMarkProps = HTMLAttributes<SVGSVGElement> & {
  size?: number;
};

export function ImproveMark({ size = 36, className, ...props }: ImproveMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cx('ibs-logo__mark', className)}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <path d="M4.75 16.25h18.5v18.5H9.75a5 5 0 0 1-5-5v-13.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.75 4.75h14a5.5 5.5 0 0 1 5.5 5.5v14h-19.5V4.75Z" stroke="var(--ibs-color-brand)" strokeWidth="2.2" />
    </svg>
  );
}

export type ImproveLogoProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  compact?: boolean;
  href?: string;
};

export function ImproveLogo({ compact = false, href = '/', className, ...props }: ImproveLogoProps) {
  return (
    <a className={cx('ibs-logo', className)} href={href} aria-label="Improve Business — início" {...props}>
      <ImproveMark />
      {!compact && <span className="ibs-logo__word">improve</span>}
    </a>
  );
}
