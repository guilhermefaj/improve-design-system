import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from './Button';
import { Container } from './Layout';
import { ImproveLogo } from './Logo';

export type NavItem = { label: string; href: string; current?: boolean };
export type NavigationAction = { label: string; href: string };
export type SiteHeaderProps = { items: NavItem[]; action?: NavigationAction; utilities?: ReactNode };
export type FooterProps = { description: string; links: NavItem[]; social: NavItem[]; children?: ReactNode };
export function SiteHeader({
  items,
  action = { label: 'Vamos conversar', href: '#contato' },
  utilities,
}: SiteHeaderProps) {
  return (
    <header className="ibs-header">
      <Container className="ibs-header__inner">
        <ImproveLogo />
        <nav className="ibs-header__nav" aria-label="Navegação principal">
          {items.map((item) => (
            <a href={item.href} key={item.label} aria-current={item.current ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ibs-header__actions">
          {utilities}
          <ButtonLink
            className="ibs-no-print"
            href={action.href}
            variant="primary"
            size="sm"
            trailingIcon={<ArrowUpRight />}
          >
            {action.label}
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}

export function Footer({ description, links, social, children }: FooterProps) {
  return (
    <footer className="ibs-footer" id="contato">
      <Container>
        <div className="ibs-footer__grid">
          <div>
            <ImproveLogo />
            <p className="ibs-text ibs-text--muted" style={{ marginTop: 'var(--ibs-space-5)' }}>
              {description}
            </p>
            {children}
          </div>
          <nav className="ibs-footer__nav" aria-label="Improve">
            <strong>Improve</strong>
            {links.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="ibs-footer__nav" aria-label="Redes sociais">
            <strong>Social</strong>
            {social.map((item) => (
              <a href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="ibs-footer__bottom">
          © {new Date().getFullYear()} Improve Business. Transformação com propósito.
        </div>
      </Container>
    </footer>
  );
}
