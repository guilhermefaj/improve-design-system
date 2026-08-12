import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  Database,
  Image,
  LayoutDashboard,
  Menu,
  Moon,
  Palette,
  Rocket,
  Scale,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  WandSparkles,
  Zap,
} from 'lucide-react';
import {
  Accordion,
  ActionMenu,
  AgentStatus,
  Alert,
  ApprovalCard,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonLink,
  Card,
  CardBody,
  Checkbox,
  Cluster,
  Container,
  CitationList,
  DataTable,
  Dialog,
  Divider,
  EcosystemCard,
  Eyebrow,
  FeatureCard,
  Footer,
  FormField,
  Grid,
  Heading,
  Hero,
  IconButton,
  Input,
  LogoCloud,
  Pagination,
  Progress,
  PlanSteps,
  Quote,
  RadioSet,
  Section,
  Select,
  ServicePanel,
  SiteHeader,
  Skeleton,
  Slide,
  SlideFooter,
  SlideKicker,
  SlideMetric,
  SlideTitle,
  Spinner,
  Stack,
  Stat,
  Switch,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  ToolCallCard,
} from '../components';

const colors = [
  { name: 'Brand / 500', value: '#FF5A00', className: 'brand' },
  { name: 'Ink / 900', value: '#1D1D1F', className: 'ink' },
  { name: 'Warm / 100', value: '#F5F2F0', className: 'warm' },
  { name: 'Canvas / 0', value: '#FFFFFF', className: 'canvas' },
  { name: 'Strategy', value: '#8F6CAD', className: 'strategy' },
  { name: 'Technology', value: '#244D7E', className: 'technology' },
];

export function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div data-ibs-theme={dark ? 'dark' : 'light'}>
      <SiteHeader
        items={[
          { label: 'Fundamentos', href: '#fundamentos', current: true },
          { label: 'Componentes', href: '#componentes' },
          { label: 'Padrões', href: '#padroes' },
          { label: 'Conteúdo', href: '#conteudo' },
          { label: 'Agentic', href: '#agentic' },
        ]}
        action={{ label: 'Documentação', href: '#componentes' }}
      />

      <main>
        <Hero
          eyebrow="Improve Design System · v0.2"
          title={<>Design que entende o negócio.</>}
          description={<>Um sistema limpo, expressivo e acessível para transformar estratégia em experiências digitais consistentes — de landing pages a produtos e apresentações.</>}
          primaryAction={{ label: 'Explorar o sistema', href: '#fundamentos' }}
          secondaryAction={{ label: 'Ver componentes', href: '#componentes' }}
        />

        <Section tone="ink" className="demo-principles">
          <Container>
            <Eyebrow style={{ color: 'var(--ibs-orange-300)' }}>Princípios</Eyebrow>
            <Grid columns={4} gap={8} style={{ marginTop: 'var(--ibs-space-10)' }}>
              <div><span className="demo-index">01</span><Heading level={3} size={4}>Clareza antes do efeito.</Heading></div>
              <div><span className="demo-index">02</span><Heading level={3} size={4}>Negócio antes da tecnologia.</Heading></div>
              <div><span className="demo-index">03</span><Heading level={3} size={4}>Sistema antes da exceção.</Heading></div>
              <div><span className="demo-index">04</span><Heading level={3} size={4}>Acessibilidade desde a base.</Heading></div>
            </Grid>
          </Container>
        </Section>

        <Section id="fundamentos">
          <Container>
            <div className="demo-section-head">
              <Stack gap={4}>
                <Eyebrow>01 · Fundamentos</Eyebrow>
                <Heading level={2}>Uma identidade calma, com energia no lugar certo.</Heading>
              </Stack>
              <Text size="lg" tone="muted">O branco organiza, o preto quente ancora e o laranja sinaliza ação e transformação. As cores de ecossistema diferenciam frentes sem fragmentar a marca.</Text>
            </div>

            <Grid columns={3} gap={4} className="demo-swatches">
              {colors.map((color) => <div className="demo-swatch" key={color.name}><div className={`demo-swatch__color demo-swatch__color--${color.className}`} /><div><strong>{color.name}</strong><code>{color.value}</code></div></div>)}
            </Grid>

            <Divider style={{ marginBlock: 'var(--ibs-space-20)' }} />

            <Grid columns={2} gap={12}>
              <Stack gap={6}>
                <Eyebrow>Tipografia</Eyebrow>
                <div className="demo-type-sample">Aa</div>
                <Heading level={3} size={2}>Inter + Clash Display</Heading>
                <Text tone="muted">Inter estrutura texto e produto. Clash Display Bold cria títulos memoráveis; Castledown e Montserrat entram apenas como acentos controlados.</Text>
              </Stack>
              <div className="demo-type-scale">
                <div><span>Display</span><strong style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>Transformar</strong></div>
                <div><span>Heading 02</span><strong style={{ fontSize: 'var(--ibs-text-3xl)' }}>Estratégia aplicada</strong></div>
                <div><span>Body LG</span><strong style={{ fontSize: 'var(--ibs-text-lg)' }}>Entendemos a dor real antes de desenhar a solução.</strong></div>
                <div><span>Caption</span><strong style={{ fontSize: 'var(--ibs-text-xs)' }}>RESULTADO MENSURÁVEL · AGO 2026</strong></div>
              </div>
            </Grid>
          </Container>
        </Section>

        <Section tone="warm" id="componentes">
          <Container>
            <div className="demo-section-head">
              <Stack gap={4}>
                <Eyebrow>02 · Componentes</Eyebrow>
                <Heading level={2}>Blocos consistentes. Composição sem rigidez.</Heading>
              </Stack>
              <Text size="lg" tone="muted">APIs pequenas, estados visíveis e comportamento acessível. Cada elemento funciona sozinho e ganha força quando composto.</Text>
            </div>

            <div className="demo-lab">
              <div className="demo-lab__block">
                <span className="demo-label">Ações</span>
                <Cluster gap={3}>
                  <Button variant="solid" trailingIcon={<ArrowRight />}>Continuar</Button>
                  <Button variant="primary">Começar agora</Button>
                  <Button variant="outline">Saiba mais</Button>
                  <Button variant="ghost">Cancelar</Button>
                  <Tooltip label="Alternar tema"><IconButton label="Alternar tema" icon={dark ? <Sun /> : <Moon />} onClick={() => setDark((value) => !value)} /></Tooltip>
                  <ActionMenu items={[{ label: 'Duplicar' }, { label: 'Arquivar' }, { label: 'Excluir' }]} />
                </Cluster>
              </div>

              <div className="demo-lab__block">
                <span className="demo-label">Status</span>
                <Cluster gap={3}>
                  <Badge>Neutro</Badge><Badge tone="brand">Em evolução</Badge><Badge tone="success">Ativo</Badge><Badge tone="info">Novo</Badge><Badge tone="warning">Atenção</Badge>
                </Cluster>
              </div>

              <div className="demo-lab__block demo-lab__block--wide">
                <span className="demo-label">Formulários</span>
                <Grid columns={2} gap={6}>
                  <FormField label="Empresa" hint="Como devemos identificar sua organização?"><Input placeholder="Nome da empresa" /></FormField>
                  <FormField label="Prioridade" required><Select defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Eficiência operacional</option><option>Experiência do cliente</option><option>Crescimento e vendas</option></Select></FormField>
                  <FormField label="Desafio do negócio" hint="Seja específico sobre o resultado esperado."><Textarea placeholder="Conte o que mais consome tempo ou limita o crescimento…" /></FormField>
                  <Stack gap={5}>
                    <Checkbox label="Aceito receber um diagnóstico inicial" defaultChecked />
                    <Switch label="Incluir recomendações com IA" defaultChecked />
                    <RadioSet label="Horizonte" defaultValue="90" options={[{ value: '30', label: '30 dias' }, { value: '90', label: '90 dias' }, { value: '180', label: '6 meses' }]} />
                  </Stack>
                </Grid>
              </div>

              <div className="demo-lab__block demo-lab__block--wide">
                <span className="demo-label">Feedback e carregamento</span>
                <Grid columns={2} gap={4}>
                  <Alert tone="success" title="Diagnóstico concluído">Encontramos três oportunidades de alto impacto.</Alert>
                  <Alert tone="warning" title="Revisão humana necessária">A decisão afeta uma política crítica da empresa.</Alert>
                  <Stack gap={3}><Progress value={68} label="Progresso do diagnóstico" /><Text size="sm" tone="muted">68% do mapeamento concluído</Text></Stack>
                  <Cluster><Spinner /><Skeleton width="12rem" height="1rem" /><Skeleton width="5rem" height="1rem" /></Cluster>
                </Grid>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="padroes">
          <Container>
            <div className="demo-section-head">
              <Stack gap={4}>
                <Eyebrow>03 · Padrões de marca</Eyebrow>
                <Heading level={2}>Para contar a história e operar o produto.</Heading>
              </Stack>
              <Text size="lg" tone="muted">Blocos editoriais do site atual evoluídos para um ecossistema que também suporta dashboards, fluxos consultivos e experiências com IA.</Text>
            </div>

            <Grid columns={2} gap={6}>
              <FeatureCard icon={<WandSparkles className="ibs-feature-card__icon" />} title="Transformação com IA" description="Automação inteligente desenhada a partir da dor real do negócio." />
              <FeatureCard icon={<Rocket className="ibs-feature-card__icon" />} title="Inovação aplicada" description="Estratégia que vira experimento, produto e resultado mensurável." />
              <FeatureCard icon={<Image className="ibs-feature-card__icon" />} title="Conteúdo que move" description="Narrativas claras para alinhar pessoas, marca e oportunidade." />
              <FeatureCard icon={<Scale className="ibs-feature-card__icon" />} title="Decisões com segurança" description="Inteligência jurídica conectada aos objetivos da organização." />
            </Grid>

            <Stack gap={8} style={{ marginTop: 'var(--ibs-space-20)' }}>
              <Heading level={3} size={3}>Ecossistema Improve</Heading>
              <Grid columns={3} gap={4}>
                <EcosystemCard title="Improve AI" description="Agentes e automações sob medida." />
                <EcosystemCard accent="strategy" title="Design Estratégico" description="Pesquisa, jornadas e oportunidades." />
                <EcosystemCard accent="ux" title="UX/UI" description="Interfaces claras e sistemas escaláveis." />
                <EcosystemCard accent="technology" title="Tecnologia" description="Dados, frontend e integrações." />
                <EcosystemCard accent="talent" title="Talentos" description="Times preparados para transformar." />
                <EcosystemCard accent="events" title="Cursos e Eventos" description="Aprendizado que gera movimento." />
              </Grid>
            </Stack>

            <Grid columns={3} gap={6} style={{ marginTop: 'var(--ibs-space-20)' }}>
              <ServicePanel title="Design Estratégico" accent="var(--ibs-accent-strategy)" items={[{ icon: <Users />, label: 'Desenho de Personas' }, { icon: <BrainCircuit />, label: 'Pesquisas Aprofundadas' }, { icon: <Boxes />, label: 'Jornadas e Melhorias' }]} />
              <ServicePanel title="UX/UI" accent="var(--ibs-accent-ux)" items={[{ icon: <Sparkles />, label: 'Estudos de Usabilidade' }, { icon: <LayoutDashboard />, label: 'Criação de Interfaces' }, { icon: <Palette />, label: 'Design System' }]} />
              <ServicePanel title="Tecnologia" accent="var(--ibs-accent-technology)" items={[{ icon: <BarChart3 />, label: 'Data & Analytics' }, { icon: <Zap />, label: 'Desenvolvimento Frontend' }, { icon: <Database />, label: 'Integrações e Dados' }]} />
            </Grid>
          </Container>
        </Section>

        <Section tone="warm" id="conteudo">
          <Container>
            <Grid columns={2} gap={16}>
              <Stack gap={8}>
                <Eyebrow>04 · Conteúdo e IA</Eyebrow>
                <Heading level={2}>Não é só automatizar. É melhorar a forma como o negócio resolve problemas.</Heading>
                <Text size="lg" tone="muted">A voz Improve conecta contexto, decisão e impacto. Evita jargão vazio e sempre explica o que muda para pessoas, operação e resultado.</Text>
                <Cluster>
                  <ButtonLink href="#dados" variant="primary" trailingIcon={<ArrowRight />}>Ver aplicação</ButtonLink>
                  <Dialog
                    trigger={<Button variant="outline">Abrir diagnóstico</Button>}
                    title="Comece pela dor do negócio"
                    description="Descreva o processo, o impacto atual e o resultado que precisa mudar. A tecnologia vem depois."
                    actionLabel="Criar diagnóstico"
                  ><FormField label="O que precisa melhorar?"><Textarea placeholder="Ex.: o time perde 20 horas por semana consolidando dados…" /></FormField></Dialog>
                </Cluster>
              </Stack>
              <Stack gap={6}>
                <Quote author="Princípio de conteúdo" role="Improve Business">Entenda o contexto. Nomeie a tensão. Mostre o caminho. Meça o impacto.</Quote>
                <Tabs items={[
                  { value: 'resposta', label: 'Agentes de resposta', content: <Text tone="muted">Centralizam conhecimento e oferecem respostas precisas, contextualizadas e consistentes.</Text> },
                  { value: 'acao', label: 'Agentes de ação', content: <Text tone="muted">Integram sistemas e executam processos com regras, segurança e rastreabilidade.</Text> },
                  { value: 'consultoria', label: 'Consultoria', content: <Text tone="muted">Conecta tecnologia à estratégia, aos limites operacionais e às metas mensuráveis.</Text> },
                ]} />
                <Accordion defaultValue="seguranca" items={[
                  { value: 'seguranca', title: 'Segurança e conformidade', content: 'Proteção de dados, rastreabilidade e revisão humana para decisões críticas.' },
                  { value: 'integracao', title: 'Integração com o stack atual', content: 'A solução se adapta à infraestrutura da empresa e reduz fragmentação.' },
                  { value: 'medicao', title: 'Impacto mensurável', content: 'Critérios de sucesso e indicadores são definidos antes da automação.' },
                ]} />
              </Stack>
            </Grid>
          </Container>
        </Section>

        <Section id="dados">
          <Container>
            <div className="demo-section-head">
              <Stack gap={4}>
                <Eyebrow>05 · Dados e operação</Eyebrow>
                <Heading level={2}>Interfaces confiáveis para decisões reais.</Heading>
              </Stack>
              <Text size="lg" tone="muted">Tabelas, status e navegação seguem o mesmo vocabulário visual das páginas institucionais.</Text>
            </div>

            <Breadcrumbs items={[{ label: 'Projetos', href: '#' }, { label: 'Transformação operacional', href: '#' }, { label: 'Oportunidades' }]} />
            <DataTable caption="Oportunidades do diagnóstico" style={{ marginTop: 'var(--ibs-space-6)' }}>
              <thead><tr><th>Oportunidade</th><th>Impacto</th><th>Esforço</th><th>Status</th><th><span className="ibs-sr-only">Ações</span></th></tr></thead>
              <tbody>
                <tr><td><strong>Conciliação automática de dados</strong></td><td>12h/semana</td><td>Baixo</td><td><Badge tone="success">Priorizado</Badge></td><td><ActionMenu items={[{ label: 'Ver detalhe' }, { label: 'Criar iniciativa' }]} /></td></tr>
                <tr><td><strong>Agente para políticas internas</strong></td><td>−34% chamados</td><td>Médio</td><td><Badge tone="info">Em análise</Badge></td><td><ActionMenu items={[{ label: 'Ver detalhe' }, { label: 'Criar iniciativa' }]} /></td></tr>
                <tr><td><strong>Triagem inteligente de solicitações</strong></td><td>2,4× velocidade</td><td>Médio</td><td><Badge tone="brand">Descoberta</Badge></td><td><ActionMenu items={[{ label: 'Ver detalhe' }, { label: 'Criar iniciativa' }]} /></td></tr>
              </tbody>
            </DataTable>
            <div style={{ marginTop: 'var(--ibs-space-6)' }}><Pagination page={page} pages={3} onChange={setPage} /></div>

            <Grid columns={4} gap={6} style={{ marginTop: 'var(--ibs-space-20)' }}>
              <Stat value="12h" label="economizadas por semana" />
              <Stat value="34%" label="menos solicitações repetidas" />
              <Stat value="2,4×" label="mais velocidade no fluxo" />
              <Stat value="100%" label="das decisões rastreáveis" />
            </Grid>
          </Container>
        </Section>

        <Section tone="warm" id="agentic">
          <Container>
            <div className="demo-section-head">
              <Stack gap={4}>
                <Eyebrow>06 · Agentic first</Eyebrow>
                <Heading level={2}>Agentes claros, controláveis e confiáveis.</Heading>
              </Stack>
              <Text size="lg" tone="muted">Execução, ferramentas, aprovação e fontes aparecem no nível certo de detalhe, sem expor raciocínio interno bruto.</Text>
            </div>
            <Grid columns={2} gap={6}>
              <Stack gap={4}>
                <AgentStatus status="running" detail="Preparando recomendação operacional" />
                <PlanSteps steps={[
                  { id: 'contexto', label: 'Entender o contexto', status: 'completed' },
                  { id: 'dados', label: 'Analisar oportunidades', status: 'in_progress' },
                  { id: 'revisao', label: 'Revisão humana', status: 'pending' },
                ]} />
                <ToolCallCard name="Análise de oportunidades" purpose="Priorizar impacto e esforço" status="succeeded" attempt={1} durationMs={1240} output={<Text size="sm">Três oportunidades priorizadas.</Text>} />
              </Stack>
              <ApprovalCard title="Compartilhar recomendação executiva" action="Enviar relatório" system="Workspace Improve" destination="Time de Operações" dataScopes={['Resumo agregado', 'Oportunidades priorizadas']} consequence="O documento ficará visível para os membros do workspace." risk="medium" reversible onApprove={() => undefined} onEdit={() => undefined} onReject={() => undefined} />
            </Grid>
            <CitationList style={{ marginTop: 'var(--ibs-space-8)' }} items={[
              { id: '1', title: 'Diagnóstico operacional', source: 'Improve Business', href: '#dados', summary: 'Base de oportunidades e métricas usadas na recomendação.', verified: true },
              { id: '2', title: 'Critérios de governança', source: 'Política interna', href: '#conteudo', verified: true },
            ]} />
          </Container>
        </Section>

        <Section id="slides">
          <Container>
            <div className="demo-section-head">
              <Stack gap={4}>
                <Eyebrow>07 · Apresentações</Eyebrow>
                <Heading level={2}>O mesmo sistema, no formato de decisão.</Heading>
              </Stack>
              <Text size="lg" tone="muted">Primitivos 16:9 preservam tipografia, cores e hierarquia em apresentações React, exportações para PDF e telas executivas.</Text>
            </div>
            <Slide tone="brand">
              <SlideKicker>Impacto operacional · Caso demonstrativo</SlideKicker>
              <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', alignItems: 'end', gap: '8cqw' }}>
                <SlideTitle>A dor é operacional. A transformação é estratégica.</SlideTitle>
                <SlideMetric value="12h" label="de trabalho repetitivo eliminadas por semana" />
              </div>
              <SlideFooter page={12} label="Diagnóstico de oportunidades" />
            </Slide>
          </Container>
        </Section>

        <Section tone="brand" className="demo-cta">
          <Container>
            <Grid columns={2} gap={12}>
              <Heading level={2}>Let’s improve it out.</Heading>
              <Stack gap={6}>
                <Text size="lg">Transformação profissional começa com uma leitura honesta do negócio.</Text>
                <Cluster><ButtonLink href="mailto:contato@improve.business" variant="solid" size="lg">contato@improve.business</ButtonLink><Avatar name="Improve Business" size="lg" /></Cluster>
              </Stack>
            </Grid>
          </Container>
        </Section>

        <Section className="demo-trust">
          <Container><LogoCloud labels={['Banco24Horas', 'Hedgepoint', 'BRF', 'Gympass', 'Mills', 'Cielo']} /></Container>
        </Section>
      </main>

      <Footer
        description="Consultoria de transformação que conecta estratégia, design, tecnologia e IA aos desafios reais do negócio."
        links={[{ label: 'Início', href: '#' }, { label: 'Serviços', href: '#padroes' }, { label: 'Design System', href: '#fundamentos' }]}
        social={[{ label: 'LinkedIn', href: 'https://www.linkedin.com' }, { label: 'Instagram', href: 'https://www.instagram.com' }]}
      ><ButtonLink href="mailto:contato@improve.business" variant="link" style={{ marginTop: 'var(--ibs-space-5)' }}>contato@improve.business</ButtonLink></Footer>
    </div>
  );
}
