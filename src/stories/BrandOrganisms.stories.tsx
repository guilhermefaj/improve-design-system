import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandOrganismsCatalog } from '../showcase/registry';

const meta = { title: '04 Organisms/Brand Patterns', component: BrandOrganismsCatalog, tags: ['autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof BrandOrganismsCatalog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {};
