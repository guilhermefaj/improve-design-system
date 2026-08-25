import { useState, type ReactNode } from 'react';
import {
  AlertDialog,
  Attachment,
  Bubble,
  Button,
  Calendar,
  Carousel,
  Chart,
  DirectionProvider,
  Drawer,
  DropdownMenu,
  Heading,
  Input,
  InputGroup,
  InputOTP,
  Item,
  Label,
  Marker,
  Menubar,
  Message,
  MessageScroller,
  NativeSelect,
  NavigationMenu,
  Questionnaire,
  Resizable,
  Stack,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  ToggleGroup,
} from '../components';

export function SpecimenPanel({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="showcase-panel" id={id} data-specimen-id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <header>
        <div>
          <Heading level={3} size={4} id={id ? `${id}-title` : undefined}>
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

export function FoundationsCatalogAdditions() {
  return (
    <Stack gap={7}>
      <SpecimenPanel id="direction" title="Direction" description="Provider LTR/RTL para composição bidirecional.">
        <DirectionProvider dir="rtl">
          <Text>Texto alinhado pela direção do provider (RTL neste exemplo).</Text>
        </DirectionProvider>
      </SpecimenPanel>
      <SpecimenPanel id="resizable" title="Resizable" description="Painéis com divisor arrastável.">
        <Resizable defaultSizes={[40, 60]}>
          <div style={{ padding: 'var(--ibs-space-4)' }}>
            <Text size="sm">Painel A</Text>
          </div>
          <div style={{ padding: 'var(--ibs-space-4)' }}>
            <Text size="sm">Painel B</Text>
          </div>
        </Resizable>
      </SpecimenPanel>
    </Stack>
  );
}

export function AtomsCatalogAdditions() {
  const [toggle, setToggle] = useState('list');
  return (
    <Stack gap={7}>
      <SpecimenPanel id="label" title="Label" description="Rótulo acessível first-class.">
        <Stack gap={2}>
          <Label htmlFor="catalog-label-input">Nome da empresa</Label>
          <Input id="catalog-label-input" placeholder="Improve Business" />
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel id="marker" title="Marker" description="Pontos de status e timeline.">
        <Stack gap={3}>
          <Marker tone="brand" label="Em andamento" />
          <Marker tone="success" label="Concluído" />
          <Marker tone="purple" label="Aguardando revisão" />
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel id="item" title="Item" description="Linha reutilizável para listas e menus.">
        <Stack gap={2}>
          <Item title="Diagnóstico" description="Priorize a dor do negócio" selected />
          <Item title="Automação" description="Execute com aprovação humana" href="#item" />
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel id="chart" title="Chart" description="Série simples bar/line.">
        <Stack gap={4}>
          <Chart label="Receita trimestral" data={[12, 18, 15, 28, 22, 34]} variant="line" />
          <Chart label="Tickets por semana" data={[8, 12, 9, 16, 14, 20]} variant="bar" />
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel id="toggle-group" title="Toggle Group" description="Grupo exclusivo de toggles.">
        <ToggleGroup
          label="Visualização"
          value={toggle}
          onValueChange={setToggle}
          items={[
            { value: 'list', label: 'Lista' },
            { value: 'board', label: 'Quadro' },
            { value: 'timeline', label: 'Timeline' },
          ]}
        />
      </SpecimenPanel>
    </Stack>
  );
}

export function MoleculesCoreCatalogAdditions() {
  const [otp, setOtp] = useState('');
  const [slide, setSlide] = useState(0);
  return (
    <Stack gap={7}>
      <SpecimenPanel id="native-select" title="Native Select" description="Select HTML estilizado.">
        <Stack gap={2}>
          <Label htmlFor="native-select-demo">Prioridade</Label>
          <NativeSelect id="native-select-demo" defaultValue="impact">
            <option value="impact">Impacto</option>
            <option value="growth">Crescimento</option>
          </NativeSelect>
        </Stack>
      </SpecimenPanel>
      <SpecimenPanel id="input-group" title="Input Group" description="Afixos ao redor do campo.">
        <InputGroup start={<span>https://</span>} end={<span>.com</span>}>
          <Input aria-label="Domínio" placeholder="improve" />
        </InputGroup>
      </SpecimenPanel>
      <SpecimenPanel id="input-otp" title="Input OTP" description="Slots para código de verificação.">
        <InputOTP label="Código de verificação" value={otp} onValueChange={setOtp} />
      </SpecimenPanel>
      <SpecimenPanel id="table" title="Table" description="Primitivos de tabela.">
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
        </Table>
      </SpecimenPanel>
      <SpecimenPanel id="dropdown-menu" title="Dropdown Menu" description="Menu de ações first-class.">
        <DropdownMenu items={[{ label: 'Duplicar' }, { label: 'Arquivar' }, { label: 'Excluir', disabled: true }]} />
      </SpecimenPanel>
      <SpecimenPanel id="alert-dialog" title="Alert Dialog" description="Confirmação destrutiva.">
        <AlertDialog
          trigger={<Button variant="outline">Excluir projeto</Button>}
          title="Excluir projeto?"
          description="Esta ação remove o workspace e não pode ser desfeita."
          tone="danger"
          confirmLabel="Excluir"
        />
      </SpecimenPanel>
      <SpecimenPanel id="carousel" title="Carousel" description="Slides com teclado e controles.">
        <Carousel
          label="Casos de uso"
          index={slide}
          onIndexChange={setSlide}
          slides={[
            <Text key="1">Diagnóstico orientado à dor do negócio.</Text>,
            <Text key="2">Automação com aprovação humana.</Text>,
            <Text key="3">Mensuração de impacto contínuo.</Text>,
          ]}
        />
      </SpecimenPanel>
    </Stack>
  );
}

export function MoleculesSaasCatalogAdditions() {
  const [date, setDate] = useState('2026-08-25');
  const [files, setFiles] = useState([
    { name: 'briefing.pdf', sizeLabel: '240 KB', type: 'PDF' },
    { name: 'mapa.png', sizeLabel: '1.1 MB', type: 'PNG' },
  ]);
  const [qIndex, setQIndex] = useState(0);
  return (
    <Stack gap={7}>
      <SpecimenPanel id="calendar" title="Calendar" description="Seleção avulsa de data.">
        <Calendar label="Data da revisão" value={date} onValueChange={setDate} />
      </SpecimenPanel>
      <SpecimenPanel id="drawer" title="Drawer" description="Painel lateral ou inferior.">
        <Drawer
          trigger={<Button variant="outline">Abrir drawer</Button>}
          title="Detalhes do cliente"
          description="Contexto operacional sem sair da página."
          side="right"
        >
          <Text size="sm" tone="muted">
            Use Drawer para fluxos auxiliares; Dialog para interrupções curtas.
          </Text>
        </Drawer>
      </SpecimenPanel>
      <SpecimenPanel id="attachment" title="Attachment" description="Anexos com metadados.">
        <Attachment files={files} onRemove={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))} />
      </SpecimenPanel>
      <SpecimenPanel id="questionnaire" title="Questionnaire" description="Fluxo guiado de perguntas.">
        <Questionnaire
          steps={[
            { id: 'pain', question: 'Qual é a dor principal?', description: 'Seja específico.' },
            { id: 'impact', question: 'Qual impacto esperado?' },
            { id: 'horizon', question: 'Em qual horizonte?' },
          ]}
          index={qIndex}
          onIndexChange={setQIndex}
        >
          <Input aria-label="Resposta" placeholder="Sua resposta" />
        </Questionnaire>
      </SpecimenPanel>
    </Stack>
  );
}

export function BrandCatalogAdditions() {
  return (
    <Stack gap={7}>
      <SpecimenPanel id="navigation-menu" title="Navigation Menu" description="Navegação horizontal desacoplada.">
        <NavigationMenu
          label="Produto"
          items={[
            { label: 'Visão geral', href: '#navigation-menu', current: true },
            { label: 'Clientes', href: '#navigation-menu' },
            { label: 'Automação', href: '#navigation-menu' },
          ]}
        />
      </SpecimenPanel>
      <SpecimenPanel id="menubar" title="Menubar" description="Barra de menus desktop.">
        <Menubar
          menus={[
            {
              label: 'Arquivo',
              items: [{ label: 'Novo' }, { label: 'Exportar' }],
            },
            {
              label: 'Editar',
              items: [{ label: 'Duplicar' }, { label: 'Arquivar' }],
            },
          ]}
        />
      </SpecimenPanel>
    </Stack>
  );
}

export function AgenticCatalogAdditions() {
  return (
    <Stack gap={7}>
      <SpecimenPanel id="bubble" title="Bubble" description="Bolhas humana e agente.">
        <div
          className="ibs-message-scroller"
          style={{ maxBlockSize: 'none', border: 'none', padding: 0, background: 'transparent' }}
        >
          <Bubble speaker="human" name="Marina">
            Preciso priorizar o diagnóstico desta semana.
          </Bubble>
          <Bubble speaker="human" name="Marina" continued>
            O time operacional está no limite.
          </Bubble>
          <Bubble speaker="agent" name="Improve Agent">
            Vamos começar pela dor operacional mais cara.
          </Bubble>
          <Bubble speaker="agent" name="Improve Agent" continued>
            Posso devolver um plano em três passos.
          </Bubble>
        </div>
      </SpecimenPanel>
      <SpecimenPanel id="message" title="Message" description="Mensagem genérica de conversa.">
        <Message author={{ name: 'Improve Agent', role: 'agent' }} streaming>
          Preparando o plano de execução…
        </Message>
      </SpecimenPanel>
      <SpecimenPanel id="message-scroller" title="Message Scroller" description="Viewport com stick-to-bottom.">
        <MessageScroller style={{ maxBlockSize: '10rem' }} aria-label="Histórico da conversa">
          <Message author={{ name: 'Marina', role: 'human' }}>Olá</Message>
          <Message author={{ name: 'Improve Agent', role: 'agent' }}>Como posso ajudar?</Message>
          <Message author={{ name: 'Marina', role: 'human' }}>Mostre o próximo passo.</Message>
        </MessageScroller>
      </SpecimenPanel>
    </Stack>
  );
}
