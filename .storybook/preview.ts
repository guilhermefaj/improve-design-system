import type { Preview } from '@storybook/react-vite';
import { createElement } from 'react';
import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/edu-nsw-act-cursive/400.css';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';
import '../src/styles/components.css';
import '../src/showcase/showcase.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema visual Improve',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => createElement('div', { 'data-ibs-theme': context.globals.theme, style: { minHeight: '100vh', background: 'var(--ibs-color-canvas)', color: 'var(--ibs-color-text)' } }, createElement(Story)),
  ],
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
        ink: { name: 'Ink', value: '#2c2c2e' },
        purple: { name: 'Purple', value: '#483c8f' },
      },
    },
  },
};

export default preview;
