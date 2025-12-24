import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import your local library!
import { LuxeEditor } from '@luxe-edit/core';
// 2. Import the styles from the core package
import '@luxe-edit/core/index.css'; 

function App() {
  const [showToolbar, setShowToolbar] = React.useState(true);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>LuxeEdit Demo</h1>
      <p>This editor is powered by your local @luxe-edit/core package.</p>
      
      {/* Toggle toolbar control */}
      <div style={{ marginBottom: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '6px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showToolbar} 
            onChange={(e) => setShowToolbar(e.target.checked)}
          />
          <span>Enable Floating Toolbar</span>
        </label>
      </div>

      <p style={{ fontSize: '14px', color: '#666' }}>
        💡 Tip: Select some text to see the floating toolbar with Bold and Italic buttons!
      </p>
      
      {/* 3. Use your component with showFloatingToolbar prop */}
      <LuxeEditor 
        initialConfig={{ 
          namespace: 'LuxeDemo',
          theme: {} 
        }}
        showFloatingToolbar={showToolbar}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);