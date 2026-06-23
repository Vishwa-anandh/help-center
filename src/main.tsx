import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', background: '#fee' }}>
          <h2>React Error Boundary</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '11px', lineHeight: '1.2' }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '11px', lineHeight: '1.2' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

window.onerror = function(message, source, lineno, colno, error) {
  const el = document.createElement('div');
  el.style.padding = '20px';
  el.style.background = '#fcc';
  el.style.color = 'red';
  el.style.position = 'fixed';
  el.style.top = '0';
  el.style.left = '0';
  el.style.zIndex = '9999';
  el.innerHTML = `<h3>Global Error</h3><pre>${message}</pre><pre>${source}:${lineno}:${colno}</pre><pre>${error?.stack}</pre>`;
  document.body.prepend(el);
};

window.addEventListener('unhandledrejection', function(event) {
  const el = document.createElement('div');
  el.style.padding = '20px';
  el.style.background = '#fcc';
  el.style.color = 'red';
  el.style.position = 'fixed';
  el.style.top = '100px';
  el.style.left = '0';
  el.style.zIndex = '9999';
  el.innerHTML = `<h3>Unhandled Promise Rejection</h3><pre>${event.reason?.toString()}</pre><pre>${event.reason?.stack}</pre>`;
  document.body.prepend(el);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

