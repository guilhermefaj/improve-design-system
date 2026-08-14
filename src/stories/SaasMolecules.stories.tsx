import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoleculeCatalog } from '../showcase/registry';

const meta = { title: '03 Molecules/SaaS Patterns', component: MoleculeCatalog, tags: ['autodocs'] } satisfies Meta<
  typeof MoleculeCatalog
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
