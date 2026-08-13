import { useId, useMemo, useState } from 'react';
import type { DragEvent, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { CalendarDays, Check, ChevronRight, Command, FileUp, Inbox, Search, X } from 'lucide-react';
import { Dialog as DialogPrimitive, Popover as PopoverPrimitive } from 'radix-ui';
import { Button, IconButton } from '../Button';
import { Heading, Text } from '../Typography';
import { cx } from '../utils';

export function EmptyState({ icon = <Inbox />, title, description, action, compact = false, className, ...props }: HTMLAttributes<HTMLDivElement> & { icon?: ReactNode; title: string; description?: ReactNode; action?: ReactNode; compact?: boolean }) {
  return <div className={cx('ibs-empty-state', compact && 'ibs-empty-state--compact', className)} {...props}><span className="ibs-empty-state__icon" aria-hidden="true">{icon}</span><Heading level={3} size={4}>{title}</Heading>{description && <Text tone="muted">{description}</Text>}{action}</div>;
}

export function Popover({ trigger, title, children, align = 'center' }: { trigger: ReactNode; title?: string; children: ReactNode; align?: 'start' | 'center' | 'end' }) {
  return <PopoverPrimitive.Root><PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger><PopoverPrimitive.Portal><PopoverPrimitive.Content className="ibs-popover" align={align} sideOffset={8}>{title && <strong>{title}</strong>}<div>{children}</div><PopoverPrimitive.Arrow className="ibs-popover__arrow" /></PopoverPrimitive.Content></PopoverPrimitive.Portal></PopoverPrimitive.Root>;
}

export function Sheet({ trigger, title, description, children, side = 'right', footer }: { trigger: ReactNode; title: string; description?: string; children?: ReactNode; side?: 'left' | 'right'; footer?: ReactNode }) {
  return <DialogPrimitive.Root><DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger><DialogPrimitive.Portal><DialogPrimitive.Overlay className="ibs-dialog__overlay" /><DialogPrimitive.Content className={cx('ibs-sheet', `ibs-sheet--${side}`)}><header><div><DialogPrimitive.Title>{title}</DialogPrimitive.Title>{description && <DialogPrimitive.Description>{description}</DialogPrimitive.Description>}</div><DialogPrimitive.Close asChild><IconButton className="ibs-sheet__close" label="Fechar painel" icon={<X />} variant="ghost" /></DialogPrimitive.Close></header><div className="ibs-sheet__content">{children}</div>{footer && <footer>{footer}</footer>}</DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>;
}

export type StepperItem = { id: string; label: string; description?: string; optional?: boolean };
export function Stepper({ items, active, orientation = 'horizontal', onStepChange, label = 'Progresso' }: { items: StepperItem[]; active: number; orientation?: 'horizontal' | 'vertical'; onStepChange?: (index: number) => void; label?: string }) {
  return <ol className={cx('ibs-stepper', `ibs-stepper--${orientation}`)} aria-label={label}>{items.map((item, index) => { const status = index < active ? 'complete' : index === active ? 'current' : 'upcoming'; return <li key={item.id} className={`ibs-stepper__item ibs-stepper__item--${status}`} aria-current={status === 'current' ? 'step' : undefined}><button type="button" onClick={() => onStepChange?.(index)} disabled={!onStepChange}><span>{status === 'complete' ? <Check aria-hidden="true" /> : index + 1}</span><span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}{item.optional && <small>Opcional</small>}</span></button></li>; })}</ol>;
}

export type ComboboxOption = { value: string; label: string; description?: string; disabled?: boolean };
export function Combobox({ label, options, value, placeholder = 'Selecione uma opção', emptyMessage = 'Nenhum resultado', onValueChange, className }: { label: string; options: ComboboxOption[]; value?: string; placeholder?: string; emptyMessage?: string; onValueChange?: (value: string) => void; className?: string }) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = options.find((item) => item.value === value);
  const filtered = useMemo(() => options.filter((item) => item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [options, query]);
  const select = (item: ComboboxOption) => { if (item.disabled) return; onValueChange?.(item.value); setOpen(false); setQuery(''); };
  const move = (direction: 1 | -1) => {
    if (!filtered.length) return;
    let next = activeIndex;
    do next = (next + direction + filtered.length) % filtered.length;
    while (filtered[next]?.disabled && next !== activeIndex);
    setActiveIndex(next);
  };
  return <div className={cx('ibs-combobox', className)}><label id={`${id}-label`} htmlFor={id}>{label}</label><div className="ibs-combobox__control"><Search aria-hidden="true" /><input id={id} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-list`} aria-activedescendant={open && filtered[activeIndex] ? `${id}-option-${activeIndex}` : undefined} aria-labelledby={`${id}-label`} value={open ? query : selected?.label ?? ''} placeholder={placeholder} onFocus={() => { setOpen(true); setQuery(''); setActiveIndex(0); }} onChange={(event) => { setQuery(event.currentTarget.value); setOpen(true); setActiveIndex(0); }} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); move(1); } else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); move(-1); } else if (event.key === 'Enter' && open && filtered[activeIndex]) { event.preventDefault(); select(filtered[activeIndex]); } else if (event.key === 'Escape') { event.preventDefault(); setOpen(false); } }} /></div>{open && <ul id={`${id}-list`} className="ibs-combobox__list" role="listbox">{filtered.length ? filtered.map((item, index) => <li key={item.value} role="none" onMouseDown={(event) => event.preventDefault()}><button id={`${id}-option-${index}`} type="button" role="option" aria-selected={item.value === value} disabled={item.disabled} tabIndex={-1} className={index === activeIndex ? 'is-active' : undefined} onMouseEnter={() => setActiveIndex(index)} onClick={() => select(item)}><span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span>{item.value === value && <Check aria-hidden="true" />}</button></li>) : <li className="ibs-combobox__empty">{emptyMessage}</li>}</ul>}</div>;
}

export type CommandItem = { id: string; label: string; description?: string; icon?: ReactNode; shortcut?: string; keywords?: string[]; disabled?: boolean; onSelect?: () => void };
export function CommandPalette({ trigger, items, title = 'Comandos', placeholder = 'Buscar ação…' }: { trigger: ReactNode; items: CommandItem[]; title?: string; placeholder?: string }) {
  const [query, setQuery] = useState('');
  const matches = items.filter((item) => [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <DialogPrimitive.Root><DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger><DialogPrimitive.Portal><DialogPrimitive.Overlay className="ibs-dialog__overlay" /><DialogPrimitive.Content className="ibs-command"><DialogPrimitive.Title className="ibs-sr-only">{title}</DialogPrimitive.Title><div className="ibs-command__search"><Search aria-hidden="true" /><input autoFocus value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder={placeholder} aria-label={placeholder} /><DialogPrimitive.Close asChild><IconButton label="Fechar comandos" icon={<X />} size="sm" variant="ghost" /></DialogPrimitive.Close></div><div className="ibs-command__results" role="listbox">{matches.length ? matches.map((item) => <button type="button" role="option" aria-selected="false" key={item.id} disabled={item.disabled} onClick={item.onSelect}><span className="ibs-command__icon" aria-hidden="true">{item.icon ?? <Command />}</span><span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span>{item.shortcut && <kbd>{item.shortcut}</kbd>}<ChevronRight aria-hidden="true" /></button>) : <EmptyState compact title="Nada encontrado" description="Tente outro termo." />}</div></DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>;
}

export function DatePicker({ label, hint, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  const id = useId();
  return <label className={cx('ibs-date-picker', className)} htmlFor={id}><span>{label}</span><span className="ibs-date-picker__control"><CalendarDays aria-hidden="true" /><input id={id} type="date" {...props} /></span>{hint && <small>{hint}</small>}</label>;
}

export function FileUpload({ label = 'Enviar arquivos', description = 'Arraste arquivos ou selecione no seu dispositivo.', accept, multiple = false, disabled = false, onFiles, className }: { label?: string; description?: string; accept?: string; multiple?: boolean; disabled?: boolean; onFiles?: (files: File[]) => void; className?: string }) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const commit = (files: FileList | null) => { if (files) onFiles?.(Array.from(files)); };
  const drop = (event: DragEvent<HTMLLabelElement>) => { event.preventDefault(); setDragging(false); if (!disabled) commit(event.dataTransfer.files); };
  return <label htmlFor={id} className={cx('ibs-file-upload', dragging && 'ibs-file-upload--dragging', disabled && 'ibs-file-upload--disabled', className)} onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop}><FileUp aria-hidden="true" /><strong>{label}</strong><span>{description}</span><input id={id} className="ibs-sr-only" type="file" accept={accept} multiple={multiple} disabled={disabled} onChange={(event) => commit(event.currentTarget.files)} /></label>;
}

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';
export function Toast({ title, description, tone = 'neutral', action, onDismiss, className }: { title: string; description?: string; tone?: ToastTone; action?: ReactNode; onDismiss?: () => void; className?: string }) {
  return <div className={cx('ibs-toast', `ibs-toast--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'}><div><strong>{title}</strong>{description && <p>{description}</p>}</div>{action}{onDismiss && <IconButton label="Fechar notificação" icon={<X />} size="sm" variant="ghost" onClick={onDismiss} />}</div>;
}
