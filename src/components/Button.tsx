import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from './utils';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'primary' | 'brand' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', size = 'md', fullWidth = false, leadingIcon, trailingIcon, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cx('ibs-button', `ibs-button--${variant}`, size !== 'md' && `ibs-button--${size}`, fullWidth && 'ibs-button--full', className)} {...props}>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
});

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, className, type = 'button', ...props },
  ref,
) {
  return <button ref={ref} type={type} className={cx('ibs-icon-button', className)} aria-label={label} {...props}>{icon}</button>;
});

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function ButtonLink({ variant = 'solid', size = 'md', leadingIcon, trailingIcon, className, children, ...props }: ButtonLinkProps) {
  return <a className={cx('ibs-button', `ibs-button--${variant}`, size !== 'md' && `ibs-button--${size}`, className)} {...props}>{leadingIcon}<span>{children}</span>{trailingIcon}</a>;
}
