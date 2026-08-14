import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoundationsCatalog } from '../showcase/registry';

const meta = {
  title: '01 Foundations/Overview',
  component: FoundationsCatalog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FoundationsCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
