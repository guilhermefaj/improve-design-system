import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/montserrat/wght.css';
import '../styles/tokens.css';
import '../styles/globals.css';
import '../styles/components.css';
import '../showcase/showcase.css';
import './demo.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
