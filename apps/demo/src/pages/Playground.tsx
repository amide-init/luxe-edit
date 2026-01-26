import React from 'react';
import { LuxeEditor, type ToolbarItem, getEditorText, getEditorJSON, getEditorFormattedText } from 'luxe-edit';

export function Playground() {
  const [showFloatingToolbar, setShowFloatingToolbar] = React.useState(true);
  const [showTopToolbar, setShowTopToolbar] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<'text' | 'json'>('text');
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
  const [editorContent, setEditorContent] = React.useState({
    text: '',
    json: null as any,
    wordCount: 0,
    charCount: 0
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto 32px auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Playground
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#64748b', 
          margin: 0
        }}>
          Try out LuxeEdit and see the output in real-time
        </p>
      </div>

      {/* Controls */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto 24px auto',
        padding: '16px', 
        background: '#fff', 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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

      {/* Two Column Layout */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Section - Editor */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 250px)',
          minHeight: '600px'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.2rem', 
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>✏️</span> Editor
            </h2>
          </div>
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '20px'
          }}>
            <LuxeEditor 
              initialConfig={{ 
                namespace: 'LuxePlayground',
                theme: {} 
              }}
              showToolbar={showTopToolbar}
              showFloatingToolbar={showFloatingToolbar}
              toolbarItems={toolbarItems}
              onChange={(editorState) => {
                const text = getEditorText(editorState);
                const formattedText = getEditorFormattedText(editorState);
                const json = getEditorJSON(editorState);
                const words = text.trim().split(/\s+/).filter(word => word.length > 0);
                
                setEditorContent({
                  text: formattedText, // Use formatted text instead of plain text
                  json,
                  wordCount: words.length,
                  charCount: text.length
                });
              }}
            />
          </div>
        </div>

        {/* Right Section - Output View */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 250px)',
          minHeight: '600px'
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e2e8f0',
            background: '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.2rem', 
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📊</span> Output
            </h2>
            
            {/* Mode Switcher */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: '#fff',
              padding: '4px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <button
                onClick={() => setViewMode('text')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  background: viewMode === 'text' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'text' ? '#fff' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: viewMode === 'text' ? 600 : 400,
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                📝 Parsed
              </button>
              <button
                onClick={() => setViewMode('json')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  background: viewMode === 'json' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'json' ? '#fff' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: viewMode === 'json' ? 600 : 400,
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                🔧 JSON
              </button>
            </div>
          </div>

          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Statistics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div style={{
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Words</div>
                <div style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {editorContent.wordCount}
                </div>
              </div>
              <div style={{
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Characters</div>
                <div style={{ color: '#1e293b', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {editorContent.charCount}
                </div>
              </div>
            </div>

            {/* Content Display */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              {viewMode === 'text' ? (
                <>
                  <h4 style={{ 
                    margin: '0 0 12px 0', 
                    color: '#475569', 
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>📝</span> Parsed Text Output
                  </h4>
                  <div style={{
                    background: '#f8fafc',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    flex: 1,
                    overflow: 'auto',
                    fontSize: '0.95rem',
                    color: '#1e293b',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: '1.6',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {editorContent.text || '(empty - start typing to see output)'}
                  </div>
                </>
              ) : (
                <>
                  <h4 style={{ 
                    margin: '0 0 12px 0', 
                    color: '#475569', 
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🔧</span> JSON Output
                  </h4>
                  <div style={{
                    background: '#1e293b',
                    padding: '20px',
                    borderRadius: '8px',
                    flex: 1,
                    overflow: 'auto',
                    fontSize: '0.85rem',
                    color: '#fff',
                    fontFamily: 'Monaco, Menlo, "Courier New", monospace'
                  }}>
                    <pre style={{ 
                      margin: 0, 
                      whiteSpace: 'pre-wrap', 
                      wordBreak: 'break-word',
                      lineHeight: '1.5'
                    }}>
                      {editorContent.json ? JSON.stringify(editorContent.json, null, 2) : '(empty - start typing to see JSON output)'}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
