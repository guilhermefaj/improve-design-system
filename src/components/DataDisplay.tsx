import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
import { ChevronRight } from 'lucide-react';
import type { MotionPreset } from './Button';
import { cx } from './utils';

export function Card({
  tone = 'canvas',
  interactive = false,
  motion = 'subtle',
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: 'canvas' | 'warm'; interactive?: boolean; motion?: MotionPreset }) {
  return (
    <article
      className={cx(
        'ibs-card',
        tone === 'warm' && 'ibs-card--warm',
        interactive && 'ibs-card--interactive',
        interactive && `ibs-motion--${motion}`,
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

export function CardBody(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ibs-card__body', props.className)} />;
}

export function CardFooter(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx('ibs-card__footer', props.className)} />;
}

export function Avatar({
  name,
  size = 'md',
  src,
  alt = '',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { name: string; size?: 'sm' | 'md' | 'lg'; src?: string; alt?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return (
    <span
      className={cx('ibs-avatar', size !== 'md' && `ibs-avatar--${size}`, className)}
      aria-label={!src ? name : undefined}
      {...props}
    >
      {src ? <img src={src} alt={alt || name} /> : initials}
    </span>
  );
}

export function Divider(props: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={cx('ibs-divider', props.className)} />;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="ibs-stat">
      <div className="ibs-stat__value">{value}</div>
      <div className="ibs-stat__label">{label}</div>
    </div>
  );
}

export function Quote({ children, author, role }: { children: ReactNode; author: string; role?: string }) {
  return (
    <blockquote className="ibs-quote">
      <p>“{children}”</p>
      <footer>
        <strong>{author}</strong>
        {role && <> · {role}</>}
      </footer>
    </blockquote>
  );
}

export function DataTable({
  caption,
  children,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement> & { caption: string }) {
  return (
    <div className="ibs-table-wrap">
      <table className={cx('ibs-table', className)} {...props}>
        <caption className="ibs-sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="ibs-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="ibs-cluster" style={{ gap: 'var(--ibs-space-2)' }}>
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange?: (page: number) => void;
}) {
  return (
    <nav className="ibs-pagination" aria-label="Paginação">
      {Array.from({ length: pages }, (_, index) => index + 1).map((value) => (
        <button
          type="button"
          className="ibs-icon-button"
          key={value}
          aria-label={`Página ${value}`}
          aria-current={page === value ? 'page' : undefined}
          onClick={() => onChange?.(value)}
        >
          {value}
        </button>
      ))}
    </nav>
  );
}

export type DescriptionListItem = { term: string; description: ReactNode };
export type DescriptionListProps = HTMLAttributes<HTMLDListElement> & {
  items: DescriptionListItem[];
  layout?: 'stacked' | 'inline';
};

export function DescriptionList({ items, layout = 'stacked', className, ...props }: DescriptionListProps) {
  return (
    <dl
      className={cx('ibs-description-list', layout !== 'stacked' && `ibs-description-list--${layout}`, className)}
      {...props}
    >
      {items.map((item, index) => (
        <div className="ibs-description-list__row" key={`${item.term}-${index}`}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

export type CardProps = Parameters<typeof Card>[0];
export type CardBodyProps = Parameters<typeof CardBody>[0];
export type CardFooterProps = Parameters<typeof CardFooter>[0];
export type AvatarProps = Parameters<typeof Avatar>[0];
export type DividerProps = Parameters<typeof Divider>[0];
export type StatProps = Parameters<typeof Stat>[0];
export type QuoteProps = Parameters<typeof Quote>[0];
export type DataTableProps = Parameters<typeof DataTable>[0];
export type BreadcrumbsProps = Parameters<typeof Breadcrumbs>[0];
export type PaginationProps = Parameters<typeof Pagination>[0];

export const Separator = Divider;
export type SeparatorProps = DividerProps;
export const Breadcrumb = Breadcrumbs;
export type BreadcrumbProps = BreadcrumbsProps;
