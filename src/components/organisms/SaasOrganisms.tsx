import { useMemo, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronLeft, ChevronRight, PanelLeft, TrendingDown, TrendingUp, X } from 'lucide-react';
import { Button, ButtonLink, IconButton } from '../Button';
import { Avatar, Breadcrumbs } from '../DataDisplay';
import { Heading, Text } from '../Typography';
import { SearchInput, Sparkline } from '../atoms/SaasAtoms';
import { cx } from '../utils';

export function AppShell({ sidebar, header, children, className, ...props }: HTMLAttributes<HTMLDivElement> & { sidebar?: ReactNode; header?: ReactNode }) {
  return <div className={cx('ibs-app-shell', !sidebar && 'ibs-app-shell--no-sidebar', className)} {...props}>{sidebar}{header && <header className="ibs-app-shell__header">{header}</header>}<main className="ibs-app-shell__main">{children}</main></div>;
}

export type SidebarItem = { label: string; href: string; icon?: ReactNode; active?: boolean; badge?: ReactNode; disabled?: boolean };
export type SidebarGroup = { label?: string; items: SidebarItem[] };
export function Sidebar({ groups, brand, footer, collapsed: controlledCollapsed, defaultCollapsed = false, onCollapsedChange, label = 'Navegação principal', className }: { groups: SidebarGroup[]; brand?: ReactNode; footer?: ReactNode; collapsed?: boolean; defaultCollapsed?: boolean; onCollapsedChange?: (collapsed: boolean) => void; label?: string; className?: string }) {
  const [localCollapsed, setLocalCollapsed] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed ?? localCollapsed;
  const setCollapsed = (next: boolean) => { setLocalCollapsed(next); onCollapsedChange?.(next); };
  return <aside className={cx('ibs-sidebar', collapsed && 'ibs-sidebar--collapsed', className)}><div className="ibs-sidebar__brand">{brand}<IconButton label={collapsed ? 'Expandir menu' : 'Recolher menu'} icon={collapsed ? <ChevronRight /> : <ChevronLeft />} size="sm" variant="ghost" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)} /></div><nav aria-label={label}>{groups.map((group, groupIndex) => <div className="ibs-sidebar__group" key={group.label ?? groupIndex}>{group.label && <p>{group.label}</p>}<ul>{group.items.map((item) => <li key={`${item.label}-${item.href}`}><a href={item.href} aria-current={item.active ? 'page' : undefined} aria-disabled={item.disabled || undefined} tabIndex={item.disabled ? -1 : undefined}><span aria-hidden="true">{item.icon}</span><span>{item.label}</span>{item.badge && <span className="ibs-sidebar__badge">{item.badge}</span>}</a></li>)}</ul></div>)}</nav>{footer && <footer>{footer}</footer>}</aside>;
}

export function SidebarTrigger({ label = 'Abrir navegação', onClick }: { label?: string; onClick?: () => void }) {
  return <IconButton label={label} icon={<PanelLeft />} variant="ghost" onClick={onClick} />;
}

export function PageHeader({ eyebrow, title, titleLevel = 1, description, breadcrumbs, actions, meta, className }: { eyebrow?: string; title: ReactNode; titleLevel?: 1 | 2 | 3; description?: ReactNode; breadcrumbs?: Array<{ label: string; href?: string }>; actions?: ReactNode; meta?: ReactNode; className?: string }) {
  return <header className={cx('ibs-page-header', className)}>{breadcrumbs && <Breadcrumbs items={breadcrumbs} />}<div className="ibs-page-header__row"><div>{eyebrow && <span className="ibs-page-header__eyebrow">{eyebrow}</span>}<Heading level={titleLevel} size={2}>{title}</Heading>{description && <Text tone="muted">{description}</Text>}{meta && <div className="ibs-page-header__meta">{meta}</div>}</div>{actions && <div className="ibs-page-header__actions">{actions}</div>}</div></header>;
}

export function MetricCard({ label, value, change, changeLabel, values, icon, tone = 'secondary', className }: { label: string; value: ReactNode; change?: number; changeLabel?: string; values?: number[]; icon?: ReactNode; tone?: 'brand' | 'secondary' | 'success'; className?: string }) {
  const positive = (change ?? 0) >= 0;
  return <article className={cx('ibs-metric-card', className)}><header><span>{label}</span>{icon && <span aria-hidden="true">{icon}</span>}</header><div className="ibs-metric-card__value">{value}</div><footer>{change !== undefined && <span className={positive ? 'ibs-trend--positive' : 'ibs-trend--negative'}>{positive ? <TrendingUp /> : <TrendingDown />}{Math.abs(change)}%{changeLabel && <small>{changeLabel}</small>}</span>}{values && <Sparkline values={values} label={`Tendência de ${label}`} tone={tone} />}</footer></article>;
}

export type DataGridColumn<T> = { id: string; header: ReactNode; cell: (row: T) => ReactNode; sortValue?: (row: T) => string | number; align?: 'start' | 'center' | 'end'; width?: string };
export function DataGrid<T>({ rows, columns, getRowId, caption, empty, selectable = false, selectedIds = [], onSelectionChange, className }: { rows: T[]; columns: DataGridColumn<T>[]; getRowId: (row: T) => string; caption: string; empty?: ReactNode; selectable?: boolean; selectedIds?: string[]; onSelectionChange?: (ids: string[]) => void; className?: string }) {
  const [sort, setSort] = useState<{ id: string; direction: 'asc' | 'desc' }>();
  const sorted = useMemo(() => { if (!sort) return rows; const column = columns.find((item) => item.id === sort.id); if (!column?.sortValue) return rows; return [...rows].sort((a, b) => { const av = column.sortValue!(a); const bv = column.sortValue!(b); const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv)); return sort.direction === 'asc' ? result : -result; }); }, [columns, rows, sort]);
  const toggleAll = () => onSelectionChange?.(selectedIds.length === rows.length ? [] : rows.map(getRowId));
  const toggle = (id: string) => onSelectionChange?.(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  return <div className={cx('ibs-data-grid', className)}><div className="ibs-table-wrap"><table className="ibs-table"><caption>{caption}</caption><thead><tr>{selectable && <th className="ibs-data-grid__select"><input type="checkbox" aria-label="Selecionar todas as linhas" checked={rows.length > 0 && selectedIds.length === rows.length} onChange={toggleAll} /></th>}{columns.map((column) => <th key={column.id} style={{ width: column.width, textAlign: column.align }} aria-sort={sort?.id === column.id ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}>{column.sortValue ? <button type="button" onClick={() => setSort((current) => current?.id === column.id && current.direction === 'asc' ? { id: column.id, direction: 'desc' } : { id: column.id, direction: 'asc' })}>{column.header}{sort?.id !== column.id ? <ArrowUpDown /> : sort.direction === 'asc' ? <ArrowUp /> : <ArrowDown />}</button> : column.header}</th>)}</tr></thead><tbody>{sorted.map((row) => { const id = getRowId(row); return <tr key={id} data-selected={selectedIds.includes(id) || undefined}>{selectable && <td><input type="checkbox" aria-label={`Selecionar linha ${id}`} checked={selectedIds.includes(id)} onChange={() => toggle(id)} /></td>}{columns.map((column) => <td key={column.id} style={{ textAlign: column.align }}>{column.cell(row)}</td>)}</tr>; })}</tbody></table>{rows.length === 0 && <div className="ibs-data-grid__empty">{empty ?? 'Nenhum registro encontrado.'}</div>}</div></div>;
}

export function FilterBar({ query, queryPlaceholder = 'Buscar…', onQueryChange, filters, activeCount = 0, onClear, actions, className }: { query?: string; queryPlaceholder?: string; onQueryChange?: (query: string) => void; filters?: ReactNode; activeCount?: number; onClear?: () => void; actions?: ReactNode; className?: string }) {
  return <div className={cx('ibs-filter-bar', className)}><SearchInput aria-label={queryPlaceholder} placeholder={queryPlaceholder} value={query ?? ''} onChange={(event) => onQueryChange?.(event.currentTarget.value)} onClear={query ? () => onQueryChange?.('') : undefined} /><div className="ibs-filter-bar__filters">{filters}</div>{activeCount > 0 && onClear && <Button variant="ghost" size="sm" leadingIcon={<X />} onClick={onClear}>Limpar filtros ({activeCount})</Button>}{actions && <div className="ibs-filter-bar__actions">{actions}</div>}</div>;
}

export function PricingCard({ name, description, price, suffix, features, action, highlighted = false, badge, className }: { name: string; description?: string; price: string; suffix?: string; features: string[]; action: { label: string; href: string }; highlighted?: boolean; badge?: ReactNode; className?: string }) {
  return <article className={cx('ibs-pricing-card', highlighted && 'ibs-pricing-card--highlighted', className)}>{badge && <div className="ibs-pricing-card__badge">{badge}</div>}<header><Heading level={3} size={4}>{name}</Heading>{description && <Text tone="muted" size="sm">{description}</Text>}<p className="ibs-pricing-card__price"><strong>{price}</strong>{suffix && <span>{suffix}</span>}</p></header><ul>{features.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><ButtonLink href={action.href} variant={highlighted ? 'primary' : 'outline'} fullWidth>{action.label}</ButtonLink></article>;
}

export type ActivityItem = { id: string; actor: { name: string; avatar?: string }; content: ReactNode; timestamp: string; icon?: ReactNode };
export function ActivityFeed({ items, label = 'Atividade recente', className }: { items: ActivityItem[]; label?: string; className?: string }) {
  return <ol className={cx('ibs-activity-feed', className)} aria-label={label}>{items.map((item) => <li key={item.id}><div className="ibs-activity-feed__avatar"><Avatar name={item.actor.name} src={item.actor.avatar} size="sm" />{item.icon && <span aria-hidden="true">{item.icon}</span>}</div><div><p>{item.content}</p><time dateTime={item.timestamp}>{new Date(item.timestamp).toLocaleString('pt-BR')}</time></div></li>)}</ol>;
}
