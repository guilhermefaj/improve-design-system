import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cx } from './utils';

export type MotionPreset = 'none' | 'subtle' | 'expressive';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  motion?: MotionPreset;
  loading?: boolean;
  loadingLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    size = 'md',
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    motion = 'subtle',
    loading = false,
    loadingLabel = 'Carregando',
    className,
    children,
    type = 'button',
    disabled,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'ibs-button',
        `ibs-button--${variant}`,
        `ibs-motion--${motion}`,
        size !== 'md' && `ibs-button--${size}`,
        fullWidth && 'ibs-button--full',
        loading && 'ibs-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {(loading || leadingIcon) && (
        <span className="ibs-button__icon ibs-button__icon--leading" aria-hidden="true">
          {loading ? <LoaderCircle /> : leadingIcon}
        </span>
      )}
      <span>{loading ? loadingLabel : children}</span>
      {trailingIcon && (
        <span className="ibs-button__icon ibs-button__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
});

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
  variant?: 'outline' | 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  motion?: MotionPreset;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = 'outline', size = 'md', motion = 'subtle', className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'ibs-icon-button',
        `ibs-icon-button--${variant}`,
        `ibs-icon-button--${size}`,
        `ibs-motion--${motion}`,
        className,
      )}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
});

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  motion?: MotionPreset;
};

export function ButtonLink({
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  motion = 'subtle',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cx(
        'ibs-button',
        `ibs-button--${variant}`,
        `ibs-motion--${motion}`,
        size !== 'md' && `ibs-button--${size}`,
        fullWidth && 'ibs-button--full',
        className,
      )}
      {...props}
    >
      {leadingIcon && (
        <span className="ibs-button__icon ibs-button__icon--leading" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span>{children}</span>
      {trailingIcon && (
        <span className="ibs-button__icon ibs-button__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </a>
  );
}
