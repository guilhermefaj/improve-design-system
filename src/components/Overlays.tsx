import type { ReactNode } from 'react';
import { ChevronDown, Ellipsis, Plus, X } from 'lucide-react';
import { Accordion as AccordionPrimitive, Dialog as DialogPrimitive, DropdownMenu, Tabs as TabsPrimitive, Tooltip as TooltipPrimitive } from 'radix-ui';
import { Button, IconButton } from './Button';
import { Heading, Text } from './Typography';

export type AccordionItem = { value: string; title: string; content: ReactNode };
export function Accordion({ items, defaultValue }: { items: AccordionItem[]; defaultValue?: string }) {
  return <AccordionPrimitive.Root className="ibs-accordion" type="single" collapsible defaultValue={defaultValue}>{items.map((item) => <AccordionPrimitive.Item className="ibs-accordion__item" value={item.value} key={item.value}><AccordionPrimitive.Header style={{ margin: 0 }}><AccordionPrimitive.Trigger className="ibs-accordion__trigger"><span>{item.title}</span><Plus aria-hidden="true" /></AccordionPrimitive.Trigger></AccordionPrimitive.Header><AccordionPrimitive.Content className="ibs-accordion__content"><div>{item.content}</div></AccordionPrimitive.Content></AccordionPrimitive.Item>)}</AccordionPrimitive.Root>;
}

export type TabItem = { value: string; label: string; content: ReactNode };
export function Tabs({ items, defaultValue }: { items: TabItem[]; defaultValue?: string }) {
  return <TabsPrimitive.Root className="ibs-tabs" defaultValue={defaultValue ?? items[0]?.value}><TabsPrimitive.List className="ibs-tabs__list" aria-label="Seções">{items.map((item) => <TabsPrimitive.Trigger className="ibs-tabs__trigger" value={item.value} key={item.value}>{item.label}</TabsPrimitive.Trigger>)}</TabsPrimitive.List>{items.map((item) => <TabsPrimitive.Content className="ibs-tabs__content" value={item.value} key={item.value}>{item.content}</TabsPrimitive.Content>)}</TabsPrimitive.Root>;
}

export function Dialog({ trigger, title, description, children, actionLabel = 'Confirmar' }: { trigger: ReactNode; title: string; description?: string; children?: ReactNode; actionLabel?: string }) {
  return <DialogPrimitive.Root><DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger><DialogPrimitive.Portal><DialogPrimitive.Overlay className="ibs-dialog__overlay" /><DialogPrimitive.Content className="ibs-dialog__content"><DialogPrimitive.Title asChild><Heading level={3} size={3}>{title}</Heading></DialogPrimitive.Title>{description && <DialogPrimitive.Description asChild><Text tone="muted" style={{ marginTop: 'var(--ibs-space-3)' }}>{description}</Text></DialogPrimitive.Description>}{children && <div style={{ marginTop: 'var(--ibs-space-6)' }}>{children}</div>}<div className="ibs-cluster" style={{ justifyContent: 'flex-end', marginTop: 'var(--ibs-space-8)' }}><DialogPrimitive.Close asChild><Button variant="ghost">Cancelar</Button></DialogPrimitive.Close><Button variant="primary">{actionLabel}</Button></div><DialogPrimitive.Close asChild><IconButton className="ibs-dialog__close" label="Fechar" icon={<X />} /></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>;
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={300}><TooltipPrimitive.Root><TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger><TooltipPrimitive.Portal><TooltipPrimitive.Content className="ibs-tooltip" sideOffset={8}>{label}</TooltipPrimitive.Content></TooltipPrimitive.Portal></TooltipPrimitive.Root></TooltipPrimitive.Provider>;
}

export function ActionMenu({ label = 'Mais ações', items }: { label?: string; items: Array<{ label: string; onSelect?: () => void; disabled?: boolean }> }) {
  return <DropdownMenu.Root><DropdownMenu.Trigger asChild><IconButton label={label} icon={<Ellipsis />} /></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="ibs-menu" align="end" sideOffset={8}>{items.map((item) => <DropdownMenu.Item className="ibs-menu__item" key={item.label} onSelect={item.onSelect} disabled={item.disabled}>{item.label}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}

export function SelectMenu({ label, items }: { label: string; items: Array<{ label: string; onSelect?: () => void }> }) {
  return <DropdownMenu.Root><DropdownMenu.Trigger asChild><Button variant="outline" trailingIcon={<ChevronDown />}>{label}</Button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="ibs-menu" align="start" sideOffset={8}>{items.map((item) => <DropdownMenu.Item className="ibs-menu__item" key={item.label} onSelect={item.onSelect}>{item.label}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}
