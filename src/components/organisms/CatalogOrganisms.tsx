import { useEffect, useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Menubar as MenubarPrimitive } from 'radix-ui';
import { cx } from '../utils';

export function Menubar({
  menus,
  label = 'Barra de menus',
  className,
}: {
  menus: Array<{ label: string; items: Array<{ label: string; onSelect?: () => void; disabled?: boolean }> }>;
  label?: string;
  className?: string;
}) {
  return (
    <MenubarPrimitive.Root className={cx('ibs-menubar', className)} aria-label={label}>
      {menus.map((menu) => (
        <MenubarPrimitive.Menu key={menu.label}>
          <MenubarPrimitive.Trigger className="ibs-menubar__trigger">
            {menu.label}
            <ChevronDown aria-hidden="true" />
          </MenubarPrimitive.Trigger>
          <MenubarPrimitive.Portal>
            <MenubarPrimitive.Content className="ibs-menu" align="start" sideOffset={8}>
              {menu.items.map((item) => (
                <MenubarPrimitive.Item
                  className="ibs-menu__item"
                  key={item.label}
                  onSelect={item.onSelect}
                  disabled={item.disabled}
                >
                  {item.label}
                </MenubarPrimitive.Item>
              ))}
            </MenubarPrimitive.Content>
          </MenubarPrimitive.Portal>
        </MenubarPrimitive.Menu>
      ))}
    </MenubarPrimitive.Root>
  );
}

export type BubbleRole = 'human' | 'agent';

export function Bubble({
  speaker,
  children,
  name,
  timestamp,
  continued = false,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  speaker: BubbleRole;
  name?: string;
  timestamp?: string;
  /** When true, hides the name (and tightens spacing) for consecutive messages from the same speaker. */
  continued?: boolean;
}) {
  const showMeta = Boolean(!continued && (name || timestamp));
  const ariaLabel = name ? (continued ? `Mensagem continuada de ${name}` : `Mensagem de ${name}`) : undefined;

  return (
    <article
      className={cx('ibs-bubble', `ibs-bubble--${speaker}`, continued && 'ibs-bubble--continued', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {showMeta && (
        <header className="ibs-bubble__meta">
          {name && <strong>{name}</strong>}
          {timestamp && <time dateTime={timestamp}>{timestamp}</time>}
        </header>
      )}
      <div className="ibs-bubble__body">
        <div className="ibs-bubble__content">{children}</div>
      </div>
    </article>
  );
}

export function Message({
  author,
  children,
  streaming = false,
  continued = false,
  className,
}: {
  author: { name: string; role?: BubbleRole };
  children: ReactNode;
  streaming?: boolean;
  continued?: boolean;
  className?: string;
}) {
  return (
    <Bubble
      speaker={author.role ?? 'human'}
      name={author.name}
      continued={continued}
      className={cx('ibs-message', className)}
    >
      <div className="ibs-message__body">{children}</div>
      {streaming && (
        <span className="ibs-message__streaming" aria-live="polite">
          <span className="ibs-streaming-message__cursor" aria-hidden="true" />
          <span className="ibs-sr-only">Gerando resposta…</span>
        </span>
      )}
    </Bubble>
  );
}

export function MessageScroller({
  children,
  stickToBottom = true,
  className,
  tabIndex,
  role,
  ...props
}: HTMLAttributes<HTMLDivElement> & { stickToBottom?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const labelled = Boolean(props['aria-label'] || props['aria-labelledby']);

  useEffect(() => {
    if (!stickToBottom || !ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [children, stickToBottom]);

  return (
    <div
      ref={ref}
      {...props}
      role={role ?? (labelled ? 'region' : undefined)}
      tabIndex={tabIndex ?? (labelled ? 0 : undefined)}
      className={cx('ibs-message-scroller', className)}
    >
      {children}
    </div>
  );
}

export type MenubarProps = Parameters<typeof Menubar>[0];
export type BubbleProps = Parameters<typeof Bubble>[0];
export type MessageProps = Parameters<typeof Message>[0];
export type MessageScrollerProps = Parameters<typeof MessageScroller>[0];
