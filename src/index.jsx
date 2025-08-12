// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('BOOT'); // should appear in DevTools
const el = document.getElementById('root');
const root = createRoot(el);
root.render(<App />);

if (import.meta?.webpackHot || module?.hot) {
  (import.meta?.webpackHot || module.hot).accept();
}
