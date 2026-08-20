import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, DragEvent, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  CalendarDays,
  CalendarRange,
  Check,
  ChevronRight,
  Clock,
  Command,
  FileUp,
  Inbox,
  Search,
  X,
} from 'lucide-react';
import { Dialog as DialogPrimitive, Popover as PopoverPrimitive } from 'radix-ui';
import { IconButton } from '../Button';
import { Heading, Text } from '../Typography';
import { cx } from '../utils';

type FloatingCoords = { top: number; left: number; width: number; maxHeight: number };

function useFloatingList(open: boolean, onClose: () => void) {
  const controlRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [coords, setCoords] = useState<FloatingCoords | null>(null);

  useLayoutEffect(() => {
    if (!open || !controlRef.current) {
      setCoords(null);
      return;
    }
    const update = () => {
      const rect = controlRef.current!.getBoundingClientRect();
      const gutter = 8;
      const spaceBelow = window.innerHeight - rect.bottom - gutter;
      const spaceAbove = rect.top - gutter;
      const preferred = Math.min(18 * 16, spaceBelow > 120 ? spaceBelow : Math.max(spaceAbove, spaceBelow));
      const flip = spaceBelow < 160 && spaceAbove > spaceBelow;
      const top = flip ? Math.max(gutter, rect.top - preferred - gutter) : rect.bottom + gutter;
      setCoords({
        top,
        left: Math.min(rect.left, window.innerWidth - rect.width - gutter),
        width: rect.width,
        maxHeight: preferred,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (controlRef.current?.contains(target) || listRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, onClose]);

  return { controlRef, listRef, coords };
}

export function EmptyState({
  icon = <Inbox />,
  title,
  description,
  action,
  compact = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={cx('ibs-empty-state', compact && 'ibs-empty-state--compact', className)} {...props}>
      <span className="ibs-empty-state__icon" aria-hidden="true">
        {icon}
      </span>
      <Heading level={3} size={4}>
        {title}
      </Heading>
      {description && <Text tone="muted">{description}</Text>}
      {action}
    </div>
  );
}

export function Popover({
  trigger,
  title,
  children,
  align = 'center',
}: {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content className="ibs-popover" align={align} sideOffset={8}>
          {title && <strong>{title}</strong>}
          <div>{children}</div>
          <PopoverPrimitive.Arrow className="ibs-popover__arrow" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export function Sheet({
  trigger,
  title,
  description,
  children,
  side = 'right',
  footer,
}: {
  trigger: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  side?: 'left' | 'right';
  footer?: ReactNode;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ibs-dialog__overlay" />
        <DialogPrimitive.Content className={cx('ibs-sheet', `ibs-sheet--${side}`)}>
          <header>
            <div>
              <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              {description && <DialogPrimitive.Description>{description}</DialogPrimitive.Description>}
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton className="ibs-sheet__close" label="Fechar painel" icon={<X />} variant="ghost" />
            </DialogPrimitive.Close>
          </header>
          <div className="ibs-sheet__content">{children}</div>
          {footer && <footer>{footer}</footer>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export type StepperItem = { id: string; label: string; description?: string; optional?: boolean };
export function Stepper({
  items,
  active,
  orientation = 'horizontal',
  onStepChange,
  label = 'Progresso',
}: {
  items: StepperItem[];
  active: number;
  orientation?: 'horizontal' | 'vertical';
  onStepChange?: (index: number) => void;
  label?: string;
}) {
  return (
    <ol className={cx('ibs-stepper', `ibs-stepper--${orientation}`)} aria-label={label}>
      {items.map((item, index) => {
        const status = index < active ? 'complete' : index === active ? 'current' : 'upcoming';
        return (
          <li
            key={item.id}
            className={`ibs-stepper__item ibs-stepper__item--${status}`}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <button type="button" onClick={() => onStepChange?.(index)} disabled={!onStepChange}>
              <span>{status === 'complete' ? <Check aria-hidden="true" /> : index + 1}</span>
              <span>
                <strong>{item.label}</strong>
                {item.description && <small>{item.description}</small>}
                {item.optional && <small>Opcional</small>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export type ComboboxOption = { value: string; label: string; description?: string; disabled?: boolean };
export function Combobox({
  label,
  options,
  value,
  placeholder = 'Selecione uma opção',
  emptyMessage = 'Nenhum resultado',
  onValueChange,
  className,
}: {
  label: string;
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  emptyMessage?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { controlRef, listRef, coords } = useFloatingList(open, () => setOpen(false));
  const selected = options.find((item) => item.value === value);
  const filtered = useMemo(
    () => options.filter((item) => item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [options, query],
  );
  const select = (item: ComboboxOption) => {
    if (item.disabled) return;
    onValueChange?.(item.value);
    setOpen(false);
    setQuery('');
  };
  const move = (direction: 1 | -1) => {
    if (!filtered.length) return;
    let next = activeIndex;
    do next = (next + direction + filtered.length) % filtered.length;
    while (filtered[next]?.disabled && next !== activeIndex);
    setActiveIndex(next);
  };
  const listStyle: CSSProperties | undefined = coords
    ? { top: coords.top, left: coords.left, width: coords.width, maxHeight: coords.maxHeight }
    : undefined;
  const list = open ? (
    <ul
      ref={listRef}
      id={`${id}-list`}
      className="ibs-combobox__list ibs-combobox__list--floating"
      role="listbox"
      style={listStyle}
    >
      {filtered.length ? (
        filtered.map((item, index) => (
          <li key={item.value} role="none" onMouseDown={(event) => event.preventDefault()}>
            <button
              id={`${id}-option-${index}`}
              type="button"
              role="option"
              aria-selected={item.value === value}
              disabled={item.disabled}
              tabIndex={-1}
              className={index === activeIndex ? 'is-active' : undefined}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => select(item)}
            >
              <span>
                <strong>{item.label}</strong>
                {item.description && <small>{item.description}</small>}
              </span>
              {item.value === value && <Check aria-hidden="true" />}
            </button>
          </li>
        ))
      ) : (
        <li className="ibs-combobox__empty">{emptyMessage}</li>
      )}
    </ul>
  ) : null;
  return (
    <div className={cx('ibs-combobox', className)}>
      <label id={`${id}-label`} htmlFor={id}>
        {label}
      </label>
      <div className="ibs-combobox__control" ref={controlRef}>
        <Search aria-hidden="true" />
        <input
          id={id}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={open && filtered[activeIndex] ? `${id}-option-${activeIndex}` : undefined}
          aria-labelledby={`${id}-label`}
          value={open ? query : (selected?.label ?? '')}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setQuery('');
            setActiveIndex(0);
          }}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setOpen(true);
              move(1);
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setOpen(true);
              move(-1);
            } else if (event.key === 'Enter' && open && filtered[activeIndex]) {
              event.preventDefault();
              select(filtered[activeIndex]);
            } else if (event.key === 'Escape') {
              event.preventDefault();
              setOpen(false);
            }
          }}
        />
      </div>
      {list && createPortal(list, document.body)}
    </div>
  );
}

export type CommandItem = {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
};
export function CommandPalette({
  trigger,
  items,
  title = 'Comandos',
  placeholder = 'Buscar ação…',
}: {
  trigger: ReactNode;
  items: CommandItem[];
  title?: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState('');
  const matches = items.filter((item) =>
    [item.label, item.description, ...(item.keywords ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()),
  );
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ibs-dialog__overlay" />
        <DialogPrimitive.Content className="ibs-command">
          <DialogPrimitive.Title className="ibs-sr-only">{title}</DialogPrimitive.Title>
          <div className="ibs-command__search">
            <Search aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder={placeholder}
              aria-label={placeholder}
            />
            <DialogPrimitive.Close asChild>
              <IconButton label="Fechar comandos" icon={<X />} size="sm" variant="ghost" />
            </DialogPrimitive.Close>
          </div>
          <div className="ibs-command__results" role="listbox">
            {matches.length ? (
              matches.map((item) => (
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  key={item.id}
                  disabled={item.disabled}
                  onClick={item.onSelect}
                >
                  <span className="ibs-command__icon" aria-hidden="true">
                    {item.icon ?? <Command />}
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    {item.description && <small>{item.description}</small>}
                  </span>
                  {item.shortcut && <kbd>{item.shortcut}</kbd>}
                  <ChevronRight aria-hidden="true" />
                </button>
              ))
            ) : (
              <EmptyState compact title="Nada encontrado" description="Tente outro termo." />
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function DatePicker({
  label,
  hint,
  className,
  value,
  defaultValue,
  onChange,
  placeholder = 'Selecione uma data',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; placeholder?: string }) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [local, setLocal] = useState(typeof defaultValue === 'string' ? defaultValue : '');
  const current = typeof value === 'string' ? value : local;
  const display = current ? new Date(`${current}T00:00:00`).toLocaleDateString('pt-BR') : placeholder;
  const openPicker = () => {
    const input = inputRef.current;
    if (!input || props.disabled) return;
    input.focus();
    try {
      input.showPicker?.();
    } catch {
      input.click();
    }
  };
  return (
    <div className={cx('ibs-date-picker', className)}>
      <span id={`${id}-label`}>{label}</span>
      <button
        type="button"
        className="ibs-date-picker__trigger"
        aria-labelledby={`${id}-label`}
        data-placeholder={current ? undefined : 'true'}
        disabled={props.disabled}
        onClick={openPicker}
      >
        <CalendarDays aria-hidden="true" />
        <span>{display}</span>
      </button>
      <input
        ref={inputRef}
        id={id}
        className="ibs-date-picker__native"
        type="date"
        value={current}
        aria-hidden="true"
        tabIndex={-1}
        {...props}
        onChange={(event) => {
          setLocal(event.currentTarget.value);
          onChange?.(event);
        }}
      />
      {hint && <small>{hint}</small>}
    </div>
  );
}

export function FileUpload({
  label = 'Enviar arquivos',
  description = 'Arraste arquivos ou selecione no seu dispositivo.',
  accept,
  multiple = false,
  disabled = false,
  onFiles,
  className,
}: {
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
  className?: string;
}) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const commit = (files: FileList | null) => {
    if (files) onFiles?.(Array.from(files));
  };
  const drop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) commit(event.dataTransfer.files);
  };
  return (
    <label
      htmlFor={id}
      className={cx(
        'ibs-file-upload',
        dragging && 'ibs-file-upload--dragging',
        disabled && 'ibs-file-upload--disabled',
        className,
      )}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={drop}
    >
      <FileUp aria-hidden="true" />
      <strong>{label}</strong>
      <span>{description}</span>
      <input
        id={id}
        className="ibs-sr-only"
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => commit(event.currentTarget.files)}
      />
    </label>
  );
}

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';
export function Toast({
  title,
  description,
  tone = 'neutral',
  action,
  onDismiss,
  className,
}: {
  title: string;
  description?: string;
  tone?: ToastTone;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div className={cx('ibs-toast', `ibs-toast--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'}>
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {action}
      {onDismiss && (
        <IconButton label="Fechar notificação" icon={<X />} size="sm" variant="ghost" onClick={onDismiss} />
      )}
    </div>
  );
}

export type MultiSelectProps = {
  label: string;
  options: ComboboxOption[];
  value: string[];
  placeholder?: string;
  emptyMessage?: string;
  onValueChange?: (value: string[]) => void;
  className?: string;
};
export function MultiSelect({
  label,
  options,
  value,
  placeholder = 'Selecione opções',
  emptyMessage = 'Nenhum resultado',
  onValueChange,
  className,
}: MultiSelectProps) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const { controlRef, listRef, coords } = useFloatingList(open, () => setOpen(false));
  const selected = options.filter((item) => value.includes(item.value));
  const filtered = useMemo(
    () => options.filter((item) => item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [options, query],
  );
  const toggle = (item: ComboboxOption) => {
    if (item.disabled) return;
    const next = value.includes(item.value)
      ? value.filter((current) => current !== item.value)
      : [...value, item.value];
    onValueChange?.(next);
  };
  const listStyle: CSSProperties | undefined = coords
    ? { top: coords.top, left: coords.left, width: coords.width, maxHeight: coords.maxHeight }
    : undefined;
  const list = open ? (
    <ul
      ref={listRef}
      id={`${id}-list`}
      className="ibs-combobox__list ibs-combobox__list--floating"
      role="listbox"
      aria-multiselectable="true"
      style={listStyle}
    >
      {filtered.length ? (
        filtered.map((item) => (
          <li key={item.value} role="none" onMouseDown={(event) => event.preventDefault()}>
            <button
              type="button"
              role="option"
              aria-selected={value.includes(item.value)}
              disabled={item.disabled}
              onClick={() => toggle(item)}
            >
              <span>
                <strong>{item.label}</strong>
                {item.description && <small>{item.description}</small>}
              </span>
              {value.includes(item.value) && <Check aria-hidden="true" />}
            </button>
          </li>
        ))
      ) : (
        <li className="ibs-combobox__empty">{emptyMessage}</li>
      )}
    </ul>
  ) : null;
  return (
    <div className={cx('ibs-combobox', 'ibs-multiselect', className)}>
      <label id={`${id}-label`} htmlFor={id}>
        {label}
      </label>
      {selected.length > 0 && (
        <div className="ibs-multiselect__tags">
          {selected.map((item) => (
            <span className="ibs-tag ibs-tag--purple" key={item.value}>
              <span className="ibs-tag__label">{item.label}</span>
              <button
                type="button"
                className="ibs-tag__remove"
                aria-label={`Remover ${item.label}`}
                onClick={() => toggle(item)}
              >
                <X aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="ibs-combobox__control" ref={controlRef}>
        <Search aria-hidden="true" />
        <input
          id={id}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label`}
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);
          }}
        />
      </div>
      {list && createPortal(list, document.body)}
    </div>
  );
}

export type DateRangePickerProps = {
  label: string;
  startName?: string;
  endName?: string;
  hint?: string;
  className?: string;
};
function DateFieldTrigger({
  id,
  label,
  name,
  icon,
  placeholder = 'Selecione uma data',
}: {
  id: string;
  label: string;
  name?: string;
  icon: ReactNode;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState('');
  const display = current ? new Date(`${current}T00:00:00`).toLocaleDateString('pt-BR') : placeholder;
  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    try {
      input.showPicker?.();
    } catch {
      input.click();
    }
  };
  return (
    <span className="ibs-date-picker__control">
      <button
        type="button"
        className="ibs-date-picker__trigger"
        aria-label={label}
        data-placeholder={current ? undefined : 'true'}
        onClick={openPicker}
      >
        {icon}
        <span>{display}</span>
      </button>
      <input
        ref={inputRef}
        id={id}
        className="ibs-date-picker__native"
        name={name}
        type="date"
        value={current}
        aria-hidden="true"
        tabIndex={-1}
        onChange={(event) => setCurrent(event.currentTarget.value)}
      />
    </span>
  );
}
export function DateRangePicker({
  label,
  startName = 'start',
  endName = 'end',
  hint,
  className,
}: DateRangePickerProps) {
  const startId = useId();
  const endId = useId();
  return (
    <fieldset className={cx('ibs-date-range', className)}>
      <legend>{label}</legend>
      <div className="ibs-date-range__controls">
        <DateFieldTrigger
          id={startId}
          label={`${label} — início`}
          name={startName}
          icon={<CalendarRange aria-hidden="true" />}
        />
        <span className="ibs-date-range__separator" aria-hidden="true">
          –
        </span>
        <DateFieldTrigger
          id={endId}
          label={`${label} — fim`}
          name={endName}
          icon={<CalendarRange aria-hidden="true" />}
        />
      </div>
      {hint && <small>{hint}</small>}
    </fieldset>
  );
}

export type TimePickerProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  placeholder?: string;
};
export function TimePicker({
  label,
  hint,
  className,
  value,
  defaultValue,
  onChange,
  placeholder = '--:--',
  ...props
}: TimePickerProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [local, setLocal] = useState(typeof defaultValue === 'string' ? defaultValue : '');
  const current = typeof value === 'string' ? value : local;
  const display = current || placeholder;
  const openPicker = () => {
    const input = inputRef.current;
    if (!input || props.disabled) return;
    input.focus();
    try {
      input.showPicker?.();
    } catch {
      input.click();
    }
  };
  return (
    <div className={cx('ibs-date-picker', className)}>
      <span id={`${id}-label`}>{label}</span>
      <button
        type="button"
        className="ibs-date-picker__trigger"
        aria-labelledby={`${id}-label`}
        data-placeholder={current ? undefined : 'true'}
        disabled={props.disabled}
        onClick={openPicker}
      >
        <Clock aria-hidden="true" />
        <span>{display}</span>
      </button>
      <input
        ref={inputRef}
        id={id}
        className="ibs-date-picker__native"
        type="time"
        value={current}
        aria-hidden="true"
        tabIndex={-1}
        {...props}
        onChange={(event) => {
          setLocal(event.currentTarget.value);
          onChange?.(event);
        }}
      />
      {hint && <small>{hint}</small>}
    </div>
  );
}

export type EmptyStateProps = Parameters<typeof EmptyState>[0];
export type PopoverProps = Parameters<typeof Popover>[0];
export type SheetProps = Parameters<typeof Sheet>[0];
export type StepperProps = Parameters<typeof Stepper>[0];
export type ComboboxProps = Parameters<typeof Combobox>[0];
export type CommandPaletteProps = Parameters<typeof CommandPalette>[0];
export type DatePickerProps = Parameters<typeof DatePicker>[0];
export type FileUploadProps = Parameters<typeof FileUpload>[0];
export type ToastProps = Parameters<typeof Toast>[0];
