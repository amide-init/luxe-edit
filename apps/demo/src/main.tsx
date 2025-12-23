import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import your local library!
import { LuxeEditor, FloatingToolbarPlugin } from '@luxe-edit/core';
// 2. Import the styles from the core package
import '@luxe-edit/core/index.css'; 

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>LuxeEdit Demo</h1>
      <p>This editor is powered by your local @luxe-edit/core package.</p>
      <p style={{ fontSize: '14px', color: '#666' }}>
        💡 Tip: Select some text to see the floating toolbar with Bold and Italic buttons!
      </p>
      
      {/* 3. Use your component */}
      <LuxeEditor 
        initialConfig={{ 
          namespace: 'LuxeDemo',
          theme: {} 
        }} 
      >
        <FloatingToolbarPlugin />
      </LuxeEditor>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);