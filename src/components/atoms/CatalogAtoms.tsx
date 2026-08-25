import { createContext, forwardRef, useContext } from 'react';
import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(function Label(
  { className, ...props },
  ref,
) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- primitive; consumers set htmlFor
    <label ref={ref} className={cx('ibs-field__label', className)} {...props} />
  );
});

export type MarkerTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'purple';

export type MarkerProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: MarkerTone;
  label?: string;
};

export function Marker({ tone = 'neutral', label, className, ...props }: MarkerProps) {
  return (
    <span
      className={cx('ibs-marker', tone !== 'neutral' && `ibs-marker--${tone}`, className)}
      role={label ? 'status' : undefined}
      aria-label={label}
      {...props}
    >
      <span className="ibs-marker__dot" aria-hidden="true" />
      {label && <span className="ibs-marker__label">{label}</span>}
    </span>
  );
}

export type ItemProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
};

export function Item({
  title,
  description,
  leading,
  trailing,
  selected = false,
  href,
  onClick,
  className,
  ...props
}: ItemProps) {
  const classes = cx('ibs-item', selected && 'ibs-item--selected', className);
  const content = (
    <>
      {leading && <span className="ibs-item__leading">{leading}</span>}
      <span className="ibs-item__content">
        <strong className="ibs-item__title">{title}</strong>
        {description && <span className="ibs-item__description">{description}</span>}
      </span>
      {trailing && <span className="ibs-item__trailing">{trailing}</span>}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-current={selected ? 'true' : undefined}
        onClick={onClick}
        {...(props as HTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      onClick={onClick}
      {...(props as HTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

export type Direction = 'ltr' | 'rtl';

const DirectionContext = createContext<Direction>('ltr');

export type DirectionProviderProps = HTMLAttributes<HTMLDivElement> & {
  dir?: Direction;
};

export function DirectionProvider({ dir = 'ltr', className, children, ...props }: DirectionProviderProps) {
  return (
    <div dir={dir} className={className} {...props}>
      <DirectionContext.Provider value={dir}>{children}</DirectionContext.Provider>
    </div>
  );
}

export function useDirection(): Direction {
  return useContext(DirectionContext);
}

export type ChartProps = HTMLAttributes<SVGElement> & {
  data: number[];
  variant?: 'bar' | 'line';
  label: string;
};

export function Chart({ data, variant = 'line', label, className, ...props }: ChartProps) {
  const width = 120;
  const height = 36;
  const min = Math.min(...data, 0);
  const max = Math.max(...data, 1);
  const range = max - min || 1;
  const barWidth = width / Math.max(data.length, 1);

  return (
    <svg
      className={cx('ibs-chart', `ibs-chart--${variant}`, className)}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
      {...props}
    >
      {variant === 'bar'
        ? data.map((value, index) => {
            const barHeight = ((value - min) / range) * height;
            return (
              <rect
                key={index}
                x={index * barWidth + barWidth * 0.15}
                y={height - barHeight}
                width={barWidth * 0.7}
                height={barHeight}
                className="ibs-chart__bar"
              />
            );
          })
        : (() => {
            const points = data
              .map(
                (item, index) =>
                  `${(index / Math.max(data.length - 1, 1)) * width},${height - ((item - min) / range) * height}`,
              )
              .join(' ');
            return <polyline points={points} className="ibs-chart__line" vectorEffect="non-scaling-stroke" />;
          })()}
    </svg>
  );
}

export type ToggleGroupItem = { value: string; label: ReactNode; disabled?: boolean };

export type ToggleGroupProps = {
  value: string;
  items: ToggleGroupItem[];
  label: string;
  onValueChange?: (value: string) => void;
  type?: 'single';
  className?: string;
};

export function ToggleGroup({ value, items, label, onValueChange, className }: ToggleGroupProps) {
  return (
    <div className={cx('ibs-toggle-group', className)} role="radiogroup" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="radio"
          aria-checked={value === item.value}
          disabled={item.disabled}
          onClick={() => onValueChange?.(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export type LabelProps = React.ComponentPropsWithoutRef<typeof Label>;
