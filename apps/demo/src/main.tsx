import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import your local library!
import { LuxeEditor, type ToolbarItem } from '@luxe-edit/core';
// 2. Import the styles from the core package
import '@luxe-edit/core/index.css'; 

function App() {
  const [showFloatingToolbar, setShowFloatingToolbar] = React.useState(true);
  const [showTopToolbar, setShowTopToolbar] = React.useState(true);

  // Custom toolbar items array
  const toolbarItems: ToolbarItem[] = [
    { type: 'bold' },
    { type: 'italic' },
    { type: 'underline' },
    { type: 'strikethrough' },
    // Note: Headings require additional Lexical nodes setup
    { type: 'heading1' },
    { type: 'heading2' },
    { type: 'heading3' },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>LuxeEdit Demo</h1>
      <p>This editor is powered by your local @luxe-edit/core package.</p>
      
      {/* Toggle toolbar controls */}
      <div style={{ marginBottom: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '6px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showTopToolbar} 
              onChange={(e) => setShowTopToolbar(e.target.checked)}
            />
            <span>Show Top Toolbar</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showFloatingToolbar} 
              onChange={(e) => setShowFloatingToolbar(e.target.checked)}
            />
            <span>Show Floating Toolbar (appears when text is selected)</span>
          </label>
        </div>
      </div>

      <p style={{ fontSize: '14px', color: '#666' }}>
        💡 Tip: Select some text to see the floating toolbar, or use the top toolbar anytime!
      </p>
      
      {/* 3. Use your component with custom toolbarItems */}
      <LuxeEditor 
        initialConfig={{ 
          namespace: 'LuxeDemo',
          theme: {} 
        }}
        showToolbar={showTopToolbar}
        showFloatingToolbar={showFloatingToolbar}
        toolbarItems={toolbarItems}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);