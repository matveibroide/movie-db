import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <ErrorBoundary>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </ErrorBoundary>
);

