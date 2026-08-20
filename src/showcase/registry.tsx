import { useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import {
  ActivityFeed,
  Accordion,
  ActionMenu,
  AgentError,
  AgentHandoff,
  AgentStatus,
  Alert,
  AppShell,
  ApprovalCard,
  ArtifactCard,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Chip,
  CitationList,
  Cluster,
  Collapsible,
  Combobox,
  CommandPalette,
  ContextMenu,
  DataGrid,
  DatePicker,
  DateRangePicker,
  DescriptionList,
  Dialog,
  Divider,
  EcosystemCard,
  EmptyState,
  FeatureCard,
  FileUpload,
  FilterBar,
  Footer,
  FormField,
  GeneratedUIBoundary,
  Grid,
  Heading,
  Hero,
  HoverCard,
  ImproveLogo,
  Input,
  Kbd,
  McpAppFrame,
  MetricCard,
  MultiSelect,
  NumberInput,
  PageHeader,
  Pagination,
  PasswordInput,
  PermissionScope,
  PlanSteps,
  Popover,
  PricingCard,
  Progress,
  Quote,
  RadioSet,
  RunTimeline,
  ScrollArea,
  SearchInput,
  SegmentedControl,
  Select,
  SelectMenu,
  Sheet,
  Sidebar,
  Skeleton,
  Slider,
  Slide,
  SlideFooter,
  SlideKicker,
  SlideMetric,
  SlideTitle,
  Sparkline,
  Spinner,
  Stack,
  Stat,
  Stepper,
  StreamingMessage,
  Switch,
  Tabs,
  Tag,
  Text,
  Textarea,
  TimePicker,
  Toast,
  Toggle,
  ToolCallCard,
  Tooltip,
  TraceViewer,
  type AgentEvent,
  type DataGridColumn,
} from '../components';
import {
  ArrowRight,
  Bold,
  Bot,
  Building2,
  Check,
  Command,
  Filter,
  FolderKanban,
  Home,
  Plus,
  Settings,
  Sparkles,
  Users,
  WandSparkles,
} from 'lucide-react';
import manifest from '../../design-system.manifest.json';
import { tokenCatalog } from '../tokens/generated';

type ManifestComponent = (typeof manifest.components)[number];
export type ShowcaseGroupId =
  | 'foundations'
  | 'atoms-core'
  | 'atoms-saas'
  | 'molecules-core'
  | 'molecules-saas'
  | 'organisms-brand'
  | 'agentic'
  | 'organisms-saas'
  | 'presentation';

export type ShowcaseGroup = {
  id: ShowcaseGroupId;
  title: string;
  description: string;
  componentIds: string[];
  Render: ComponentType;
};

function SpecimenPanel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="showcase-panel">
      <header>
        <div>
          <span className="showcase-panel__label">Specimen</span>
          <Heading level={3} size={4}>
            {title}
          </Heading>
        </div>
        {description && (
          <Text size="sm" tone="muted">
            {description}
          </Text>
        )}
      </header>
      <div className="showcase-panel__body">{children}</div>
    </section>
  );
}

const colorFamilies = ['orange', 'purple', 'neutral'] as const;
const functionalColors = [
  ['Sucesso', 'var(--ibs-color-feedback-success-surface)', 'var(--ibs-color-feedback-success-foreground)'],
  ['Informação', 'var(--ibs-color-feedback-info-surface)', 'var(--ibs-color-feedback-info-foreground)'],
  ['Atenção', 'var(--ibs-color-feedback-warning-surface)', 'var(--ibs-color-feedback-warning-foreground)'],
  ['Erro', 'var(--ibs-color-feedback-danger-surface)', 'var(--ibs-color-feedback-danger-foreground)'],
] as const;

function formatTokenValue(value: unknown) {
  if (value && typeof value === 'object' && 'value' in value && 'unit' in value) {
    const dimension = value as { value: number; unit: string };
    return `${dimension.value}${dimension.unit}`;
  }
  return String(value);
}

export function FoundationsCatalog() {
  const spacing = tokenCatalog.filter((token) => token.path.startsWith('space.') && token.path !== 'space.0');
  return (
    <Stack gap={10}>
      <SpecimenPanel
        title="Escalas de cor"
        description="As escalas primitivas alimentam papéis semânticos. Componentes nunca escolhem um tom bruto por conveniência."
      >
        <Stack gap={6}>
          {colorFamilies.map((family) => (
            <div key={family}>
              <Text size="sm" strong>
                {family[0].toUpperCase() + family.slice(1)}
              </Text>
              <div
                className="showcase-color-ramp"
                role="region"
                aria-label={`Escala ${family}; use o gesto horizontal para percorrer os tons`}
              >
                {tokenCatalog
                  .filter((token) => token.path.startsWith(`color.${family}.`) && token.path.split('.').length === 3)
                  .map((token) => (
                    <div key={token.path}>
                      <span style={{ background: String(token.light) }} />
                      <small>{token.path.split('.').at(-1)}</small>
                      <code>{String(token.light)}</code>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </Stack>
      </SpecimenPanel>
      <Grid columns={2} gap={5}>
        <SpecimenPanel title="Tema claro">
          <div data-ibs-theme="light" className="showcase-theme-card">
            <strong>Canvas + creme</strong>
            <Text tone="muted">Superfícies calmas, bordas discretas e hierarquia editorial.</Text>
            <div className="showcase-surface-stack">
              <span>Canvas</span>
              <span>Surface subtle</span>
              <span>Surface</span>
              <span>Raised</span>
            </div>
          </div>
        </SpecimenPanel>
        <SpecimenPanel title="Dark suave">
          <div data-ibs-theme="dark" className="showcase-theme-card">
            <strong>Grafite complementar</strong>
            <Text tone="muted">Elevação suave, texto confortável e roxo luminoso para orientação.</Text>
            <div className="showcase-surface-stack">
              <span>Canvas</span>
              <span>Surface subtle</span>
              <span>Surface</span>
              <span>Raised</span>
            </div>
          </div>
        </SpecimenPanel>
      </Grid>
      <SpecimenPanel title="Cores funcionais">
        <Grid columns={4} gap={3}>
          {functionalColors.map(([label, surface, foreground]) => (
            <div className="showcase-functional-color" style={{ background: surface, color: foreground }} key={label}>
              <strong>{label}</strong>
              <small>Surface + foreground</small>
            </div>
          ))}
        </Grid>
      </SpecimenPanel>
      <Grid columns={2} gap={5}>
        <SpecimenPanel title="Tipografia">
          <Stack gap={5}>
            <Heading level={4} size={1}>
              Lorem Ipsum Dolor Sit Amet
            </Heading>
            <Heading level={4} size={2}>
              Quick Brown Fox Jumps
            </Heading>
            <Heading level={4} size={3}>
              Pack my box with five dozen liquor jugs
            </Heading>
            <Text size="lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Quisque vitae justo velit.
            </Text>
            <Text tone="muted">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 — áéíóú çãõ ÂÊÔ.
            </Text>
          </Stack>
        </SpecimenPanel>
        <SpecimenPanel title="Espaçamento 4–128 px">
          <div className="showcase-spacing-scale">
            {spacing.map((token) => (
              <div key={token.path}>
                <code>{token.path.replace('space.', '')}</code>
                <span style={{ width: `min(${formatTokenValue(token.light)}, 100%)` }} />
                <small>{formatTokenValue(token.light)}</small>
              </div>
            ))}
          </div>
        </SpecimenPanel>
      </Grid>
      <Grid columns={2} gap={5}>
        <SpecimenPanel title="Raios">
          <Cluster>
            {['xs', 'sm', 'md', 'lg', 'xl', 'pill'].map((name) => (
              <div className="showcase-radius" style={{ borderRadius: `var(--ibs-radius-${name})` }} key={name}>
                {name}
              </div>
            ))}
          </Cluster>
        </SpecimenPanel>
        <SpecimenPanel title="Elevação e movimento">
          <Grid columns={3}>
            {['sm', 'md', 'lg'].map((name) => (
              <div
                className={`showcase-shadow ibs-motion--${name === 'lg' ? 'expressive' : 'subtle'}`}
                style={{ boxShadow: `var(--ibs-shadow-${name})` }}
                key={name}
              >
                shadow {name}
              </div>
            ))}
          </Grid>
        </SpecimenPanel>
      </Grid>
      <SpecimenPanel
        title="Rolagem e proporção"
        description="Primitivos utilitários para conter listas longas e preservar a proporção de mídia."
      >
        <Grid columns={2} gap={5}>
          <ScrollArea maxBlockSize="11rem" aria-label="Lista rolável de exemplos">
            <Stack gap={2}>
              {['Onboarding', 'Diagnóstico', 'Automação', 'Governança', 'Adoção', 'Expansão', 'Renovação'].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      padding: 'var(--ibs-space-3)',
                      border: '1px solid var(--ibs-color-border)',
                      borderRadius: 'var(--ibs-radius-sm)',
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </Stack>
          </ScrollArea>
          <AspectRatio ratio={16 / 9}>
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                background: 'var(--ibs-color-secondary-soft)',
                color: 'var(--ibs-color-secondary)',
                fontWeight: 600,
              }}
            >
              16 : 9
            </div>
          </AspectRatio>
        </Grid>
      </SpecimenPanel>
    </Stack>
  );
}

export function CoreAtomsCatalog() {
  return (
    <SpecimenPanel title="Ações e marca">
      <Stack gap={4}>
        <ImproveLogo />
        <Cluster>
          <Button trailingIcon={<ArrowRight />}>Continuar</Button>
          <Button variant="primary">Começar agora</Button>
          <Button variant="outline">Saiba mais</Button>
          <Button variant="ghost">Cancelar</Button>
        </Cluster>
      </Stack>
    </SpecimenPanel>
  );
}

export function CoreMoleculesCatalog() {
  const [page, setPage] = useState(1);
  return (
    <Stack gap={7}>
      <Grid columns={2} gap={5}>
        <SpecimenPanel title="Card e dados">
          <Card interactive>
            <CardBody>
              <Stack gap={4}>
                <Cluster>
                  <Avatar name="Marina Costa" />
                  <div>
                    <strong>Marina Costa</strong>
                    <Text size="sm" tone="muted">
                      Estratégia e transformação
                    </Text>
                  </div>
                </Cluster>
                <Divider />
                <Stat value="34%" label="menos esforço repetitivo" />
              </Stack>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">
                Ver diagnóstico
              </Button>
            </CardFooter>
          </Card>
        </SpecimenPanel>
        <SpecimenPanel title="Citação e navegação">
          <Stack gap={5}>
            <Quote author="Improve Business">Comece pela dor real do negócio.</Quote>
            <Breadcrumbs items={[{ label: 'Projetos', href: '#' }, { label: 'Diagnóstico' }]} />
            <Pagination page={page} pages={3} onChange={setPage} />
          </Stack>
        </SpecimenPanel>
      </Grid>
      <SpecimenPanel title="Formulários">
        <Grid columns={2} gap={5}>
          <FormField label="Empresa" hint="Como devemos identificar sua organização?">
            <Input placeholder="Nome da empresa" />
          </FormField>
          <FormField label="Prioridade">
            <Select defaultValue="impact">
              <option value="impact">Impacto operacional</option>
              <option value="growth">Crescimento</option>
            </Select>
          </FormField>
          <FormField label="Contexto">
            <Textarea placeholder="Descreva a dor do negócio…" />
          </FormField>
          <Stack gap={4}>
            <Checkbox label="Aceito receber um diagnóstico inicial" defaultChecked />
            <Switch label="Incluir recomendações com IA" defaultChecked />
            <RadioSet
              label="Horizonte"
              defaultValue="90"
              options={[
                { value: '30', label: '30 dias' },
                { value: '90', label: '90 dias' },
              ]}
            />
          </Stack>
        </Grid>
      </SpecimenPanel>
      <SpecimenPanel title="Feedback">
        <Stack gap={4}>
          <Cluster>
            <Badge>Neutro</Badge>
            <Badge tone="brand">Em evolução</Badge>
            <Badge tone="success">Ativo</Badge>
            <Badge tone="info">Novo</Badge>
            <Badge tone="warning">Atenção</Badge>
          </Cluster>
          <Grid columns={2}>
            <Alert tone="success" title="Diagnóstico concluído">
              Encontramos três oportunidades de alto impacto.
            </Alert>
            <Alert tone="warning" title="Revisão humana necessária">
              A decisão afeta uma política crítica.
            </Alert>
          </Grid>
          <Progress value={68} label="Progresso" />
          <Cluster>
            <Spinner />
            <Skeleton width="12rem" />
          </Cluster>
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel title="Disclosures e overlays">
        <Stack gap={5}>
          <Cluster>
            <Tooltip label="Contexto adicional">
              <Button variant="outline">Tooltip</Button>
            </Tooltip>
            <ActionMenu items={[{ label: 'Duplicar' }, { label: 'Arquivar' }]} />
            <SelectMenu label="Selecionar ação" items={[{ label: 'Criar projeto' }, { label: 'Exportar' }]} />
            <Dialog
              trigger={<Button variant="outline">Abrir diálogo</Button>}
              title="Comece pela dor do negócio"
              description="A tecnologia vem depois."
            />
          </Cluster>
          <Tabs
            items={[
              {
                value: 'one',
                label: 'Agentes de resposta',
                content: <Text tone="muted">Respostas contextualizadas e consistentes.</Text>,
              },
              {
                value: 'two',
                label: 'Agentes de ação',
                content: <Text tone="muted">Execução segura e rastreável.</Text>,
              },
            ]}
          />
          <Accordion
            defaultValue="security"
            items={[
              {
                value: 'security',
                title: 'Segurança e conformidade',
                content: 'Proteção de dados, rastreabilidade e revisão humana.',
              },
              { value: 'impact', title: 'Impacto mensurável', content: 'Indicadores definidos antes da automação.' },
            ]}
          />
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel
        title="Metadados e disclosures adicionais"
        description="Listas de definição, prévia em hover, menu de contexto e disclosure único."
      >
        <Stack gap={5}>
          <DescriptionList
            layout="inline"
            items={[
              { term: 'Cliente', description: 'Acme Corporation' },
              { term: 'Plano', description: 'Enterprise anual' },
              { term: 'Responsável', description: 'Marina Costa' },
            ]}
          />
          <Cluster>
            <HoverCard trigger={<Button variant="outline">Prévia (hover)</Button>}>
              <Stack gap={2}>
                <strong>Acme Corporation</strong>
                <Text size="sm" tone="muted">
                  128 usuários ativos · adoção de IA em 74%.
                </Text>
              </Stack>
            </HoverCard>
            <ContextMenu items={[{ label: 'Renomear' }, { label: 'Duplicar' }, { label: 'Arquivar' }]}>
              <Text size="sm" tone="muted" style={{ cursor: 'context-menu', userSelect: 'none' }}>
                * Clique com o botão direito para ver as opções
              </Text>
            </ContextMenu>
          </Cluster>
          <Collapsible label="Detalhes técnicos" defaultOpen>
            <Text size="sm" tone="muted">
              Integração via API, rastreabilidade completa e revisão humana em decisões críticas.
            </Text>
          </Collapsible>
        </Stack>
      </SpecimenPanel>
    </Stack>
  );
}

export function CoreCatalog() {
  return (
    <Stack gap={7}>
      <CoreAtomsCatalog />
      <CoreMoleculesCatalog />
    </Stack>
  );
}

export function AtomCatalog() {
  const [segment, setSegment] = useState('month');
  const [selected, setSelected] = useState(true);
  const [search, setSearch] = useState('Acme');
  return (
    <Stack gap={7}>
      <ButtonGroup>
        <Button variant="primary" trailingIcon={<ArrowRight />} motion="subtle">
          Sutil
        </Button>
        <Button variant="primary" trailingIcon={<ArrowRight />} motion="expressive">
          Expressiva
        </Button>
        <Button variant="outline" motion="none">
          Sem movimento
        </Button>
      </ButtonGroup>
      <Cluster>
        <Chip selected={selected} onClick={() => setSelected(!selected)}>
          Enterprise
        </Chip>
        <Chip removable onRemove={() => undefined}>
          Automação
        </Chip>
        <Toggle pressed icon={<Bold />}>
          Negrito
        </Toggle>
        <Toggle icon={<Filter />}>Filtros</Toggle>
      </Cluster>
      <Cluster>
        <Tag tone="purple">Estratégia</Tag>
        <Tag tone="brand">IA aplicada</Tag>
        <Tag onRemove={() => undefined}>Operações</Tag>
      </Cluster>
      <SegmentedControl
        label="Período"
        value={segment}
        onValueChange={setSegment}
        items={[
          { value: 'week', label: 'Semana' },
          { value: 'month', label: 'Mês' },
          { value: 'year', label: 'Ano' },
        ]}
      />
      <Grid columns={2}>
        <SearchInput
          aria-label="Buscar clientes"
          placeholder="Buscar clientes"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          onClear={() => setSearch('')}
        />
        <PasswordInput aria-label="Senha" placeholder="Sua senha" />
        <NumberInput label="Licenças" min={1} max={100} defaultValue={12} />
        <Slider label="Automação" defaultValue={62} valueLabel={(value) => `${value}%`} />
      </Grid>
      <Cluster>
        <Kbd>⌘ K</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Enter</Kbd>
        <Sparkline values={[12, 18, 15, 29, 25, 38, 44]} label="Crescimento" />
        <Sparkline tone="brand" values={[31, 25, 27, 19, 24, 16, 21]} label="Variação" />
      </Cluster>
    </Stack>
  );
}

export function MoleculeCatalog() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState('growth');
  const [segments, setSegments] = useState<string[]>(['growth']);
  return (
    <Stack gap={7}>
      <SpecimenPanel title="Fluxo e escolha" description="Progressão, seleção e datas para tarefas de produto.">
        <Stack gap={6}>
          <Stepper
            active={step}
            onStepChange={setStep}
            items={[
              { id: 'company', label: 'Empresa' },
              { id: 'plan', label: 'Plano', description: 'Escolha o melhor cenário' },
              { id: 'review', label: 'Revisão' },
            ]}
          />
          <Grid columns={2}>
            <Combobox
              label="Plano"
              value={plan}
              onValueChange={setPlan}
              options={[
                { value: 'starter', label: 'Starter' },
                { value: 'growth', label: 'Growth' },
                { value: 'enterprise', label: 'Enterprise' },
              ]}
            />
            <DatePicker label="Início do contrato" hint="Você poderá alterar depois." />
          </Grid>
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel
        title="Seleção múltipla e datas"
        description="Múltiplos valores pesquisáveis, intervalo de datas e horário."
      >
        <Grid columns={2} gap={5}>
          <MultiSelect
            label="Segmentos"
            value={segments}
            onValueChange={setSegments}
            options={[
              { value: 'starter', label: 'Starter' },
              { value: 'growth', label: 'Growth' },
              { value: 'enterprise', label: 'Enterprise' },
              { value: 'public', label: 'Setor público' },
            ]}
          />
          <Stack gap={5}>
            <DateRangePicker label="Período do contrato" hint="Início e término previstos." />
            <TimePicker label="Horário da reunião" hint="Fuso do workspace." />
          </Stack>
        </Grid>
      </SpecimenPanel>
      <SpecimenPanel title="Arquivos e contexto" description="Entradas complexas permanecem próximas da tarefa atual.">
        <Stack gap={5}>
          <FileUpload accept=".pdf,.csv,.xlsx" multiple onFiles={() => undefined} />
          <Cluster>
            <Popover trigger={<Button variant="outline">Abrir popover</Button>} title="Contexto rápido">
              Informação complementar.
            </Popover>
            <Sheet
              trigger={<Button variant="outline">Abrir painel</Button>}
              title="Detalhes da conta"
              footer={<Button fullWidth>Salvar</Button>}
            >
              <EmptyState compact title="Painel lateral" description="Edição contextual." />
            </Sheet>
            <CommandPalette
              trigger={<Button leadingIcon={<Command />}>Comandos</Button>}
              items={[
                { id: 'new', label: 'Criar projeto', icon: <Plus /> },
                { id: 'search', label: 'Buscar clientes' },
              ]}
            />
          </Cluster>
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel
        title="Feedback transacional"
        description="Confirmação, falha e recuperação sem perder o contexto."
      >
        <Grid columns={2}>
          <Toast title="Alterações salvas" tone="success" onDismiss={() => undefined} />
          <Toast
            title="Falha na sincronização"
            tone="danger"
            action={
              <Button size="sm" variant="outline">
                Repetir
              </Button>
            }
          />
        </Grid>
      </SpecimenPanel>
    </Stack>
  );
}

export function BrandOrganismsCatalog() {
  return (
    <Stack gap={7}>
      <SpecimenPanel title="Header e footer" description="Navegação institucional, marca e destinos essenciais.">
        <SiteHeaderSpecimen />
      </SpecimenPanel>
      <SpecimenPanel title="Hero institucional" description="Mensagem principal, contexto e ações de conversão.">
        <Hero
          eyebrow="Improve Business"
          title="Design que entende o negócio."
          titleLevel={3}
          description="Estratégia, design, tecnologia e IA aplicados a problemas reais."
          primaryAction={{ label: 'Vamos conversar', href: '#' }}
          secondaryAction={{ label: 'Conhecer serviços', href: '#' }}
        />
      </SpecimenPanel>
      <SpecimenPanel
        title="Cards de proposta"
        description="Serviços e ecossistemas apresentados em módulos consistentes."
      >
        <Grid columns={3}>
          <FeatureCard
            icon={<WandSparkles />}
            title="Transformação com IA"
            description="Automação a partir da dor real."
          />
          <EcosystemCard title="Improve AI" description="Agentes e automações sob medida." />
          <Card>
            <CardBody>
              <Text>Dialog, navegação e padrões de marketing compartilham os mesmos tokens.</Text>
            </CardBody>
          </Card>
        </Grid>
      </SpecimenPanel>
    </Stack>
  );
}

function SiteHeaderSpecimen() {
  return (
    <div
      style={{ border: '1px solid var(--ibs-color-border)', borderRadius: 'var(--ibs-radius-lg)', overflow: 'hidden' }}
    >
      <div className="showcase-mini-nav">
        <ImproveLogo compact />
        <Cluster>
          <Button size="sm" variant="ghost">
            Serviços
          </Button>
          <Button size="sm" variant="primary">
            Contato
          </Button>
        </Cluster>
      </div>
      <Footer
        description="Transformação com propósito."
        links={[{ label: 'Início', href: '#' }]}
        social={[{ label: 'LinkedIn', href: '#' }]}
      />
    </div>
  );
}

const agentEvents: AgentEvent[] = [
  {
    id: '1',
    runId: 'run-42',
    type: 'plan.created',
    label: 'Plano criado',
    status: 'succeeded',
    timestamp: '2026-08-12T13:00:00-03:00',
  },
  {
    id: '2',
    runId: 'run-42',
    type: 'tool.started',
    label: 'Dados consultados',
    status: 'running',
    timestamp: '2026-08-12T13:00:04-03:00',
  },
];
export function AgenticCatalog() {
  return (
    <Stack gap={7}>
      <SpecimenPanel
        title="Execução e streaming"
        description="O usuário entende o estado atual sem depender de linguagem técnica."
      >
        <Stack gap={5}>
          <Cluster>
            <AgentStatus status="thinking" detail="Revisando contexto" />
            <AgentStatus status="running" detail="Consultando dados" />
            <AgentStatus status="awaiting_approval" />
            <AgentStatus status="succeeded" />
          </Cluster>
          <StreamingMessage isStreaming>
            Encontrei três oportunidades recorrentes e estou organizando impacto e esforço.
          </StreamingMessage>
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel
        title="Ferramentas"
        description="Propósito, resultado, duração e recuperação aparecem de forma progressiva."
      >
        <Grid columns={2}>
          <ToolCallCard
            name="Analytics"
            purpose="Agrupar solicitações"
            status="succeeded"
            output="3 padrões"
            durationMs={842}
          />
          <ToolCallCard
            name="CRM"
            purpose="Localizar responsáveis"
            status="failed"
            error="Permissão insuficiente"
            onRetry={() => undefined}
          />
        </Grid>
      </SpecimenPanel>
      <SpecimenPanel
        title="Aprovação humana"
        description="Roxo orienta a decisão; laranja permanece reservado à ação primária."
      >
        <ApprovalCard
          title="Compartilhar recomendação executiva"
          action="Enviar relatório"
          system="Workspace Improve"
          destination="Time de Operações"
          dataScopes={['Resumo agregado', 'Oportunidades priorizadas']}
          consequence="O documento ficará visível para os membros do workspace."
          risk="medium"
          reversible
          onApprove={() => undefined}
          onEdit={() => undefined}
          onReject={() => undefined}
        />
      </SpecimenPanel>
      <SpecimenPanel
        title="Planejamento e recuperação"
        description="Passos, eventos e falhas recuperáveis preservam continuidade."
      >
        <Stack gap={5}>
          <Grid columns={2}>
            <PlanSteps
              steps={[
                { id: 'p1', label: 'Entender contexto', status: 'completed' },
                { id: 'p2', label: 'Analisar padrões', status: 'in_progress' },
              ]}
            />
            <RunTimeline events={agentEvents} />
          </Grid>
          <AgentError
            message="A consulta expirou. Os resultados anteriores foram preservados."
            onRetry={() => undefined}
          />
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel
        title="Confiança e proveniência"
        description="Artefatos, permissões, fontes, handoff e rastros tornam a automação auditável."
      >
        <Stack gap={5}>
          <Grid columns={2}>
            <ArtifactCard
              artifact={{
                title: 'Recomendação operacional',
                type: 'PDF',
                version: 'v3',
                author: 'Improve AI',
                href: '#',
              }}
            />
            <PermissionScope
              resource="CRM"
              permissions={['Ler contas', 'Consultar histórico']}
              duration="session"
              status="granted"
            />
          </Grid>
          <AgentHandoff
            from="Diagnóstico"
            to="Implementação"
            reason="Recomendação aprovada."
            context="Objetivo, evidências e restrições."
            status="succeeded"
          />
          <CitationList
            items={[{ id: 'c1', title: 'Relatório Q2', source: 'Analytics interno', href: '#', verified: true }]}
          />
          <GeneratedUIBoundary title="Resumo executivo" source="Improve AI">
            <Text>UI gerada dentro de uma fronteira identificável e segura.</Text>
          </GeneratedUIBoundary>
          <McpAppFrame name="Painel de iniciativas" server="improve-operations" status="connected">
            <Text>Recurso MCP conectado.</Text>
          </McpAppFrame>
          <TraceViewer traceId="run-42" items={agentEvents.map((event) => ({ ...event, durationMs: 420 }))} />
        </Stack>
      </SpecimenPanel>
    </Stack>
  );
}

type Customer = { id: string; name: string; plan: string; users: number; status: string };
const customers: Customer[] = [
  { id: '1', name: 'Acme', plan: 'Growth', users: 18, status: 'Ativo' },
  { id: '2', name: 'Lumina', plan: 'Enterprise', users: 62, status: 'Ativo' },
];
const customerColumns: DataGridColumn<Customer>[] = [
  { id: 'name', header: 'Cliente', cell: (row) => <strong>{row.name}</strong>, sortValue: (row) => row.name },
  { id: 'plan', header: 'Plano', cell: (row) => row.plan },
  { id: 'users', header: 'Usuários', cell: (row) => row.users, align: 'center' },
  { id: 'status', header: 'Status', cell: (row) => <Badge tone="success">{row.status}</Badge> },
];
export function OrganismCatalog() {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const rows = customers.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <Stack gap={7}>
      <SpecimenPanel
        title="Workspace SaaS"
        description="Navegação, indicadores, filtros e dados em um contexto completo."
      >
        <AppShell
          sidebar={
            <Sidebar
              brand={<ImproveLogo compact />}
              groups={[
                {
                  items: [
                    { label: 'Início', href: '#', icon: <Home />, active: true },
                    { label: 'Clientes', href: '#', icon: <Users /> },
                    { label: 'Projetos', href: '#', icon: <FolderKanban />, badge: 8 },
                    { label: 'Agentes', href: '#', icon: <Bot /> },
                  ],
                },
                { label: 'Administração', items: [{ label: 'Configurações', href: '#', icon: <Settings /> }] },
              ]}
            />
          }
          header={<strong>Workspace Improve</strong>}
        >
          <Stack gap={5}>
            <PageHeader
              eyebrow="Customer success"
              title="Clientes"
              titleLevel={3}
              description="Acompanhe adoção, risco e expansão."
              actions={<Button leadingIcon={<Building2 />}>Novo cliente</Button>}
            />
            <Grid columns={3}>
              <MetricCard
                label="Receita recorrente"
                value="R$ 184 mil"
                change={12.4}
                values={[20, 24, 23, 31, 36, 40]}
              />
              <MetricCard label="Contas ativas" value="128" change={6.1} values={[80, 84, 92, 101, 113, 128]} />
              <MetricCard label="Uso de IA" value="74%" values={[64, 70, 76, 78, 75, 74]} tone="brand" />
            </Grid>
            <FilterBar
              query={query}
              onQueryChange={setQuery}
              filters={<Chip selected>Ativos</Chip>}
              activeCount={1}
              onClear={() => undefined}
            />
            <DataGrid
              rows={rows}
              columns={customerColumns}
              getRowId={(row) => row.id}
              caption="Clientes"
              selectable
              selectedIds={selected}
              onSelectionChange={setSelected}
            />
          </Stack>
        </AppShell>
      </SpecimenPanel>
      <SpecimenPanel
        title="Planos e conversão"
        description="Comparação de oferta com hierarquia de escolha consistente."
      >
        <Grid columns={3}>
          <PricingCard
            name="Starter"
            price="R$ 490"
            suffix="/mês"
            features={['5 usuários', '1 workspace']}
            action={{ label: 'Começar', href: '#' }}
          />
          <PricingCard
            name="Growth"
            price="R$ 1.490"
            suffix="/mês"
            features={['30 usuários', 'Automações com IA']}
            action={{ label: 'Escolher Growth', href: '#' }}
            highlighted
            badge={<Badge tone="brand">Mais escolhido</Badge>}
          />
          <PricingCard
            name="Enterprise"
            price="Sob consulta"
            features={['SSO e auditoria', 'SLA personalizado']}
            action={{ label: 'Falar com especialista', href: '#' }}
          />
        </Grid>
      </SpecimenPanel>
      <SpecimenPanel title="Atividade recente" description="Autoria e sequência temporal para mudanças relevantes.">
        <ActivityFeed
          items={[
            {
              id: '1',
              actor: { name: 'Marina Costa' },
              content: (
                <>
                  aprovou a automação <strong>Onboarding inteligente</strong>.
                </>
              ),
              timestamp: '2026-08-13T10:10:00-03:00',
              icon: <Check />,
            },
            {
              id: '2',
              actor: { name: 'Improve AI' },
              content: <>gerou três recomendações.</>,
              timestamp: '2026-08-13T09:42:00-03:00',
              icon: <Sparkles />,
            },
          ]}
        />
      </SpecimenPanel>
    </Stack>
  );
}

export function PresentationCatalog() {
  return (
    <Stack gap={6}>
      <Slide tone="canvas">
        <SlideKicker>Improve Business</SlideKicker>
        <SlideTitle>Transformação com IA começa no negócio.</SlideTitle>
        <SlideFooter page={1} />
      </Slide>
      <Slide tone="warm">
        <SlideKicker>Impacto</SlideKicker>
        <Grid columns={3}>
          <SlideMetric value="3,2×" label="mais velocidade" />
          <SlideMetric value="-28%" label="de esforço repetitivo" />
          <SlideMetric value="92%" label="de adoção" />
        </Grid>
        <SlideFooter page={2} />
      </Slide>
    </Stack>
  );
}

export const showcaseGroups: ShowcaseGroup[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Cores, temas, tipografia, espaçamento, raio, elevação, rolagem e proporção.',
    componentIds: ['layout', 'typography', 'scroll-area', 'aspect-ratio'],
    Render: FoundationsCatalog,
  },
  {
    id: 'atoms-core',
    title: 'Atoms · Core',
    description: 'Ações, marca e primitives essenciais.',
    componentIds: ['button', 'logo'],
    Render: CoreAtomsCatalog,
  },
  {
    id: 'atoms-saas',
    title: 'Atoms · SaaS Controls',
    description: 'Controles compactos para produto e dashboards.',
    componentIds: [
      'kbd',
      'button-group',
      'chip',
      'toggle',
      'segmented-control',
      'slider',
      'search-input',
      'password-input',
      'number-input',
      'sparkline',
      'tag',
    ],
    Render: AtomCatalog,
  },
  {
    id: 'molecules-core',
    title: 'Molecules · Core',
    description: 'Dados, formulários, feedback e disclosures.',
    componentIds: [
      'card',
      'data-display',
      'form',
      'feedback',
      'overlays',
      'description-list',
      'hover-card',
      'context-menu',
      'collapsible',
    ],
    Render: CoreMoleculesCatalog,
  },
  {
    id: 'molecules-saas',
    title: 'Molecules · SaaS',
    description: 'Seleção, contexto, upload e notificações.',
    componentIds: [
      'empty-state',
      'popover',
      'sheet',
      'stepper',
      'combobox',
      'command-palette',
      'date-picker',
      'file-upload',
      'toast',
      'multi-select',
      'date-range-picker',
      'time-picker',
    ],
    Render: MoleculeCatalog,
  },
  {
    id: 'organisms-brand',
    title: 'Organisms · Brand',
    description: 'Navegação e padrões institucionais.',
    componentIds: ['dialog', 'navigation', 'marketing'],
    Render: BrandOrganismsCatalog,
  },
  {
    id: 'organisms-saas',
    title: 'Organisms · SaaS Workspace',
    description: 'Shell, métricas, dados, filtros, preços e atividade.',
    componentIds: [
      'app-shell',
      'sidebar',
      'page-header',
      'metric-card',
      'data-grid',
      'filter-bar',
      'pricing-card',
      'activity-feed',
    ],
    Render: OrganismCatalog,
  },
  {
    id: 'agentic',
    title: 'Agentic & Trust',
    description: 'Status, execução, aprovação, artefatos, fontes, permissões, rastreabilidade e handoff.',
    componentIds: [
      'agent-status',
      'streaming-message',
      'agent-error',
      'artifact-card',
      'citation-list',
      'permission-scope',
      'tool-call-card',
      'approval-card',
      'run-timeline',
      'plan-steps',
      'agent-handoff',
      'generated-ui-boundary',
      'mcp-app-frame',
      'trace-viewer',
    ],
    Render: AgenticCatalog,
  },
  {
    id: 'presentation',
    title: 'Presentation',
    description: 'Primitivos 16:9 para decisões e narrativas.',
    componentIds: ['slides'],
    Render: PresentationCatalog,
  },
];

const manifestById = new Map(manifest.components.map((component) => [component.id, component]));
export const showcaseRegistry = showcaseGroups.flatMap((group) =>
  group.componentIds.map((id) => ({
    ...(manifestById.get(id) as ManifestComponent),
    groupId: group.id,
    Render: group.Render,
  })),
);
export const showcaseVersion = manifest.version;
