import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function FloatingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [coords, setCoords] = useState<{ x: number, y: number } | null>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
      const domSelection = window.getSelection();
      const range = domSelection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      if (rect) {
        setCoords({ x: rect.left, y: rect.top - 40 });
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

  if (!coords) return null;

  return createPortal(
    <div 
      className="luxe-floating-toolbar" 
      style={{ position: 'fixed', top: coords.y, left: coords.x }}
    >
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}>B</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>I</button>
    </div>,
    document.body
  );
}