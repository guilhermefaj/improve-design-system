import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { cx } from './utils';

export function Badge({ tone = 'neutral', className, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'brand' | 'success' | 'info' | 'warning' }) {
  return <span className={cx('ibs-badge', tone !== 'neutral' && `ibs-badge--${tone}`, className)} {...props} />;
}

const alertIcons = { info: Info, success: CheckCircle2, warning: TriangleAlert, danger: AlertCircle };
export function Alert({ tone = 'info', title, children, className, ...props }: HTMLAttributes<HTMLDivElement> & { tone?: keyof typeof alertIcons; title: string; children?: ReactNode }) {
  const Icon = alertIcons[tone];
  return <div role={tone === 'danger' ? 'alert' : 'status'} className={cx('ibs-alert', `ibs-alert--${tone}`, className)} {...props}><Icon aria-hidden="true" /><div><strong>{title}</strong>{children && <div style={{ marginTop: 'var(--ibs-space-1)' }}>{children}</div>}</div></div>;
}

export function Skeleton({ width = '100%', height = '1rem', className, style, ...props }: HTMLAttributes<HTMLDivElement> & { width?: CSSProperties['width']; height?: CSSProperties['height'] }) {
  return <div aria-hidden="true" className={cx('ibs-skeleton', className)} style={{ width, height, ...style }} {...props} />;
}

export function Spinner({ label = 'Carregando', className, ...props }: HTMLAttributes<HTMLSpanElement> & { label?: string }) {
  return <span role="status" className={cx('ibs-spinner', className)} {...props}><span className="ibs-sr-only">{label}</span></span>;
}

export function Progress({ value, label = 'Progresso' }: { value: number; label?: string }) {
  const bounded = Math.max(0, Math.min(100, value));
  return <div className="ibs-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={bounded}><span className="ibs-progress__bar" style={{ width: `${bounded}%` }} /></div>;
}
