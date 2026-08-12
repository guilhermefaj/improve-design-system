import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from './utils';

export function Card({ tone = 'canvas', interactive = false, className, children, ...props }: HTMLAttributes<HTMLDivElement> & { tone?: 'canvas' | 'warm'; interactive?: boolean }) {
  return <article className={cx('ibs-card', tone === 'warm' && 'ibs-card--warm', interactive && 'ibs-card--interactive', className)} {...props}>{children}</article>;
}

export function CardBody(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ibs-card__body', props.className)} />;
}

export function CardFooter(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ibs-card__footer', props.className)} />;
}

export function Avatar({ name, size = 'md', src, alt = '', className, ...props }: HTMLAttributes<HTMLSpanElement> & { name: string; size?: 'sm' | 'md' | 'lg'; src?: string; alt?: string }) {
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return <span className={cx('ibs-avatar', size !== 'md' && `ibs-avatar--${size}`, className)} aria-label={!src ? name : undefined} {...props}>{src ? <img src={src} alt={alt || name} /> : initials}</span>;
}

export function Divider(props: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={cx('ibs-divider', props.className)} />;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return <div className="ibs-stat"><div className="ibs-stat__value">{value}</div><div className="ibs-stat__label">{label}</div></div>;
}

export function Quote({ children, author, role }: { children: ReactNode; author: string; role?: string }) {
  return <blockquote className="ibs-quote"><p>“{children}”</p><footer><strong>{author}</strong>{role && <> · {role}</>}</footer></blockquote>;
}

export function DataTable({ caption, children, className, ...props }: TableHTMLAttributes<HTMLTableElement> & { caption: string }) {
  return <div className="ibs-table-wrap"><table className={cx('ibs-table', className)} {...props}><caption className="ibs-sr-only">{caption}</caption>{children}</table></div>;
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav className="ibs-breadcrumbs" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`} className="ibs-cluster" style={{ gap: 'var(--ibs-space-2)' }}>{index > 0 && <ChevronRight size={14} aria-hidden="true" />}{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange?: (page: number) => void }) {
  return <nav className="ibs-pagination" aria-label="Paginação">{Array.from({ length: pages }, (_, index) => index + 1).map((value) => <button type="button" className="ibs-icon-button" key={value} aria-label={`Página ${value}`} aria-current={page === value ? 'page' : undefined} onClick={() => onChange?.(value)}>{value}</button>)}</nav>;
}
