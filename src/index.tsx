import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Configure Amplify with the generated outputs
// If outputs is empty (sandbox not run), this will warn in console but not crash root
try {
  Amplify.configure(outputs);
} catch (error) {
  console.warn('Amplify initialization warning:', error);
}

import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);