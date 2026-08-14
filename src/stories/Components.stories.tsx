import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoreAtomsCatalog } from '../showcase/registry';

const meta = { title: '02 Atoms/Core', component: CoreAtomsCatalog, tags: ['autodocs'] } satisfies Meta<
  typeof CoreAtomsCatalog
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Core: Story = {};
