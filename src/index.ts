import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat/wght.css';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/components.css';

export * from './components';
export { designTokens, flatTokens } from './tokens/generated';
export type { DesignTokenPath } from './tokens/generated';

export const improveTokens = {
  color: {
    brand: '#ff5a00',
    actionPrimary: '#b93800',
    actionPrimaryHover: '#932f08',
    actionPrimaryActive: '#77290d',
    actionPrimaryText: '#ffffff',
    ink: '#1d1d1f',
    warm: '#f5f2f0',
    canvas: '#ffffff',
  },
  fontFamily: "'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
  displayFontFamily: "'Clash Display', 'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
  accentFontFamily: "'Castledown Cursive Dots No Guide', 'Clash Display', 'Inter Variable', Inter, cursive",
  supportingFontFamily: "'Montserrat Variable', Montserrat, 'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
  radius: { control: 10, card: 16, pill: 999 },
} as const;
