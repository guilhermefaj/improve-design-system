import type { Preview } from '@storybook/react-vite';
import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/edu-nsw-act-cursive/400.css';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';
import '../src/styles/components.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: {
      storySort: { order: ['00 Introducao', '01 Foundations', '02 Atoms', '03 Molecules', '04 Organisms', '05 Agentic Patterns', '06 Presentation', '07 Playground'] },
    },
    a11y: { test: 'error' },
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: '#ffffff' },
        warm: { name: 'Warm', value: '#f5f2f0' },
        ink: { name: 'Ink', value: '#4f4f51' },
        purple: { name: 'Purple', value: '#483c8f' },
      },
    },
  },
};

export default preview;
