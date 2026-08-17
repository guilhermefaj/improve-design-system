import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Improve Design System',
    brandUrl: '/',
    colorPrimary: '#483c8f',
    colorSecondary: '#f2703e',
    appBg: '#f5f2f0',
    appContentBg: '#ffffff',
    appBorderColor: '#e7e3e0',
    appBorderRadius: 10,
    fontBase: "'Inter Variable', Inter, sans-serif",
    fontCode: "'SFMono-Regular', Consolas, monospace",
    textColor: '#4f4f51',
    textInverseColor: '#ffffff',
    barTextColor: '#6f6f72',
    barSelectedColor: '#483c8f',
    barHoverColor: '#483c8f',
    inputBg: '#ffffff',
    inputBorder: '#d4cfcb',
    inputTextColor: '#4f4f51',
    inputBorderRadius: 8,
  }),
});
