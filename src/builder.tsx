import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    renderApp: ({ elementId }: { elementId: string }) => void;
  }
}

const renderApp = ({ elementId }: { elementId: string }) => {
  if (!elementId) {
    console.error('elementId is required');
    return;
  }

  ReactDOM.createRoot(document.getElementById(elementId)!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// It is for umd file
if (window) {
  window.renderApp = renderApp;
}

export { renderApp };
