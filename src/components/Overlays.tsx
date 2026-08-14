import type { ReactNode } from 'react';
import { ChevronDown, Ellipsis, Plus, X } from 'lucide-react';
import {
  Accordion as AccordionPrimitive,
  Collapsible as CollapsiblePrimitive,
  ContextMenu as ContextMenuPrimitive,
  Dialog as DialogPrimitive,
  DropdownMenu,
  HoverCard as HoverCardPrimitive,
  Tabs as TabsPrimitive,
  Tooltip as TooltipPrimitive,
} from 'radix-ui';
import { Button, IconButton } from './Button';
import { Heading, Text } from './Typography';

export type AccordionItem = { value: string; title: string; content: ReactNode };
export function Accordion({ items, defaultValue }: { items: AccordionItem[]; defaultValue?: string }) {
  return (
    <AccordionPrimitive.Root className="ibs-accordion" type="single" collapsible defaultValue={defaultValue}>
      {items.map((item) => (
        <AccordionPrimitive.Item className="ibs-accordion__item" value={item.value} key={item.value}>
          <AccordionPrimitive.Header style={{ margin: 0 }}>
            <AccordionPrimitive.Trigger className="ibs-accordion__trigger">
              <span>{item.title}</span>
              <Plus aria-hidden="true" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="ibs-accordion__content">
            <div>{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

export type TabItem = { value: string; label: string; content: ReactNode };
export function Tabs({ items, defaultValue }: { items: TabItem[]; defaultValue?: string }) {
  return (
    <TabsPrimitive.Root className="ibs-tabs" defaultValue={defaultValue ?? items[0]?.value}>
      <TabsPrimitive.List className="ibs-tabs__list" aria-label="Seções">
        {items.map((item) => (
          <TabsPrimitive.Trigger className="ibs-tabs__trigger" value={item.value} key={item.value}>
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content className="ibs-tabs__content" value={item.value} key={item.value}>
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}

export function Dialog({
  trigger,
  title,
  description,
  children,
  actionLabel = 'Confirmar',
}: {
  trigger: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  actionLabel?: string;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ibs-dialog__overlay" />
        <DialogPrimitive.Content className="ibs-dialog__content">
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
          {children && <div style={{ marginTop: 'var(--ibs-space-6)' }}>{children}</div>}
          <div className="ibs-cluster" style={{ justifyContent: 'flex-end', marginTop: 'var(--ibs-space-8)' }}>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogPrimitive.Close>
            <Button variant="primary">{actionLabel}</Button>
          </div>
          <DialogPrimitive.Close asChild>
            <IconButton className="ibs-dialog__close" label="Fechar" icon={<X />} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className="ibs-tooltip" sideOffset={8}>
            {label}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export function ActionMenu({
  label = 'Mais ações',
  items,
}: {
  label?: string;
  items: Array<{ label: string; onSelect?: () => void; disabled?: boolean }>;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton label={label} icon={<Ellipsis />} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="ibs-menu" align="end" sideOffset={8}>
          {items.map((item) => (
            <DropdownMenu.Item
              className="ibs-menu__item"
              key={item.label}
              onSelect={item.onSelect}
              disabled={item.disabled}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function SelectMenu({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; onSelect?: () => void }>;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" trailingIcon={<ChevronDown />}>
          {label}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="ibs-menu" align="start" sideOffset={8}>
          {items.map((item) => (
            <DropdownMenu.Item className="ibs-menu__item" key={item.label} onSelect={item.onSelect}>
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function HoverCard({
  trigger,
  children,
  align = 'center',
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
}) {
  return (
    <HoverCardPrimitive.Root openDelay={200} closeDelay={120}>
      <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content className="ibs-popover" align={align} sideOffset={8}>
          <div>{children}</div>
          <HoverCardPrimitive.Arrow className="ibs-popover__arrow" />
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

export type ContextMenuOption = { label: string; onSelect?: () => void; disabled?: boolean };
export function ContextMenu({
  children,
  items,
  label = 'Menu de contexto',
}: {
  children: ReactNode;
  items: ContextMenuOption[];
  label?: string;
}) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger asChild>{children}</ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content className="ibs-menu" aria-label={label}>
          {items.map((item) => (
            <ContextMenuPrimitive.Item
              className="ibs-menu__item"
              key={item.label}
              onSelect={item.onSelect}
              disabled={item.disabled}
            >
              {item.label}
            </ContextMenuPrimitive.Item>
          ))}
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}

export function Collapsible({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <CollapsiblePrimitive.Root className="ibs-collapsible" defaultOpen={defaultOpen}>
      <CollapsiblePrimitive.Trigger className="ibs-collapsible__trigger">
        <span>{label}</span>
        <ChevronDown aria-hidden="true" />
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="ibs-collapsible__content">
        <div>{children}</div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}

export type AccordionProps = Parameters<typeof Accordion>[0];
export type HoverCardProps = Parameters<typeof HoverCard>[0];
export type ContextMenuProps = Parameters<typeof ContextMenu>[0];
export type CollapsibleProps = Parameters<typeof Collapsible>[0];
export type TabsProps = Parameters<typeof Tabs>[0];
export type DialogProps = Parameters<typeof Dialog>[0];
export type TooltipProps = Parameters<typeof Tooltip>[0];
export type ActionMenuProps = Parameters<typeof ActionMenu>[0];
export type SelectMenuProps = Parameters<typeof SelectMenu>[0];
