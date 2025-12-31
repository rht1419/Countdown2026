import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// We don't import index.css here if we use global.css in App.jsx, but standard Vite setup usually has it.
// Let's stick to importing App which imports global.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
