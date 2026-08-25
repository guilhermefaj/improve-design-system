import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { cx } from './utils';

export type ImproveLogoVariant = 'brand' | 'duo' | 'mono' | 'inverse';

export type ImproveMarkProps = HTMLAttributes<SVGSVGElement> & {
  size?: number;
  variant?: ImproveLogoVariant;
};

function markColors(variant: ImproveLogoVariant) {
  switch (variant) {
    case 'brand':
      return { lower: 'var(--ibs-color-brand)', upper: 'var(--ibs-color-brand)' };
    case 'duo':
      return { lower: 'currentColor', upper: 'var(--ibs-color-brand)' };
    case 'mono':
    case 'inverse':
    default:
      return { lower: 'currentColor', upper: 'currentColor' };
  }
}

export function ImproveMark({ size = 36, variant = 'duo', className, ...props }: ImproveMarkProps) {
  const colors = markColors(variant);
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
      <path d="M4.75 16.25h18.5v18.5H9.75a5 5 0 0 1-5-5v-13.5Z" stroke={colors.lower} strokeWidth="1.8" />
      <path d="M15.75 4.75h14a5.5 5.5 0 0 1 5.5 5.5v14h-19.5V4.75Z" stroke={colors.upper} strokeWidth="2.2" />
    </svg>
  );
}

export type ImproveLogoProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  compact?: boolean;
  href?: string;
  variant?: ImproveLogoVariant;
};

export function ImproveLogo({
  compact = false,
  href = '/',
  variant = 'duo',
  className,
  ...props
}: ImproveLogoProps) {
  return (
    <a
      className={cx(
        'ibs-logo',
        variant === 'brand' && 'ibs-logo--brand',
        variant === 'mono' && 'ibs-logo--mono',
        variant === 'inverse' && 'ibs-logo--inverse',
        className,
      )}
      href={href}
      aria-label="Improve Business — início"
      {...props}
    >
      <ImproveMark variant={variant} />
      {!compact && (
        <span className="ibs-logo__word" aria-hidden="true">
          <span className="ibs-logo__i" />
          mprove
        </span>
      )}
    </a>
  );
}
