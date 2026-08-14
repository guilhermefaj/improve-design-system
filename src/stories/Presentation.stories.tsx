import type { Meta, StoryObj } from '@storybook/react-vite';
import { PresentationCatalog } from '../showcase/registry';

const meta = {
  title: '08 Presentation/Slides',
  component: PresentationCatalog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PresentationCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
