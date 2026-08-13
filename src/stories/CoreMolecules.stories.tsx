import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoreMoleculesCatalog } from '../showcase/registry';

const meta = { title: '03 Molecules/Core', component: CoreMoleculesCatalog, tags: ['autodocs'] } satisfies Meta<typeof CoreMoleculesCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
