import { forwardRef, useId, useState } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff, Minus, Plus, Search, X } from 'lucide-react';
import type { MotionPreset } from '../Button';
import { IconButton } from '../Button';
import { cx } from '../utils';

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cx('ibs-kbd', className)} {...props} />;
}

export function ButtonGroup({
  attached = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { attached?: boolean }) {
  return (
    <div
      className={cx('ibs-button-group', attached && 'ibs-button-group--attached', className)}
      role="group"
      {...props}
    />
  );
}

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  motion?: MotionPreset;
};

export function Chip({
  selected = false,
  removable = false,
  onRemove,
  motion = 'subtle',
  className,
  children,
  type = 'button',
  ...props
}: ChipProps) {
  return (
    <span className={cx('ibs-chip-wrap', `ibs-motion--${motion}`)}>
      <button
        type={type}
        className={cx('ibs-chip', selected && 'ibs-chip--selected', className)}
        aria-pressed={selected}
        {...props}
      >
        {children}
      </button>
      {removable && (
        <button
          type="button"
          className="ibs-chip__remove"
          aria-label={`Remover ${String(children)}`}
          onClick={onRemove}
        >
          <X aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

export type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
  icon?: ReactNode;
  motion?: MotionPreset;
};

export function Toggle({
  pressed = false,
  icon,
  motion = 'subtle',
  className,
  children,
  type = 'button',
  ...props
}: ToggleProps) {
  return (
    <button
      type={type}
      className={cx('ibs-toggle', `ibs-motion--${motion}`, className)}
      aria-pressed={pressed}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export type SegmentedControlItem = { value: string; label: ReactNode; disabled?: boolean };
export function SegmentedControl({
  value,
  items,
  label,
  onValueChange,
  className,
}: {
  value: string;
  items: SegmentedControlItem[];
  label: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cx('ibs-segmented', className)} role="radiogroup" aria-label={label}>
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

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label: string;
  valueLabel?: (value: number) => string;
  onValueChange?: (value: number) => void;
};
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, valueLabel = String, onValueChange, value, defaultValue, min = 0, max = 100, className, ...props },
  ref,
) {
  const [local, setLocal] = useState(Number(defaultValue ?? min));
  const current = Number(value ?? local);
  return (
    <label className={cx('ibs-slider', className)}>
      <span>
        {label}
        <output>{valueLabel(current)}</output>
      </span>
      <input
        ref={ref}
        type="range"
        value={current}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number(event.currentTarget.value);
          setLocal(next);
          onValueChange?.(next);
        }}
        {...props}
      />
    </label>
  );
});

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { onClear?: () => void };
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onClear, className, value, ...props },
  ref,
) {
  return (
    <span className={cx('ibs-input-shell', className)}>
      <Search aria-hidden="true" />
      <input ref={ref} className="ibs-input" type="search" value={value} {...props} />
      {onClear && value && <IconButton label="Limpar busca" icon={<X />} size="sm" variant="ghost" onClick={onClear} />}
    </span>
  );
});

export const PasswordInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function PasswordInput(
  { className, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  return (
    <span className={cx('ibs-input-shell', className)}>
      <input ref={ref} className="ibs-input" type={visible ? 'text' : 'password'} {...props} />
      <IconButton
        label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        icon={visible ? <EyeOff /> : <Eye />}
        size="sm"
        variant="ghost"
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
      />
    </span>
  );
});

export type NumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
};
export function NumberInput({
  label,
  value,
  defaultValue = 0,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onValueChange,
  className,
  ...props
}: NumberInputProps) {
  const id = useId();
  const [local, setLocal] = useState(defaultValue);
  const current = value ?? local;
  const commit = (next: number) => {
    const bounded = Math.min(Number(max), Math.max(Number(min), next));
    setLocal(bounded);
    onValueChange?.(bounded);
  };
  return (
    <div className={cx('ibs-number-input', className)}>
      <label htmlFor={id}>{label}</label>
      <div>
        <IconButton
          label={`Diminuir ${label}`}
          icon={<Minus />}
          size="sm"
          variant="ghost"
          onClick={() => commit(current - Number(step))}
          disabled={current <= Number(min)}
        />
        <input
          id={id}
          type="number"
          value={current}
          min={min}
          max={max}
          step={step}
          onChange={(event) => commit(Number(event.currentTarget.value))}
          {...props}
        />
        <IconButton
          label={`Aumentar ${label}`}
          icon={<Plus />}
          size="sm"
          variant="ghost"
          onClick={() => commit(current + Number(step))}
          disabled={current >= Number(max)}
        />
      </div>
    </div>
  );
}

export function Sparkline({
  values,
  label,
  tone = 'secondary',
  className,
}: {
  values: number[];
  label: string;
  tone?: 'brand' | 'secondary' | 'success';
  className?: string;
}) {
  const width = 120;
  const height = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map(
      (item, index) =>
        `${(index / Math.max(values.length - 1, 1)) * width},${height - ((item - min) / range) * height}`,
    )
    .join(' ');
  return (
    <svg
      className={cx('ibs-sparkline', `ibs-sparkline--${tone}`, className)}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
    >
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export type KbdProps = Parameters<typeof Kbd>[0];
export type ButtonGroupProps = Parameters<typeof ButtonGroup>[0];
export type SegmentedControlProps = Parameters<typeof SegmentedControl>[0];
export type PasswordInputProps = React.ComponentPropsWithoutRef<typeof PasswordInput>;
export type SparklineProps = Parameters<typeof Sparkline>[0];
