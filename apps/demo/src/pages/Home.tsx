import React from 'react';
import { LuxeEditor, type ToolbarItem, getEditorText, getEditorJSON } from 'luxe-edit';

export function Home() {
  const [showFloatingToolbar, setShowFloatingToolbar] = React.useState(true);
  const [showTopToolbar, setShowTopToolbar] = React.useState(true);
  const [editorContent, setEditorContent] = React.useState({
    text: '',
    json: null as any,
    wordCount: 0,
    charCount: 0
  });

  const toolbarItems: ToolbarItem[] = [
    { type: 'undo' },
    { type: 'redo' },
    { type: 'divider' },
    { type: 'bold' },
    { type: 'italic' },
    { type: 'underline' },
    { type: 'strikethrough' },
    { type: 'divider' },
    { type: 'textColor' },
    { type: 'backgroundColor' },
    { type: 'headingDropdown' },
    { type: 'divider' },
    { type: 'link' },
    { type: 'divider' },
    { type: 'alignLeft' },
    { type: 'alignCenter' },
    { type: 'alignRight' },
    { type: 'alignJustify' },
    { type: 'divider' },
    { type: 'fullscreen' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
      {/* Hero Section */}
      <header style={{ 
        padding: '60px 20px', 
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          LuxeEdit
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          color: '#64748b', 
          margin: '0 0 24px 0',
          fontWeight: 300
        }}>
          A beautiful, customizable rich text editor for React
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#94a3b8', 
          margin: '0 0 40px 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Built on Lexical with customizable toolbars, floating toolbar support, and full TypeScript support.
        </p>
        
        {/* Installation CTA */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          <code style={{ 
            padding: '12px 24px', 
            background: '#1e293b', 
            color: '#fff', 
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontFamily: 'monospace'
          }}>
            npm install luxe-edit
          </code>
          <a 
            href="https://www.npmjs.com/package/luxe-edit" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
          >
            View on npm
          </a>
          <a 
            href="https://github.com/amide-init/luxe-edit" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              background: '#fff',
              color: '#1e293b',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'border-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section style={{ 
        padding: '60px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          marginBottom: '48px',
          color: '#1e293b'
        }}>
          Features
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px',
          marginBottom: '60px'
        }}>
          {[
            { icon: '✨', title: 'Rich Text Formatting', desc: 'Bold, italic, underline, strikethrough, and more' },
            { icon: '📝', title: 'Headings', desc: 'Full support for H1-H6 with easy dropdown selection' },
            { icon: '🎨', title: 'Colors', desc: 'Text and background color pickers with custom palettes' },
            { icon: '🔗', title: 'Links', desc: 'Easy link insertion and editing' },
            { icon: '📐', title: 'Alignment', desc: 'Left, center, right, and justify text alignment' },
            { icon: '⌨️', title: 'Keyboard Shortcuts', desc: 'Undo/redo with full history support' },
            { icon: '🎯', title: 'Floating Toolbar', desc: 'Context-aware toolbar appears on text selection' },
            { icon: '⚙️', title: 'Customizable', desc: 'Fully customizable toolbar items and styling' },
            { icon: '📦', title: 'TypeScript', desc: 'Full TypeScript support with exported types' },
          ].map((feature, idx) => (
            <div 
              key={idx}
              style={{ 
                padding: '24px', 
                background: '#fff', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{feature.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1.2rem' }}>
                {feature.title}
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Demo Section */}
      <section style={{ 
        padding: '60px 20px', 
        maxWidth: '1000px', 
        margin: '0 auto'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          marginBottom: '24px',
          color: '#1e293b'
        }}>
          Try It Out
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#64748b', 
          marginBottom: '32px',
          fontSize: '1.1rem'
        }}>
          Select text to see the floating toolbar, or use the top toolbar for formatting options.
        </p>
        
        {/* Demo Controls */}
        <div style={{ 
          marginBottom: '24px', 
          padding: '16px', 
          background: '#f8fafc', 
          borderRadius: '8px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showTopToolbar} 
              onChange={(e) => setShowTopToolbar(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ color: '#475569', fontWeight: 500 }}>Top Toolbar</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showFloatingToolbar} 
              onChange={(e) => setShowFloatingToolbar(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ color: '#475569', fontWeight: 500 }}>Floating Toolbar</span>
          </label>
        </div>
        
        {/* Editor Demo */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          <LuxeEditor 
            initialConfig={{ 
              namespace: 'LuxeDemo',
              theme: {} 
            }}
            showToolbar={showTopToolbar}
            showFloatingToolbar={showFloatingToolbar}
            toolbarItems={toolbarItems}
            onChange={(editorState) => {
              const text = getEditorText(editorState);
              const json = getEditorJSON(editorState);
              const words = text.trim().split(/\s+/).filter(word => word.length > 0);
              
              setEditorContent({
                text,
                json,
                wordCount: words.length,
                charCount: text.length
              });
            }}
          />
        </div>

        {/* Content Preview Section */}
        {editorContent.text && (
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '24px'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: '#1e293b', 
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span>📊</span> Editor Content
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '12px',
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>Words</div>
                <div style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {editorContent.wordCount}
                </div>
              </div>
              <div style={{
                padding: '12px',
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>Characters</div>
                <div style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {editorContent.charCount}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#475569', 
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Plain Text
                </h4>
                <div style={{
                  background: '#fff',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  maxHeight: '200px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                  color: '#1e293b',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {editorContent.text || '(empty)'}
                </div>
              </div>
              <div>
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#475569', 
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  JSON Output
                </h4>
                <div style={{
                  background: '#1e293b',
                  padding: '16px',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: '#fff',
                  fontFamily: 'monospace'
                }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {JSON.stringify(editorContent.json, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quick Start Section */}
      <section style={{ 
        padding: '60px 20px', 
        maxWidth: '900px', 
        margin: '0 auto',
        background: '#f8fafc',
        borderRadius: '16px',
        marginTop: '60px',
        marginBottom: '60px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          marginBottom: '32px',
          color: '#1e293b'
        }}>
          Quick Start
        </h2>
        <div style={{ background: '#1e293b', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
          <pre style={{ margin: 0, color: '#fff', fontSize: '0.9rem', overflow: 'auto' }}>
{`// Install
npm install luxe-edit

// Import
import { LuxeEditor, getEditorText, getEditorJSON } from 'luxe-edit';
import 'luxe-edit/index.css';

// Basic Usage
function App() {
  return (
    <LuxeEditor 
      initialConfig={{ 
        namespace: 'MyEditor',
        theme: {} 
      }} 
    />
  );
}

// With onChange to capture content
function App() {
  const [content, setContent] = React.useState('');

  return (
    <LuxeEditor 
      initialConfig={{ namespace: 'MyEditor' }}
      onChange={(editorState) => {
        // Get plain text
        const text = getEditorText(editorState);
        setContent(text);
        
        // Or get JSON
        const json = getEditorJSON(editorState);
        console.log('Editor JSON:', json);
      }}
    />
  );
}`}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px', 
        textAlign: 'center', 
        color: '#94a3b8',
        borderTop: '1px solid #e2e8f0'
      }}>
        <p style={{ margin: '0 0 12px 0' }}>
          Made with ❤️ by <strong style={{ color: '#64748b' }}>amide-init</strong>
        </p>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          <a 
            href="https://www.npmjs.com/package/luxe-edit" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', textDecoration: 'none' }}
          >
            npm
          </a>
          {' • '}
          <a 
            href="https://github.com/amide-init/luxe-edit" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', textDecoration: 'none' }}
          >
            GitHub
          </a>
          {' • '}
          <span>MIT License</span>
        </p>
      </footer>
    </div>
  );
}

