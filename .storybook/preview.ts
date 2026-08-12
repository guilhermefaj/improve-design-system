import type { Preview } from '@storybook/react-vite';
import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat/wght.css';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';
import '../src/styles/components.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: '#ffffff' },
        warm: { name: 'Warm', value: '#f5f2f0' },
        ink: { name: 'Ink', value: '#1d1d1f' },
      },
    },
  },
};

export default preview;
