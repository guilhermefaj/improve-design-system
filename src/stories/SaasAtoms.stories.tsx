import type { Meta, StoryObj } from '@storybook/react-vite';
import { AtomCatalog } from '../showcase/registry';

const meta = { title: '02 Atoms/SaaS Controls', component: AtomCatalog, tags: ['autodocs'] } satisfies Meta<
  typeof AtomCatalog
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
