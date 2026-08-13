import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrganismCatalog } from '../showcase/registry';

const meta = { title: '04 Organisms/SaaS Workspace', component: OrganismCatalog, tags: ['autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof OrganismCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
