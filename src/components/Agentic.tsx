import { useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import {
  AlertTriangle,
  Ban,
  Bot,
  Check,
  Circle,
  CircleCheck,
  CircleX,
  Clock3,
  LoaderCircle,
  Pause,
  Pencil,
  RotateCcw,
  ShieldAlert,
  Wrench,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { cx } from './utils';

export type AgentRunStatus =
  'queued' | 'thinking' | 'running' | 'awaiting_approval' | 'paused' | 'succeeded' | 'failed' | 'cancelled';

export type AgentActor = {
  id: string;
  label: string;
  kind: 'user' | 'agent' | 'tool';
};

export interface AgentEvent {
  id: string;
  runId: string;
  type: string;
  status: AgentRunStatus;
  timestamp: string;
  label?: string;
  detail?: string;
  actor?: AgentActor;
  metadata?: Record<string, unknown>;
}

const statusMeta = {
  queued: { label: 'Na fila', Icon: Clock3, tone: 'paused' },
  thinking: { label: 'Analisando', Icon: Bot, tone: 'thinking' },
  running: { label: 'Executando', Icon: LoaderCircle, tone: 'running' },
  awaiting_approval: { label: 'Aguardando aprovação', Icon: ShieldAlert, tone: 'awaiting' },
  paused: { label: 'Pausado', Icon: Pause, tone: 'paused' },
  succeeded: { label: 'Concluído', Icon: CircleCheck, tone: 'success' },
  failed: { label: 'Falhou', Icon: CircleX, tone: 'failed' },
  cancelled: { label: 'Cancelado', Icon: Ban, tone: 'paused' },
} satisfies Record<AgentRunStatus, { label: string; Icon: typeof Circle; tone: string }>;

export type AgentStatusProps = HTMLAttributes<HTMLDivElement> & {
  status: AgentRunStatus;
  label?: string;
  detail?: string;
  compact?: boolean;
  live?: 'off' | 'polite' | 'assertive';
};

export function AgentStatus({
  status,
  label,
  detail,
  compact = false,
  live = 'polite',
  className,
  ...props
}: AgentStatusProps) {
  const { Icon, label: defaultLabel, tone } = statusMeta[status];
  return (
    <div
      role="status"
      aria-label={`${label ?? defaultLabel}${detail ? `. ${detail}` : ''}`}
      aria-live={live}
      aria-atomic="true"
      className={cx('ibs-agent-status', `ibs-agent-status--${tone}`, compact && 'ibs-agent-status--compact', className)}
      {...props}
    >
      <Icon aria-hidden="true" className={status === 'running' ? 'ibs-agent-status__spinner' : undefined} />
      <span>
        <strong>{label ?? defaultLabel}</strong>
        {!compact && detail && <small>{detail}</small>}
      </span>
    </div>
  );
}

export type StreamingMessageProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  isStreaming?: boolean;
  author?: string;
};

export function StreamingMessage({
  children,
  isStreaming = false,
  author = 'Improve AI',
  className,
  ...props
}: StreamingMessageProps) {
  return (
    <article className={cx('ibs-streaming-message', className)} aria-busy={isStreaming} {...props}>
      <header>
        <Bot aria-hidden="true" />
        <strong>{author}</strong>
      </header>
      <div className="ibs-streaming-message__content">
        {children}
        {isStreaming && <span className="ibs-streaming-message__cursor" aria-hidden="true" />}
      </div>
      <span className="ibs-sr-only" role="status" aria-live="polite">
        {isStreaming ? 'Resposta em andamento' : 'Resposta concluída'}
      </span>
    </article>
  );
}

export type ToolCallStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export type ToolCallCardProps = HTMLAttributes<HTMLElement> & {
  name: string;
  purpose: string;
  status: ToolCallStatus;
  input?: ReactNode;
  output?: ReactNode;
  durationMs?: number;
  attempt?: number;
  error?: string;
  onRetry?: () => void;
};

export function ToolCallCard({
  name,
  purpose,
  status,
  input,
  output,
  durationMs,
  attempt = 1,
  error,
  onRetry,
  className,
  ...props
}: ToolCallCardProps) {
  const runStatus: AgentRunStatus =
    status === 'succeeded' ? 'succeeded' : status === 'failed' ? 'failed' : status === 'running' ? 'running' : 'queued';
  return (
    <section
      className={cx('ibs-tool-call', `ibs-tool-call--${status}`, className)}
      aria-label={`Ferramenta ${name}`}
      {...props}
    >
      <header className="ibs-tool-call__header">
        <span className="ibs-tool-call__icon">
          <Wrench aria-hidden="true" />
        </span>
        <div>
          <strong>{name}</strong>
          <p>{purpose}</p>
        </div>
        <AgentStatus status={runStatus} compact live="off" />
      </header>
      <div className="ibs-tool-call__meta">
        <span>Tentativa {attempt}</span>
        {durationMs !== undefined && <span>{durationMs} ms</span>}
      </div>
      {(input || output || error) && (
        <details className="ibs-disclosure">
          <summary>Ver detalhes da execução</summary>
          {input && (
            <div>
              <strong>Entrada</strong>
              <div>{input}</div>
            </div>
          )}
          {output && (
            <div>
              <strong>Saída</strong>
              <div>{output}</div>
            </div>
          )}
          {error && (
            <div className="ibs-tool-call__error">
              <strong>Erro</strong>
              <div>{error}</div>
            </div>
          )}
        </details>
      )}
      {status === 'failed' && onRetry && (
        <Button variant="outline" size="sm" leadingIcon={<RotateCcw />} onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </section>
  );
}

export type ApprovalRisk = 'low' | 'medium' | 'high';
export type ApprovalScope = 'once' | 'session';

export type ApprovalCardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  action: string;
  system: string;
  destination: string;
  dataScopes?: string[];
  consequence: string;
  risk?: ApprovalRisk;
  reversible: boolean;
  scope?: ApprovalScope;
  onApprove: () => void;
  onReject: () => void;
  onEdit?: () => void;
};

const riskLabels: Record<ApprovalRisk, string> = { low: 'Baixo risco', medium: 'Risco moderado', high: 'Alto risco' };
const scopeLabels: Record<ApprovalScope, string> = {
  once: 'Autorizar somente esta vez',
  session: 'Autorizar durante esta sessão',
};

export function ApprovalCard({
  title,
  action,
  system,
  destination,
  dataScopes = [],
  consequence,
  risk = 'medium',
  reversible,
  scope = 'once',
  onApprove,
  onReject,
  onEdit,
  className,
  ...props
}: ApprovalCardProps) {
  const titleId = useId();
  return (
    <section
      className={cx('ibs-approval-card', `ibs-approval-card--${risk}`, className)}
      aria-labelledby={titleId}
      {...props}
    >
      <header>
        <ShieldAlert aria-hidden="true" />
        <div>
          <span className="ibs-approval-card__eyebrow">Aprovação necessária · {riskLabels[risk]}</span>
          <h3 id={titleId}>{title}</h3>
        </div>
      </header>
      <dl className="ibs-approval-card__facts">
        <div>
          <dt>Ação</dt>
          <dd>{action}</dd>
        </div>
        <div>
          <dt>Sistema</dt>
          <dd>{system}</dd>
        </div>
        <div>
          <dt>Destino</dt>
          <dd>{destination}</dd>
        </div>
        <div>
          <dt>Reversível</dt>
          <dd>{reversible ? 'Sim' : 'Não'}</dd>
        </div>
      </dl>
      {dataScopes.length > 0 && (
        <div className="ibs-approval-card__data">
          <strong>Dados envolvidos</strong>
          <ul>
            {dataScopes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="ibs-approval-card__consequence">
        <AlertTriangle aria-hidden="true" />
        {consequence}
      </p>
      <p className="ibs-approval-card__scope">{scopeLabels[scope]}</p>
      <div className="ibs-cluster">
        <Button variant="primary" leadingIcon={<Check />} onClick={onApprove}>
          Aprovar ação
        </Button>
        {onEdit && (
          <Button variant="outline" leadingIcon={<Pencil />} onClick={onEdit}>
            Editar
          </Button>
        )}
        <Button variant="ghost" leadingIcon={<X />} onClick={onReject}>
          Rejeitar
        </Button>
      </div>
    </section>
  );
}

export function RunTimeline({
  events,
  className,
  ...props
}: HTMLAttributes<HTMLOListElement> & { events: AgentEvent[] }) {
  return (
    <ol className={cx('ibs-run-timeline', className)} aria-label="Linha do tempo da execução" {...props}>
      {events.map((event) => {
        const meta = statusMeta[event.status];
        const Icon = meta.Icon;
        return (
          <li key={event.id} className={`ibs-run-timeline__item ibs-run-timeline__item--${meta.tone}`}>
            <span className="ibs-run-timeline__marker">
              <Icon
                aria-hidden="true"
                className={event.status === 'running' ? 'ibs-agent-status__spinner' : undefined}
              />
            </span>
            <div>
              <strong>{event.label ?? event.type}</strong>
              {event.detail && <p>{event.detail}</p>}
              <small>
                {event.actor?.label && `${event.actor.label} · `}
                <time dateTime={event.timestamp}>{new Date(event.timestamp).toLocaleString('pt-BR')}</time>
              </small>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export type AgentErrorProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  message: string;
  onRetry?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
};

export function AgentError({
  title = 'Não foi possível concluir esta etapa',
  message,
  onRetry,
  onEdit,
  onCancel,
  className,
  ...props
}: AgentErrorProps) {
  return (
    <div role="alert" className={cx('ibs-agent-error', className)} {...props}>
      <CircleX aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
        <div className="ibs-cluster">
          {onRetry && (
            <Button size="sm" variant="primary" leadingIcon={<RotateCcw />} onClick={onRetry}>
              Tentar novamente
            </Button>
          )}
          {onEdit && (
            <Button size="sm" variant="outline" leadingIcon={<Pencil />} onClick={onEdit}>
              Editar entrada
            </Button>
          )}
          {onCancel && (
            <Button size="sm" variant="ghost" onClick={onCancel}>
              Cancelar execução
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export type PlanStepStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'skipped';
export type PlanStep = { id: string; label: string; detail?: string; status: PlanStepStatus };

const stepMeta = {
  pending: { label: 'Pendente', Icon: Circle },
  in_progress: { label: 'Em andamento', Icon: LoaderCircle },
  completed: { label: 'Concluída', Icon: CircleCheck },
  blocked: { label: 'Bloqueada', Icon: AlertTriangle },
  skipped: { label: 'Ignorada', Icon: Ban },
} satisfies Record<PlanStepStatus, { label: string; Icon: typeof Circle }>;

export function PlanSteps({ steps, className, ...props }: HTMLAttributes<HTMLOListElement> & { steps: PlanStep[] }) {
  return (
    <ol className={cx('ibs-plan-steps', className)} aria-label="Plano de execução" {...props}>
      {steps.map((step) => {
        const { Icon, label } = stepMeta[step.status];
        return (
          <li
            key={step.id}
            className={`ibs-plan-steps__item ibs-plan-steps__item--${step.status}`}
            aria-current={step.status === 'in_progress' ? 'step' : undefined}
          >
            <Icon aria-hidden="true" />
            <div>
              <strong>{step.label}</strong>
              {step.detail && <p>{step.detail}</p>}
              <span className="ibs-sr-only">{label}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export type RunTimelineProps = Parameters<typeof RunTimeline>[0];
export type PlanStepsProps = Parameters<typeof PlanSteps>[0];
