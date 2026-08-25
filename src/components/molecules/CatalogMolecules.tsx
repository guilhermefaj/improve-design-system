import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { ChevronLeft, ChevronRight, Ellipsis, File, GripVertical, X } from 'lucide-react';
import { Dialog as DialogPrimitive, DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { Button, IconButton } from '../Button';
import { Heading, Text } from '../Typography';
import { cx } from '../utils';

export const NativeSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function NativeSelect({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cx('ibs-input', 'ibs-native-select', className)} {...props}>
        {children}
      </select>
    );
  },
);

export type InputGroupProps = HTMLAttributes<HTMLDivElement> & {
  start?: ReactNode;
  end?: ReactNode;
};

export function InputGroup({ start, end, className, children, ...props }: InputGroupProps) {
  return (
    <div className={cx('ibs-input-group', className)} {...props}>
      {start && <span className="ibs-input-group__addon ibs-input-group__addon--start">{start}</span>}
      {children}
      {end && <span className="ibs-input-group__addon ibs-input-group__addon--end">{end}</span>}
    </div>
  );
}

export type InputOTPProps = {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  label: string;
  disabled?: boolean;
  className?: string;
};

export function InputOTP({ length = 6, value = '', onValueChange, label, disabled = false, className }: InputOTPProps) {
  const id = useId();
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = useMemo(() => Array.from({ length }, (_, index) => value[index] ?? ''), [length, value]);

  const commit = useCallback(
    (next: string[]) => {
      onValueChange?.(next.join('').slice(0, length));
    },
    [length, onValueChange],
  );

  const focusIndex = (index: number) => {
    refs.current[index]?.focus();
    refs.current[index]?.select();
  };

  const handleChange = (index: number, nextChar: string) => {
    const sanitized = nextChar.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = sanitized;
    commit(next);
    if (sanitized && index < length - 1) focusIndex(index + 1);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = '';
        commit(next);
      } else if (index > 0) {
        next[index - 1] = '';
        commit(next);
        focusIndex(index - 1);
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    onValueChange?.(pasted);
    focusIndex(Math.min(pasted.length, length - 1));
  };

  return (
    <div className={cx('ibs-otp', className)}>
      <span id={`${id}-label`} className="ibs-field__label">
        {label}
      </span>
      <div className="ibs-otp__slots" role="group" aria-labelledby={`${id}-label`}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              refs.current[index] = node;
            }}
            className="ibs-otp__slot"
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`${label} — dígito ${index + 1} de ${length}`}
            onChange={(event) => handleChange(index, event.currentTarget.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            onFocus={(event) => event.currentTarget.select()}
          />
        ))}
      </div>
    </div>
  );
}

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(function Table(
  { className, ...props },
  ref,
) {
  return (
    <div className="ibs-table-wrap">
      <table ref={ref} className={cx('ibs-table', className)} {...props} />
    </div>
  );
});

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader(props, ref) {
    return <thead ref={ref} {...props} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody(props, ref) {
    return <tbody ref={ref} {...props} />;
  },
);

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableFooter({ className, ...props }, ref) {
    return <tfoot ref={ref} className={cx('ibs-table__footer', className)} {...props} />;
  },
);

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow(
  { className, ...props },
  ref,
) {
  return <tr ref={ref} className={cx('ibs-table__row', className)} {...props} />;
});

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(function TableHead(
  { className, ...props },
  ref,
) {
  return <th ref={ref} className={cx('ibs-table__head', className)} {...props} />;
});

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td ref={ref} className={cx('ibs-table__cell', className)} {...props} />;
});

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cx('ibs-table__caption', className)} {...props} />;
  },
);

export function DropdownMenu({
  label = 'Mais ações',
  items,
}: {
  label?: string;
  items: Array<{ label: string; onSelect?: () => void; disabled?: boolean }>;
}) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <IconButton label={label} icon={<Ellipsis />} />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className="ibs-menu" align="end" sideOffset={8}>
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              className="ibs-menu__item"
              key={item.label}
              onSelect={item.onSelect}
              disabled={item.disabled}
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

export function AlertDialog({
  trigger,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'neutral',
  onConfirm,
}: {
  trigger: ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'neutral';
  onConfirm?: () => void;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ibs-dialog__overlay" />
        <DialogPrimitive.Content className={cx('ibs-dialog__content', 'ibs-alert-dialog', `ibs-alert-dialog--${tone}`)}>
          <DialogPrimitive.Title asChild>
            <Heading level={3} size={3}>
              {title}
            </Heading>
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description asChild>
              <Text tone="muted" style={{ marginTop: 'var(--ibs-space-3)' }}>
                {description}
              </Text>
            </DialogPrimitive.Description>
          )}
          <div className="ibs-cluster" style={{ justifyContent: 'flex-end', marginTop: 'var(--ibs-space-8)' }}>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost">{cancelLabel}</Button>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close asChild>
              <Button variant={tone === 'danger' ? 'primary' : 'primary'} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function Calendar({
  value,
  onValueChange,
  label,
  className,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  label: string;
  className?: string;
}) {
  const selected = parseDate(value);
  const [view, setView] = useState(() => selected ?? new Date());
  const monthLabel = view.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const firstDay = new Date(view.getFullYear(), view.getMonth(), 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const offset = firstDay.getDay();
  const cells: Array<{ day: number; date: Date } | null> = [];
  for (let index = 0; index < offset; index += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, date: new Date(view.getFullYear(), view.getMonth(), day) });
  }

  return (
    <div className={cx('ibs-calendar', className)} role="group" aria-label={label}>
      <div className="ibs-calendar__header">
        <IconButton
          label="Mês anterior"
          icon={<ChevronLeft />}
          size="sm"
          variant="ghost"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
        />
        <strong>{monthLabel}</strong>
        <IconButton
          label="Próximo mês"
          icon={<ChevronRight />}
          size="sm"
          variant="ghost"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
        />
      </div>
      <div className="ibs-calendar__weekdays">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="ibs-calendar__grid">
        {cells.map((cell, index) =>
          cell ? (
            <button
              key={`${cell.day}-${index}`}
              type="button"
              className={cx(
                'ibs-calendar__day',
                selected && formatDate(cell.date) === value && 'ibs-calendar__day--selected',
              )}
              aria-current={selected && formatDate(cell.date) === value ? 'date' : undefined}
              aria-label={cell.date.toLocaleDateString('pt-BR')}
              onClick={() => onValueChange?.(formatDate(cell.date))}
            >
              {cell.day}
            </button>
          ) : (
            <span key={`empty-${index}`} className="ibs-calendar__day ibs-calendar__day--empty" aria-hidden="true" />
          ),
        )}
      </div>
    </div>
  );
}

export function Drawer({
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
  side?: 'left' | 'right' | 'top' | 'bottom';
  footer?: ReactNode;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ibs-dialog__overlay" />
        <DialogPrimitive.Content className={cx('ibs-drawer', `ibs-drawer--${side}`)}>
          <header>
            <div>
              <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              {description && <DialogPrimitive.Description>{description}</DialogPrimitive.Description>}
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton
                className="ibs-drawer__close"
                label="Fechar painel"
                icon={<X />}
                variant="ghost"
                size="sm"
              />
            </DialogPrimitive.Close>
          </header>
          <div className="ibs-drawer__content">{children}</div>
          {footer && <footer>{footer}</footer>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export type AttachmentFile = { name: string; sizeLabel?: string; type?: string };

export function Attachment({
  files,
  onRemove,
  label = 'Anexos',
  className,
}: {
  files: AttachmentFile[];
  onRemove?: (index: number) => void;
  label?: string;
  className?: string;
}) {
  return (
    <ul className={cx('ibs-attachment', className)} aria-label={label}>
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="ibs-attachment__item">
          <File aria-hidden="true" />
          <span className="ibs-attachment__meta">
            <strong>{file.name}</strong>
            {(file.sizeLabel || file.type) && <small>{[file.type, file.sizeLabel].filter(Boolean).join(' · ')}</small>}
          </span>
          {onRemove && (
            <IconButton
              label={`Remover ${file.name}`}
              icon={<X />}
              size="sm"
              variant="ghost"
              onClick={() => onRemove(index)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export function Carousel({
  slides,
  label,
  index: controlledIndex,
  onIndexChange,
  className,
}: {
  slides: ReactNode[];
  label: string;
  index?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}) {
  const [localIndex, setLocalIndex] = useState(0);
  const index = controlledIndex ?? localIndex;
  const setIndex = (next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    setLocalIndex(bounded);
    onIndexChange?.(bounded);
  };

  return (
    <section className={cx('ibs-carousel', className)} aria-roledescription="carrossel" aria-label={label}>
      <div
        className="ibs-carousel__viewport"
        aria-live="polite"
        role="group"
        aria-label={`${label} — slide ${index + 1} de ${slides.length}`}
      >
        {slides[index]}
      </div>
      <div className="ibs-carousel__controls" role="group" aria-label={`${label} — controles`}>
        <IconButton
          label="Slide anterior"
          icon={<ChevronLeft />}
          size="sm"
          variant="ghost"
          disabled={index <= 0}
          onClick={() => setIndex(index - 1)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') setIndex(index - 1);
          }}
        />
        <span aria-hidden="true">
          {index + 1} / {slides.length}
        </span>
        <IconButton
          label="Próximo slide"
          icon={<ChevronRight />}
          size="sm"
          variant="ghost"
          disabled={index >= slides.length - 1}
          onClick={() => setIndex(index + 1)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') setIndex(index + 1);
          }}
        />
      </div>
    </section>
  );
}

export function Resizable({
  orientation = 'horizontal',
  defaultSizes = [50, 50],
  children,
  className,
}: {
  orientation?: 'horizontal' | 'vertical';
  defaultSizes?: [number, number];
  children: [ReactNode, ReactNode] | ReactNode;
  className?: string;
}) {
  const [sizes, setSizes] = useState(defaultSizes);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const kids = Array.isArray(children) ? children : [children, null];
  const [first, second] = kids as [ReactNode, ReactNode];

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ratio =
        orientation === 'horizontal'
          ? ((event.clientX - rect.left) / rect.width) * 100
          : ((event.clientY - rect.top) / rect.height) * 100;
      const next = Math.min(85, Math.max(15, ratio));
      setSizes([next, 100 - next]);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [orientation]);

  return (
    <div
      ref={containerRef}
      className={cx('ibs-resizable', `ibs-resizable--${orientation}`, className)}
      data-orientation={orientation}
    >
      <div className="ibs-resizable__panel" style={{ flexBasis: `${sizes[0]}%` }}>
        {first}
      </div>
      <button
        type="button"
        className="ibs-resizable__handle"
        aria-label="Redimensionar painéis"
        data-orientation={orientation}
        onMouseDown={() => {
          dragging.current = true;
        }}
        onKeyDown={(event) => {
          const delta =
            event.key === 'ArrowRight' || event.key === 'ArrowDown'
              ? 2
              : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                ? -2
                : 0;
          if (!delta) return;
          event.preventDefault();
          setSizes(([a]) => {
            const nextA = Math.min(85, Math.max(15, a + delta));
            return [nextA, 100 - nextA];
          });
        }}
      >
        <GripVertical aria-hidden="true" />
      </button>
      <div className="ibs-resizable__panel" style={{ flexBasis: `${sizes[1]}%` }}>
        {second}
      </div>
    </div>
  );
}

export function NavigationMenu({
  items,
  label = 'Navegação',
  className,
}: {
  items: Array<{ label: string; href: string; current?: boolean }>;
  label?: string;
  className?: string;
}) {
  return (
    <nav className={cx('ibs-navigation-menu', className)} aria-label={label}>
      <ul>
        {items.map((item) => (
          <li key={`${item.label}-${item.href}`}>
            <a href={item.href} aria-current={item.current ? 'page' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type QuestionnaireStep = { id: string; question: string; description?: string };

export function Questionnaire({
  steps,
  index,
  onIndexChange,
  children,
  onComplete,
  className,
}: {
  steps: QuestionnaireStep[];
  index: number;
  onIndexChange?: (index: number) => void;
  children?: ReactNode;
  onComplete?: () => void;
  className?: string;
}) {
  const step = steps[index];
  const progress = ((index + 1) / steps.length) * 100;
  const isLast = index >= steps.length - 1;

  return (
    <div className={cx('ibs-questionnaire', className)}>
      <div
        className="ibs-questionnaire__progress"
        role="progressbar"
        aria-label={`Progresso do questionário: pergunta ${index + 1} de ${steps.length}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      {step && (
        <header className="ibs-questionnaire__header">
          <Text tone="muted">
            Pergunta {index + 1} de {steps.length}
          </Text>
          <Heading level={3} size={4}>
            {step.question}
          </Heading>
          {step.description && <Text tone="muted">{step.description}</Text>}
        </header>
      )}
      <div className="ibs-questionnaire__body">{children}</div>
      <footer className="ibs-questionnaire__footer">
        <Button variant="ghost" disabled={index <= 0} onClick={() => onIndexChange?.(index - 1)}>
          Voltar
        </Button>
        {isLast ? (
          <Button variant="primary" onClick={onComplete}>
            Concluir
          </Button>
        ) : (
          <Button variant="primary" onClick={() => onIndexChange?.(index + 1)}>
            Continuar
          </Button>
        )}
      </footer>
    </div>
  );
}

export type NativeSelectProps = React.ComponentPropsWithoutRef<typeof NativeSelect>;
export type DropdownMenuProps = Parameters<typeof DropdownMenu>[0];
export type AlertDialogProps = Parameters<typeof AlertDialog>[0];
export type CalendarProps = Parameters<typeof Calendar>[0];
export type DrawerProps = Parameters<typeof Drawer>[0];
export type AttachmentProps = Parameters<typeof Attachment>[0];
export type CarouselProps = Parameters<typeof Carousel>[0];
export type ResizableProps = Parameters<typeof Resizable>[0];
export type NavigationMenuProps = Parameters<typeof NavigationMenu>[0];
export type QuestionnaireProps = Parameters<typeof Questionnaire>[0];
export type TableProps = React.ComponentPropsWithoutRef<typeof Table>;
export type TableHeaderProps = React.ComponentPropsWithoutRef<typeof TableHeader>;
export type TableBodyProps = React.ComponentPropsWithoutRef<typeof TableBody>;
export type TableFooterProps = React.ComponentPropsWithoutRef<typeof TableFooter>;
export type TableRowProps = React.ComponentPropsWithoutRef<typeof TableRow>;
export type TableHeadProps = React.ComponentPropsWithoutRef<typeof TableHead>;
export type TableCellProps = React.ComponentPropsWithoutRef<typeof TableCell>;
export type TableCaptionProps = React.ComponentPropsWithoutRef<typeof TableCaption>;
