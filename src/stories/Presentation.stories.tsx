import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Slide, SlideFooter, SlideKicker, SlideMetric, SlideTitle, Stack, Text } from '../components';

function PresentationCatalog() {
  return <Stack gap={8}><Slide tone="canvas"><SlideKicker>Improve Business</SlideKicker><SlideTitle>Transformação com IA começa no negócio.</SlideTitle><SlideFooter page={1} /></Slide><Slide tone="warm"><SlideKicker>Impacto</SlideKicker><Grid columns={3}><SlideMetric value="3,2×" label="mais velocidade na tomada de decisão" /><SlideMetric value="-28%" label="de esforço operacional repetitivo" /><SlideMetric value="92%" label="de adoção pelas equipes" /></Grid><Text style={{ marginTop: '4cqw' }}>Estrutura 16:9 pronta para captura, impressão e exportação.</Text><SlideFooter page={2} /></Slide></Stack>;
}

const meta = { title: '06 Presentation/Slides', component: PresentationCatalog, tags: ['autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof PresentationCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
