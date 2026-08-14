import type { HTMLAttributes, ReactNode } from 'react';
import {
  ArrowRightLeft,
  Box,
  CircleCheck,
  ExternalLink,
  FileText,
  Link2,
  Radio,
  ShieldCheck,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Button, ButtonLink } from './Button';
import { AgentStatus, type AgentEvent, type AgentRunStatus } from './Agentic';
import { cx } from './utils';

export type ArtifactDescriptor = {
  title: string;
  type: string;
  version?: string;
  author?: string;
  size?: string;
  href?: string;
};

export function ArtifactCard({
  artifact,
  onOpen,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { artifact: ArtifactDescriptor; onOpen?: () => void }) {
  return (
    <article className={cx('ibs-artifact-card', className)} {...props}>
      <span className="ibs-artifact-card__icon">
        <FileText aria-hidden="true" />
      </span>
      <div>
        <strong>{artifact.title}</strong>
        <p>{[artifact.type, artifact.version, artifact.size].filter(Boolean).join(' · ')}</p>
        {artifact.author && <small>Criado por {artifact.author}</small>}
      </div>
      {artifact.href ? (
        <ButtonLink variant="outline" size="sm" href={artifact.href} trailingIcon={<ExternalLink />}>
          Abrir
        </ButtonLink>
      ) : onOpen ? (
        <Button variant="outline" size="sm" onClick={onOpen}>
          Abrir
        </Button>
      ) : null}
    </article>
  );
}

export function ArtifactPreview({
  artifact,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { artifact: ArtifactDescriptor; children: ReactNode }) {
  return (
    <section className={cx('ibs-artifact-preview', className)} aria-label={`Prévia de ${artifact.title}`} {...props}>
      <header>
        <Box aria-hidden="true" />
        <div>
          <strong>{artifact.title}</strong>
          <small>
            {artifact.type}
            {artifact.version && ` · ${artifact.version}`}
          </small>
        </div>
      </header>
      <div className="ibs-artifact-preview__content">{children}</div>
    </section>
  );
}

export type CitationItem = {
  id: string;
  title: string;
  source: string;
  href: string;
  summary?: string;
  verified?: boolean;
};

export function CitationList({
  items,
  className,
  ...props
}: HTMLAttributes<HTMLOListElement> & { items: CitationItem[] }) {
  return (
    <ol className={cx('ibs-citation-list', className)} aria-label="Fontes" {...props}>
      {items.map((item, index) => (
        <li key={item.id}>
          <span>{index + 1}</span>
          <div>
            <a href={item.href}>
              {item.title}
              <ExternalLink aria-hidden="true" />
            </a>
            <small>
              {item.source}
              {item.verified && (
                <>
                  {' '}
                  · <CircleCheck aria-hidden="true" /> Verificada
                </>
              )}
            </small>
            {item.summary && <p>{item.summary}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export type PermissionScopeProps = HTMLAttributes<HTMLElement> & {
  resource: string;
  permissions: string[];
  duration: 'once' | 'session' | 'persistent';
  status?: 'requested' | 'granted' | 'revoked';
  onRevoke?: () => void;
};

const durationLabels = { once: 'Uma vez', session: 'Durante esta sessão', persistent: 'Até ser revogada' };

export function PermissionScope({
  resource,
  permissions,
  duration,
  status = 'requested',
  onRevoke,
  className,
  ...props
}: PermissionScopeProps) {
  return (
    <section
      className={cx('ibs-permission-scope', `ibs-permission-scope--${status}`, className)}
      aria-label={`Permissão para ${resource}`}
      {...props}
    >
      <header>
        <ShieldCheck aria-hidden="true" />
        <div>
          <strong>{resource}</strong>
          <small>
            {durationLabels[duration]} ·{' '}
            {status === 'granted' ? 'Concedida' : status === 'revoked' ? 'Revogada' : 'Solicitada'}
          </small>
        </div>
      </header>
      <ul>
        {permissions.map((permission) => (
          <li key={permission}>{permission}</li>
        ))}
      </ul>
      {status === 'granted' && onRevoke && (
        <Button variant="outline" size="sm" onClick={onRevoke}>
          Revogar acesso
        </Button>
      )}
    </section>
  );
}

export function AgentHandoff({
  from,
  to,
  reason,
  context,
  status = 'running',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  from: string;
  to: string;
  reason: string;
  context?: string;
  status?: AgentRunStatus;
}) {
  return (
    <section
      className={cx('ibs-agent-handoff', className)}
      aria-label={`Transferência de ${from} para ${to}`}
      {...props}
    >
      <header>
        <span>{from}</span>
        <ArrowRightLeft aria-hidden="true" />
        <span>{to}</span>
        <AgentStatus status={status} compact live="off" />
      </header>
      <p>
        <strong>Motivo:</strong> {reason}
      </p>
      {context && (
        <details className="ibs-disclosure">
          <summary>Contexto transferido</summary>
          <p>{context}</p>
        </details>
      )}
    </section>
  );
}

export function GeneratedUIBoundary({
  title,
  source = 'UI gerada',
  status = 'succeeded',
  children,
  fallback,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  title: string;
  source?: string;
  status?: AgentRunStatus;
  children?: ReactNode;
  fallback?: ReactNode;
}) {
  const failed = status === 'failed' || status === 'cancelled';
  return (
    <section className={cx('ibs-generated-boundary', className)} aria-label={title} {...props}>
      <header>
        <Box aria-hidden="true" />
        <div>
          <strong>{title}</strong>
          <small>{source}</small>
        </div>
        <AgentStatus status={status} compact live="off" />
      </header>
      <div className="ibs-generated-boundary__content">
        {failed ? (fallback ?? <p>Este conteúdo não pôde ser carregado.</p>) : children}
      </div>
    </section>
  );
}

export type McpConnectionStatus = 'connecting' | 'connected' | 'failed' | 'disconnected';

export function McpAppFrame({
  name,
  server,
  status,
  children,
  fallback,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  name: string;
  server: string;
  status: McpConnectionStatus;
  children?: ReactNode;
  fallback?: ReactNode;
}) {
  const connected = status === 'connected';
  const Icon = connected ? Wifi : status === 'connecting' ? Radio : WifiOff;
  return (
    <section
      className={cx('ibs-mcp-frame', `ibs-mcp-frame--${status}`, className)}
      aria-label={`Aplicativo MCP ${name}`}
      {...props}
    >
      <header>
        <Icon aria-hidden="true" />
        <div>
          <strong>{name}</strong>
          <small>{server}</small>
        </div>
        <span role="status">
          {status === 'connecting'
            ? 'Conectando'
            : connected
              ? 'Conectado'
              : status === 'failed'
                ? 'Falha na conexão'
                : 'Desconectado'}
        </span>
      </header>
      <div className="ibs-mcp-frame__content">
        {connected ? children : (fallback ?? <p>O recurso interativo está indisponível.</p>)}
      </div>
    </section>
  );
}

export type TraceItem = AgentEvent & { durationMs?: number; inputSummary?: string; outputSummary?: string };

export function TraceViewer({
  traceId,
  items,
  className,
  ...props
}: HTMLAttributes<HTMLDetailsElement> & { traceId: string; items: TraceItem[] }) {
  return (
    <details className={cx('ibs-trace-viewer', className)} {...props}>
      <summary>
        <Link2 aria-hidden="true" />
        <span>
          <strong>Detalhes da execução</strong>
          <small>
            Trace {traceId} · {items.length} eventos
          </small>
        </span>
      </summary>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.label ?? item.type}</strong>
              <AgentStatus status={item.status} compact live="off" />
            </div>
            <small>
              <time dateTime={item.timestamp}>{new Date(item.timestamp).toLocaleString('pt-BR')}</time>
              {item.durationMs !== undefined && ` · ${item.durationMs} ms`}
            </small>
            {item.inputSummary && (
              <p>
                <b>Entrada:</b> {item.inputSummary}
              </p>
            )}
            {item.outputSummary && (
              <p>
                <b>Saída:</b> {item.outputSummary}
              </p>
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}

export type ArtifactCardProps = Parameters<typeof ArtifactCard>[0];
export type ArtifactPreviewProps = Parameters<typeof ArtifactPreview>[0];
export type CitationListProps = Parameters<typeof CitationList>[0];
export type AgentHandoffProps = Parameters<typeof AgentHandoff>[0];
export type GeneratedUIBoundaryProps = Parameters<typeof GeneratedUIBoundary>[0];
export type McpAppFrameProps = Parameters<typeof McpAppFrame>[0];
export type TraceViewerProps = Parameters<typeof TraceViewer>[0];
