import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
/*

Coded by Danielle Bagaforo Meer
Lets Connect : https://www.linkedin.com/in/algorexph

*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
