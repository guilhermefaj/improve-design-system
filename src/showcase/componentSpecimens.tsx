import { useState, type ComponentType, type ReactNode } from 'react';
import {
  Accordion,
  ActionMenu,
  ActivityFeed,
  AgentError,
  AgentHandoff,
  AgentStatus,
  Alert,
  AlertDialog,
  AppShell,
  ApprovalCard,
  ArtifactCard,
  AspectRatio,
  Attachment,
  Avatar,
  Badge,
  Breadcrumbs,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardBody,
  CardFooter,
  Carousel,
  Chart,
  Checkbox,
  Chip,
  CitationList,
  Cluster,
  Collapsible,
  Combobox,
  CommandPalette,
  Container,
  ContextMenu,
  DataGrid,
  type DataGridColumn,
  DatePicker,
  DateRangePicker,
  DescriptionList,
  Dialog,
  DirectionProvider,
  Divider,
  Drawer,
  DropdownMenu,
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
  InputGroup,
  InputOTP,
  Item,
  Kbd,
  Label,
  Marker,
  McpAppFrame,
  Menubar,
  Message,
  MessageScroller,
  MetricCard,
  MultiSelect,
  NativeSelect,
  NavigationMenu,
  NumberInput,
  PageHeader,
  Pagination,
  PasswordInput,
  PermissionScope,
  PlanSteps,
  Popover,
  PricingCard,
  Progress,
  Questionnaire,
  Quote,
  RadioSet,
  Resizable,
  RunTimeline,
  ScrollArea,
  SearchInput,
  SegmentedControl,
  Select,
  SelectMenu,
  Sheet,
  Sidebar,
  Skeleton,
  Slide,
  SlideFooter,
  SlideKicker,
  SlideMetric,
  SlideTitle,
  Slider,
  Sparkline,
  Spinner,
  Stack,
  Stat,
  Stepper,
  StreamingMessage,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Tag,
  Text,
  Textarea,
  TimePicker,
  Toast,
  Toggle,
  ToggleGroup,
  ToolCallCard,
  Tooltip,
  TraceViewer,
  type AgentEvent,
} from '../components';
import {
  ArrowRight,
  Bold,
  Building2,
  Columns3,
  Command,
  Filter,
  FolderKanban,
  Home,
  LayoutGrid,
  LayoutList,
  Plus,
  Settings,
  Users,
  WandSparkles,
} from 'lucide-react';
import manifest from '../../design-system.manifest.json';
import { SpecimenPanel } from './catalogSpecimens';

type ManifestComponent = (typeof manifest.components)[number];
const manifestById = new Map<string, ManifestComponent>(
  manifest.components.map((component) => [component.id, component]),
);

function meta(id: string): ManifestComponent {
  const entry = manifestById.get(id);
  if (!entry) throw new Error(`componentSpecimens: missing manifest entry for "${id}"`);
  return entry;
}

function panel(id: string, content: ReactNode, density: 'hug' | 'bounded' | 'fill' = 'fill') {
  const entry = meta(id);
  return (
    <SpecimenPanel id={id} title={entry.name} description={entry.description}>
      <div className={`showcase-demo--${density}`}>{content}</div>
    </SpecimenPanel>
  );
}

const boxStyle = {
  padding: 'var(--ibs-space-4)',
  border: '1px solid var(--ibs-color-border)',
  borderRadius: 'var(--ibs-radius-md)',
} as const;

function SiteHeaderSpecimenDemo() {
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

function LogoSpecimen() {
  const Logo = ImproveLogo as ComponentType<{
    variant?: 'duo' | 'brand' | 'mono' | 'inverse';
  }>;
  return panel(
    'logo',
    <Cluster>
      <Logo variant="duo" />
      <Logo variant="brand" />
      <Logo variant="mono" />
      <div
        style={{
          padding: 'var(--ibs-space-4)',
          borderRadius: 'var(--ibs-radius-md)',
          background: '#1d1d1f',
        }}
      >
        <Logo variant="inverse" />
      </div>
    </Cluster>,
    'hug',
  );
}

function SegmentedControlSpecimen() {
  const [value, setValue] = useState('month');
  return panel(
    'segmented-control',
    <SegmentedControl
      label="Período"
      value={value}
      onValueChange={setValue}
      items={[
        { value: 'week', label: 'Semana' },
        { value: 'month', label: 'Mês' },
        { value: 'year', label: 'Ano' },
      ]}
    />,
    'hug',
  );
}

function SearchInputSpecimen() {
  const [value, setValue] = useState('Acme');
  return panel(
    'search-input',
    <SearchInput
      aria-label="Buscar clientes"
      placeholder="Buscar clientes"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onClear={() => setValue('')}
    />,
    'bounded',
  );
}

function StepperSpecimen() {
  const [active, setActive] = useState(1);
  return panel(
    'stepper',
    <Stepper
      active={active}
      onStepChange={setActive}
      items={[
        { id: 'company', label: 'Empresa' },
        { id: 'plan', label: 'Plano', description: 'Escolha o melhor cenário' },
        { id: 'review', label: 'Revisão' },
      ]}
    />,
    'bounded',
  );
}

function ComboboxSpecimen() {
  const [value, setValue] = useState('growth');
  return panel(
    'combobox',
    <Combobox
      label="Plano"
      value={value}
      onValueChange={setValue}
      options={[
        { value: 'starter', label: 'Starter' },
        { value: 'growth', label: 'Growth' },
        { value: 'enterprise', label: 'Enterprise' },
      ]}
    />,
    'bounded',
  );
}

function FilterBarSpecimen() {
  const [query, setQuery] = useState('');
  return panel(
    'filter-bar',
    <FilterBar
      query={query}
      onQueryChange={setQuery}
      filters={<Chip selected>Ativos</Chip>}
      activeCount={1}
      onClear={() => setQuery('')}
    />,
    'bounded',
  );
}

function MultiSelectSpecimen() {
  const [value, setValue] = useState<string[]>(['growth']);
  return panel(
    'multi-select',
    <MultiSelect
      label="Segmentos"
      value={value}
      onValueChange={setValue}
      options={[
        { value: 'starter', label: 'Starter' },
        { value: 'growth', label: 'Growth' },
        { value: 'enterprise', label: 'Enterprise' },
        { value: 'public', label: 'Setor público' },
      ]}
    />,
    'bounded',
  );
}

function ToggleGroupSpecimen() {
  const [value, setValue] = useState('list');
  return panel(
    'toggle-group',
    <ToggleGroup
      label="Visualização"
      value={value}
      onValueChange={setValue}
      items={[
        {
          value: 'list',
          label: (
            <>
              <LayoutList aria-hidden="true" /> Lista
            </>
          ),
        },
        {
          value: 'board',
          label: (
            <>
              <LayoutGrid aria-hidden="true" /> Quadro
            </>
          ),
        },
        {
          value: 'columns',
          label: (
            <>
              <Columns3 aria-hidden="true" /> Colunas
            </>
          ),
        },
      ]}
    />,
    'hug',
  );
}

function InputOTPSpecimen() {
  const [value, setValue] = useState('');
  return panel('input-otp', <InputOTP label="Código de verificação" value={value} onValueChange={setValue} />, 'hug');
}

function SheetSpecimen() {
  return panel(
    'sheet',
    <Sheet
      trigger={<Button variant="outline">Abrir painel</Button>}
      title="Editar conta"
      footer={
        <Cluster>
          <Button variant="ghost">Cancelar</Button>
          <Button fullWidth>Salvar alterações</Button>
        </Cluster>
      }
    >
      <Text size="sm" tone="muted">
        Use Sheet para edição contextual com ações no rodapé, sem sair da página.
      </Text>
    </Sheet>,
    'bounded',
  );
}

function DrawerSpecimen() {
  return panel(
    'drawer',
    <Cluster>
      <Drawer
        trigger={<Button variant="outline">Inspecionar</Button>}
        title="Detalhes do cliente"
        description="Inspeção lateral sem interromper o fluxo."
        side="right"
      >
        <Text size="sm" tone="muted">
          Use Drawer para inspecionar contexto auxiliar; Dialog para interrupções curtas.
        </Text>
      </Drawer>
      <Drawer
        trigger={<Button variant="outline">Painel inferior</Button>}
        title="Resumo rápido"
        description="Inspeção a partir da borda inferior."
        side="bottom"
      >
        <Text size="sm" tone="muted">
          O lado inferior funciona bem para prévias e detalhes secundários.
        </Text>
      </Drawer>
    </Cluster>,
    'bounded',
  );
}

/**
 * One React component per manifest component id, each rendering exactly one
 * `SpecimenPanel` whose `id`/`title` match the manifest entry. Demos are kept
 * minimal but recognizable; several were split out of previously bundled
 * multi-component panels (see docs/CATALOG.md history in registry.tsx).
 */
export const componentSpecimens: Record<string, ComponentType> = {
  button: () =>
    panel(
      'button',
      <Cluster>
        <Button trailingIcon={<ArrowRight />}>Continuar</Button>
        <Button variant="primary">Começar agora</Button>
        <Button variant="outline">Saiba mais</Button>
        <Button variant="ghost">Cancelar</Button>
      </Cluster>,
      'hug',
    ),

  layout: () =>
    panel(
      'layout',
      <Container>
        <Stack gap={4}>
          <Cluster>
            <Badge>Stack</Badge>
            <Badge tone="brand">Cluster</Badge>
          </Cluster>
          <Grid columns={2} gap={4}>
            <div style={boxStyle}>Grid item A</div>
            <div style={boxStyle}>Grid item B</div>
          </Grid>
        </Stack>
      </Container>,
    ),

  typography: () =>
    panel(
      'typography',
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Text>
        <Text tone="muted">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 — áéíóú çãõ ÂÊÔ.</Text>
      </Stack>,
    ),

  logo: LogoSpecimen,

  card: () =>
    panel(
      'card',
      <Card interactive>
        <CardBody>
          <Text>Cards agrupam conteúdo relacionado com corpo e rodapé opcionais.</Text>
        </CardBody>
        <CardFooter>
          <Button size="sm" variant="outline">
            Ver diagnóstico
          </Button>
        </CardFooter>
      </Card>,
    ),

  'data-display': () =>
    panel(
      'data-display',
      <Stack gap={5}>
        <Cluster>
          <Avatar name="Marina Costa" />
          <Stat value="34%" label="menos esforço repetitivo" />
        </Cluster>
        <Divider />
        <Quote author="Improve Business">Comece pela dor real do negócio.</Quote>
        <Cluster>
          <Breadcrumbs items={[{ label: 'Projetos', href: '#' }, { label: 'Diagnóstico' }]} />
          <Pagination page={1} pages={3} />
        </Cluster>
      </Stack>,
    ),

  form: () =>
    panel(
      'form',
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
      </Grid>,
      'bounded',
    ),

  feedback: () =>
    panel(
      'feedback',
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
      </Stack>,
    ),

  dialog: () =>
    panel(
      'dialog',
      <Dialog
        trigger={<Button variant="outline">Abrir diálogo</Button>}
        title="Comece pela dor do negócio"
        description="A tecnologia vem depois."
      />,
    ),

  overlays: () =>
    panel(
      'overlays',
      <Stack gap={5}>
        <Cluster>
          <Tooltip label="Contexto adicional">
            <Button variant="outline">Tooltip</Button>
          </Tooltip>
          <ActionMenu items={[{ label: 'Duplicar' }, { label: 'Arquivar' }]} />
          <SelectMenu label="Selecionar ação" items={[{ label: 'Criar projeto' }, { label: 'Exportar' }]} />
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
      </Stack>,
    ),

  navigation: () => panel('navigation', <SiteHeaderSpecimenDemo />),

  marketing: () =>
    panel(
      'marketing',
      <Stack gap={6}>
        <Hero
          eyebrow="Improve Business"
          title="Design que entende o negócio."
          titleLevel={3}
          description="Estratégia, design, tecnologia e IA aplicados a problemas reais."
          primaryAction={{ label: 'Vamos conversar', href: '#' }}
          secondaryAction={{ label: 'Conhecer serviços', href: '#' }}
        />
        <Grid columns={2}>
          <FeatureCard
            icon={<WandSparkles />}
            title="Transformação com IA"
            description="Automação a partir da dor real."
          />
          <EcosystemCard title="Improve AI" description="Agentes e automações sob medida." />
        </Grid>
      </Stack>,
    ),

  slides: () =>
    panel(
      'slides',
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
      </Stack>,
    ),

  'agent-status': () =>
    panel(
      'agent-status',
      <Cluster>
        <AgentStatus status="thinking" detail="Revisando contexto" />
        <AgentStatus status="running" detail="Consultando dados" />
        <AgentStatus status="awaiting_approval" />
        <AgentStatus status="succeeded" />
      </Cluster>,
      'hug',
    ),

  'streaming-message': () =>
    panel(
      'streaming-message',
      <StreamingMessage isStreaming>
        Encontrei três oportunidades recorrentes e estou organizando impacto e esforço.
      </StreamingMessage>,
      'bounded',
    ),

  'tool-call-card': () =>
    panel(
      'tool-call-card',
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
      </Grid>,
      'bounded',
    ),

  'approval-card': () =>
    panel(
      'approval-card',
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
      />,
      'bounded',
    ),

  'run-timeline': () => panel('run-timeline', <RunTimeline events={agentEvents} />),

  'agent-error': () =>
    panel(
      'agent-error',
      <AgentError
        message="A consulta expirou. Os resultados anteriores foram preservados."
        onRetry={() => undefined}
      />,
    ),

  'plan-steps': () =>
    panel(
      'plan-steps',
      <PlanSteps
        steps={[
          { id: 'p1', label: 'Entender contexto', status: 'completed' },
          { id: 'p2', label: 'Analisar padrões', status: 'in_progress' },
        ]}
      />,
    ),

  'artifact-card': () =>
    panel(
      'artifact-card',
      <ArtifactCard
        artifact={{ title: 'Recomendação operacional', type: 'PDF', version: 'v3', author: 'Improve AI', href: '#' }}
      />,
    ),

  'citation-list': () =>
    panel(
      'citation-list',
      <CitationList
        items={[{ id: 'c1', title: 'Relatório Q2', source: 'Analytics interno', href: '#', verified: true }]}
      />,
    ),

  'permission-scope': () =>
    panel(
      'permission-scope',
      <PermissionScope
        resource="CRM"
        permissions={['Ler contas', 'Consultar histórico']}
        duration="session"
        status="granted"
      />,
    ),

  'agent-handoff': () =>
    panel(
      'agent-handoff',
      <AgentHandoff
        from="Diagnóstico"
        to="Implementação"
        reason="Recomendação aprovada."
        context="Objetivo, evidências e restrições."
        status="succeeded"
      />,
    ),

  'generated-ui-boundary': () =>
    panel(
      'generated-ui-boundary',
      <GeneratedUIBoundary title="Resumo executivo" source="Improve AI">
        <Text>UI gerada dentro de uma fronteira identificável e segura.</Text>
      </GeneratedUIBoundary>,
    ),

  'mcp-app-frame': () =>
    panel(
      'mcp-app-frame',
      <McpAppFrame name="Painel de iniciativas" server="improve-operations" status="connected">
        <Text>Recurso MCP conectado.</Text>
      </McpAppFrame>,
    ),

  'trace-viewer': () =>
    panel(
      'trace-viewer',
      <TraceViewer traceId="run-42" items={agentEvents.map((event) => ({ ...event, durationMs: 420 }))} />,
    ),

  kbd: () =>
    panel(
      'kbd',
      <Cluster>
        <Kbd>⌘ K</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Enter</Kbd>
      </Cluster>,
      'hug',
    ),

  'button-group': () =>
    panel(
      'button-group',
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
      </ButtonGroup>,
    ),

  chip: () =>
    panel(
      'chip',
      <Cluster>
        <Chip selected>Enterprise</Chip>
        <Chip removable onRemove={() => undefined}>
          Automação
        </Chip>
      </Cluster>,
      'hug',
    ),

  toggle: () =>
    panel(
      'toggle',
      <Cluster>
        <Toggle pressed icon={<Bold />}>
          Negrito
        </Toggle>
        <Toggle icon={<Filter />}>Filtros</Toggle>
      </Cluster>,
      'hug',
    ),

  'segmented-control': SegmentedControlSpecimen,

  slider: () => panel('slider', <Slider label="Automação" defaultValue={62} valueLabel={(value) => `${value}%`} />),

  'search-input': SearchInputSpecimen,

  'password-input': () =>
    panel('password-input', <PasswordInput aria-label="Senha" placeholder="Sua senha" />, 'bounded'),

  'number-input': () =>
    panel('number-input', <NumberInput label="Licenças" min={1} max={100} defaultValue={12} />, 'bounded'),

  sparkline: () =>
    panel(
      'sparkline',
      <Cluster>
        <Sparkline values={[12, 18, 15, 29, 25, 38, 44]} label="Crescimento" />
        <Sparkline tone="brand" values={[31, 25, 27, 19, 24, 16, 21]} label="Variação" />
      </Cluster>,
      'hug',
    ),

  'empty-state': () =>
    panel(
      'empty-state',
      <EmptyState
        title="Nenhum resultado"
        description="Ajuste os filtros ou crie um novo registro."
        action={
          <Button size="sm" variant="outline">
            Criar registro
          </Button>
        }
      />,
    ),

  popover: () =>
    panel(
      'popover',
      <Popover trigger={<Button variant="outline">Abrir popover</Button>} title="Contexto rápido">
        Informação complementar.
      </Popover>,
      'hug',
    ),

  sheet: SheetSpecimen,

  stepper: StepperSpecimen,

  combobox: ComboboxSpecimen,

  'command-palette': () =>
    panel(
      'command-palette',
      <CommandPalette
        trigger={<Button leadingIcon={<Command />}>Comandos</Button>}
        items={[
          { id: 'new', label: 'Criar projeto', icon: <Plus /> },
          { id: 'search', label: 'Buscar clientes' },
        ]}
      />,
    ),

  'date-picker': () =>
    panel('date-picker', <DatePicker label="Início do contrato" hint="Você poderá alterar depois." />),

  'file-upload': () => panel('file-upload', <FileUpload accept=".pdf,.csv,.xlsx" multiple />),

  toast: () =>
    panel(
      'toast',
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
      </Grid>,
    ),

  'app-shell': () =>
    panel(
      'app-shell',
      <AppShell
        sidebar={
          <Sidebar
            brand={<ImproveLogo compact />}
            groups={[
              {
                items: [
                  { label: 'Início', href: '#', icon: <Home />, active: true },
                  { label: 'Clientes', href: '#', icon: <Users /> },
                ],
              },
            ]}
          />
        }
        header={<strong>Workspace Improve</strong>}
      >
        <Text size="sm" tone="muted">
          Sidebar, header e conteúdo compostos em um único shell responsivo.
        </Text>
      </AppShell>,
    ),

  sidebar: () =>
    panel(
      'sidebar',
      <div
        style={{
          maxWidth: '16rem',
          border: '1px solid var(--ibs-color-border)',
          borderRadius: 'var(--ibs-radius-lg)',
          overflow: 'hidden',
        }}
      >
        <Sidebar
          brand={<ImproveLogo compact />}
          groups={[
            {
              items: [
                { label: 'Início', href: '#', icon: <Home />, active: true },
                { label: 'Clientes', href: '#', icon: <Users /> },
                { label: 'Projetos', href: '#', icon: <FolderKanban />, badge: 8 },
              ],
            },
            { label: 'Administração', items: [{ label: 'Configurações', href: '#', icon: <Settings /> }] },
          ]}
        />
      </div>,
    ),

  'page-header': () =>
    panel(
      'page-header',
      <PageHeader
        eyebrow="Customer success"
        title="Clientes"
        titleLevel={3}
        description="Acompanhe adoção, risco e expansão."
        actions={<Button leadingIcon={<Building2 />}>Novo cliente</Button>}
      />,
    ),

  'metric-card': () =>
    panel(
      'metric-card',
      <Grid columns={3}>
        <MetricCard label="Receita recorrente" value="R$ 184 mil" change={12.4} values={[20, 24, 23, 31, 36, 40]} />
        <MetricCard label="Contas ativas" value="128" change={6.1} values={[80, 84, 92, 101, 113, 128]} />
        <MetricCard label="Uso de IA" value="74%" values={[64, 70, 76, 78, 75, 74]} tone="brand" />
      </Grid>,
    ),

  'data-grid': () =>
    panel(
      'data-grid',
      <DataGrid rows={customers} columns={customerColumns} getRowId={(row) => row.id} caption="Clientes" selectable />,
    ),

  'filter-bar': FilterBarSpecimen,

  'pricing-card': () =>
    panel(
      'pricing-card',
      <Grid columns={3} style={{ alignItems: 'start' }}>
        <PricingCard
          name="Starter"
          currency="R$"
          price="490"
          suffix="/mês"
          features={['5 usuários', '1 workspace']}
          action={{ label: 'Começar', href: '#' }}
        />
        <PricingCard
          name="Growth"
          currency="R$"
          price="1.490"
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
      </Grid>,
    ),

  'activity-feed': () =>
    panel(
      'activity-feed',
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
          },
          {
            id: '2',
            actor: { name: 'Improve AI' },
            content: <>gerou três recomendações.</>,
            timestamp: '2026-08-13T09:42:00-03:00',
          },
        ]}
      />,
    ),

  'scroll-area': () =>
    panel(
      'scroll-area',
      <ScrollArea maxBlockSize="9rem" aria-label="Lista rolável de exemplos">
        <Stack gap={2}>
          {['Onboarding', 'Diagnóstico', 'Automação', 'Governança', 'Adoção'].map((item) => (
            <div key={item} style={boxStyle}>
              {item}
            </div>
          ))}
        </Stack>
      </ScrollArea>,
    ),

  'aspect-ratio': () =>
    panel(
      'aspect-ratio',
      <AspectRatio ratio={16 / 9} style={{ maxWidth: '16rem' }}>
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
      </AspectRatio>,
    ),

  tag: () =>
    panel(
      'tag',
      <Cluster>
        <Tag tone="purple">Estratégia</Tag>
        <Tag tone="brand">IA aplicada</Tag>
        <Tag onRemove={() => undefined}>Operações</Tag>
      </Cluster>,
      'hug',
    ),

  'description-list': () =>
    panel(
      'description-list',
      <DescriptionList
        layout="inline"
        items={[
          { term: 'Cliente', description: 'Acme Corporation' },
          { term: 'Plano', description: 'Enterprise anual' },
          { term: 'Responsável', description: 'Marina Costa' },
        ]}
      />,
    ),

  'hover-card': () =>
    panel(
      'hover-card',
      <HoverCard trigger={<Button variant="outline">Prévia (hover)</Button>}>
        <Stack gap={2}>
          <strong>Acme Corporation</strong>
          <Text size="sm" tone="muted">
            128 usuários ativos · adoção de IA em 74%.
          </Text>
        </Stack>
      </HoverCard>,
    ),

  'context-menu': () =>
    panel(
      'context-menu',
      <ContextMenu items={[{ label: 'Renomear' }, { label: 'Duplicar' }, { label: 'Arquivar' }]}>
        <span className="ibs-text ibs-text--sm ibs-text--muted" style={{ cursor: 'context-menu', userSelect: 'none' }}>
          Clique com o botão direito para ver as opções
        </span>
      </ContextMenu>,
    ),

  collapsible: () =>
    panel(
      'collapsible',
      <Collapsible label="Detalhes técnicos" defaultOpen>
        <Text size="sm" tone="muted">
          Integração via API, rastreabilidade completa e revisão humana em decisões críticas.
        </Text>
      </Collapsible>,
    ),

  'multi-select': MultiSelectSpecimen,

  'date-range-picker': () =>
    panel('date-range-picker', <DateRangePicker label="Período do contrato" hint="Início e término previstos." />),

  'time-picker': () => panel('time-picker', <TimePicker label="Horário da reunião" hint="Fuso do workspace." />),

  direction: () =>
    panel(
      'direction',
      <DirectionProvider dir="rtl">
        <Text>Texto alinhado pela direção do provider (RTL neste exemplo).</Text>
      </DirectionProvider>,
    ),

  resizable: () =>
    panel(
      'resizable',
      <Resizable defaultSizes={[40, 60]}>
        <div style={{ padding: 'var(--ibs-space-4)' }}>
          <Text size="sm">Painel A</Text>
        </div>
        <div style={{ padding: 'var(--ibs-space-4)' }}>
          <Text size="sm">Painel B</Text>
        </div>
      </Resizable>,
    ),

  label: () =>
    panel(
      'label',
      <Stack gap={2}>
        <Label htmlFor="catalog-label-input">Nome da empresa</Label>
        <Input id="catalog-label-input" placeholder="Improve Business" />
      </Stack>,
    ),

  marker: () =>
    panel(
      'marker',
      <Stack gap={3}>
        <Marker tone="brand" label="Em andamento" />
        <Marker tone="success" label="Concluído" />
        <Marker tone="purple" label="Aguardando revisão" />
      </Stack>,
    ),

  item: () =>
    panel(
      'item',
      <Stack gap={2}>
        <Item title="Diagnóstico" description="Priorize a dor do negócio" selected />
        <Item title="Automação" description="Execute com aprovação humana" href="#item" />
      </Stack>,
    ),

  chart: () =>
    panel(
      'chart',
      <Stack gap={4}>
        <Chart label="Receita trimestral" data={[12, 18, 15, 28, 22, 34]} variant="line" />
        <Chart label="Tickets por semana" data={[8, 12, 9, 16, 14, 20]} variant="bar" />
      </Stack>,
    ),

  'toggle-group': ToggleGroupSpecimen,

  'native-select': () =>
    panel(
      'native-select',
      <Stack gap={2}>
        <Label htmlFor="native-select-demo">Prioridade</Label>
        <NativeSelect id="native-select-demo" defaultValue="impact">
          <option value="impact">Impacto</option>
          <option value="growth">Crescimento</option>
        </NativeSelect>
      </Stack>,
    ),

  'input-group': () =>
    panel(
      'input-group',
      <InputGroup start={<span>https://</span>} end={<span>.com</span>}>
        <Input aria-label="Domínio" placeholder="improve" />
      </InputGroup>,
      'bounded',
    ),

  'input-otp': InputOTPSpecimen,

  table: () =>
    panel(
      'table',
      <Table>
        <TableCaption>Clientes recentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Plano</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Acme</TableCell>
            <TableCell>Enterprise</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Northwind</TableCell>
            <TableCell>Growth</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    ),

  'dropdown-menu': () =>
    panel(
      'dropdown-menu',
      <DropdownMenu items={[{ label: 'Duplicar' }, { label: 'Arquivar' }, { label: 'Excluir', disabled: true }]} />,
    ),

  'alert-dialog': () =>
    panel(
      'alert-dialog',
      <AlertDialog
        trigger={<Button variant="outline">Excluir projeto</Button>}
        title="Excluir projeto?"
        description="Esta ação remove o workspace e não pode ser desfeita."
        tone="danger"
        confirmLabel="Excluir"
      />,
    ),

  calendar: () => panel('calendar', <Calendar label="Data da revisão" value="2026-08-25" />),

  drawer: DrawerSpecimen,

  attachment: () =>
    panel(
      'attachment',
      <Attachment
        files={[
          { name: 'briefing.pdf', sizeLabel: '240 KB', type: 'PDF' },
          { name: 'mapa.png', sizeLabel: '1.1 MB', type: 'PNG' },
        ]}
      />,
    ),

  carousel: () =>
    panel(
      'carousel',
      <Carousel
        label="Casos de uso"
        slides={[
          <Text key="1">Diagnóstico orientado à dor do negócio.</Text>,
          <Text key="2">Automação com aprovação humana.</Text>,
          <Text key="3">Mensuração de impacto contínuo.</Text>,
        ]}
      />,
    ),

  'navigation-menu': () =>
    panel(
      'navigation-menu',
      <NavigationMenu
        label="Produto"
        items={[
          { label: 'Visão geral', href: '#navigation-menu', current: true },
          { label: 'Clientes', href: '#navigation-menu' },
          { label: 'Automação', href: '#navigation-menu' },
        ]}
      />,
    ),

  questionnaire: () =>
    panel(
      'questionnaire',
      <Questionnaire
        steps={[
          { id: 'pain', question: 'Qual é a dor principal?', description: 'Seja específico.' },
          { id: 'impact', question: 'Qual impacto esperado?' },
          { id: 'horizon', question: 'Em qual horizonte?' },
        ]}
        index={0}
      >
        <Input aria-label="Resposta" placeholder="Sua resposta" />
      </Questionnaire>,
    ),

  menubar: () =>
    panel(
      'menubar',
      <Menubar
        menus={[
          { label: 'Arquivo', items: [{ label: 'Novo' }, { label: 'Exportar' }] },
          { label: 'Editar', items: [{ label: 'Duplicar' }, { label: 'Arquivar' }] },
        ]}
      />,
    ),

  bubble: () =>
    panel(
      'bubble',
      <Stack gap={3}>
        <Bubble speaker="human" name="Marina">
          Preciso priorizar o diagnóstico desta semana.
        </Bubble>
        <Bubble speaker="agent" name="Improve Agent">
          Vamos começar pela dor operacional mais cara.
        </Bubble>
      </Stack>,
      'bounded',
    ),

  message: () =>
    panel(
      'message',
      <Message author={{ name: 'Improve Agent', role: 'agent' }} streaming>
        Preparando o plano de execução…
      </Message>,
      'bounded',
    ),

  'message-scroller': () =>
    panel(
      'message-scroller',
      <MessageScroller style={{ maxBlockSize: '10rem' }} aria-label="Histórico da conversa">
        <Message author={{ name: 'Marina', role: 'human' }}>Olá</Message>
        <Message author={{ name: 'Improve Agent', role: 'agent' }}>Como posso ajudar?</Message>
        <Message author={{ name: 'Marina', role: 'human' }}>Mostre o próximo passo.</Message>
      </MessageScroller>,
      'bounded',
    ),
};

export const componentSpecimenIds: string[] = manifest.components.map((component) => component.id);

export function ComponentSpecimen({ id }: { id: string }) {
  const Specimen = componentSpecimens[id];
  return Specimen ? <Specimen /> : null;
}
