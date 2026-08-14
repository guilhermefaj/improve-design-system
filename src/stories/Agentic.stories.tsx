import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgenticCatalog } from '../showcase/registry';

const meta = { title: '05 Agentic Patterns/Overview', component: AgenticCatalog, tags: ['autodocs'] } satisfies Meta<
  typeof AgenticCatalog
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Workspace: Story = {};
