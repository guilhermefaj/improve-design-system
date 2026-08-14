'use client';

import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/edu-nsw-act-cursive/400.css';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/components.css';

export * from './components';
export { designTokens, darkDesignTokens, flatTokens, darkFlatTokens, tokenCatalog } from './tokens/generated';
export type { DesignTokenPath, ThemeName } from './tokens/generated';

export const improveTokens = {
  color: {
    brand: '#f2703e',
    secondary: '#483c8f',
    actionPrimary: '#f2703e',
    actionPrimaryHover: '#f47f59',
    actionPrimaryActive: '#e96533',
    actionPrimaryText: '#ffffff',
    ink: '#4f4f51',
    warm: '#f5f2f0',
    canvas: '#ffffff',
  },
  fontFamily: "'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
  displayFontFamily:
    "'Clash Display', 'Space Grotesk Variable', 'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
  accentFontFamily: "'Edu NSW ACT Cursive', 'Inter Variable', Inter, cursive",
  supportingFontFamily:
    "'Montserrat Variable', Montserrat, 'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
  radius: { control: 10, card: 16, pill: 999 },
} as const;
