import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function FloatingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [coords, setCoords] = useState<{ x: number, y: number } | null>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const range = domSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect) {
          setCoords({ x: rect.left + rect.width / 2, y: rect.top - 40 });
        }
      }
    } else {
      setCoords(null);
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => updateToolbar());
    });
  }, [editor, updateToolbar]);

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => updateToolbar(), 0);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [updateToolbar]);

  const formatText = useCallback((format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  }, [editor]);

  if (!coords) return null;

  return createPortal(
    <div 
      className="luxe-floating-toolbar" 
      style={{ 
        position: 'fixed', 
        top: `${coords.y}px`, 
        left: `${coords.x}px`,
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '4px',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '4px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}
    >
      <button 
        onClick={() => formatText('bold')}
        style={{
          padding: '6px 12px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        B
      </button>
      <button 
        onClick={() => formatText('italic')}
        style={{
          padding: '6px 12px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          borderRadius: '4px',
          fontStyle: 'italic'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        I
      </button>
    </div>,
    document.body
  );
}