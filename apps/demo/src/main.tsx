import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import your local library!
import { LuxeEditor } from '@luxe-edit/core';
// 2. Import the styles from the core package
import '@luxe-edit/core/index.css'; 

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>LuxeEdit Demo</h1>
      <p>This editor is powered by your local @luxe-edit/core package.</p>
      
      {/* 3. Use your component */}
      <LuxeEditor 
        initialConfig={{ 
          namespace: 'LuxeDemo',
          theme: {} 
        }} 
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);