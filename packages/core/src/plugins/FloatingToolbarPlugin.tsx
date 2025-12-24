import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, $createParagraphNode, $isElementNode } from 'lexical';
import { $createHeadingNode, $isHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToolbarItem } from '../types/toolbar';
import { getToolbarLabel } from './Toolbar';

interface FloatingToolbarPluginProps {
  enabled?: boolean;
  items?: ToolbarItem[];
}

// Default floating toolbar items - only essential text formatting
const defaultFloatingToolbarItems: ToolbarItem[] = [
  { type: 'bold' },
  { type: 'italic' },
  { type: 'underline' },
];

// Filter items to only show basic text formatting options suitable for floating toolbar
function filterFloatingToolbarItems(items: ToolbarItem[]): ToolbarItem[] {
  const allowedTypes = ['bold', 'italic', 'underline', 'strikethrough'];
  return items.filter(item => allowedTypes.includes(item.type));
}

export function FloatingToolbarPlugin({ 
  enabled = true, 
  items 
}: FloatingToolbarPluginProps) {
  // Use filtered items if provided, otherwise use defaults
  const floatingItems = items 
    ? filterFloatingToolbarItems(items).slice(0, 4) // Limit to max 4 items
    : defaultFloatingToolbarItems;
  const [editor] = useLexicalComposerContext();
  const [coords, setCoords] = useState<{ x: number, y: number } | null>(null);
  const [editorRootElement, setEditorRootElement] = useState<HTMLElement | null>(null);

  // If disabled, don't render anything
  if (!enabled || !floatingItems || floatingItems.length === 0) return null;

  // Get the editor's root element
  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (rootElement) {
      setEditorRootElement(rootElement);
    }
  }, [editor]);

  const updateToolbar = useCallback(() => {
    if (!editorRootElement) return;

    const domSelection = window.getSelection();
    
    // Check if there's a selection and it's not collapsed
    if (!domSelection || domSelection.rangeCount === 0 || domSelection.isCollapsed) {
      setCoords(null);
      return;
    }

    try {
      const range = domSelection.getRangeAt(0);
      
      // Check if selection is within the editor
      if (!editorRootElement.contains(range.commonAncestorContainer)) {
        setCoords(null);
        return;
      }

      const rect = range.getBoundingClientRect();
      
      // Only show toolbar if selection is valid and visible
      if (rect && rect.width > 0 && rect.height > 0) {
        // Verify Lexical also has a selection
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if (selection && $isRangeSelection(selection) && !selection.isCollapsed()) {
            setCoords({ 
              x: rect.left + rect.width / 2, 
              y: rect.top - 40 
            });
          } else {
            setCoords(null);
          }
        });
      } else {
        setCoords(null);
      }
    } catch (e) {
      // Selection might be invalid, hide toolbar
      setCoords(null);
    }
  }, [editor, editorRootElement]);

  useEffect(() => {
    if (!editorRootElement) return;

    // Listen to editor updates
    const removeUpdateListener = editor.registerUpdateListener(() => {
      // Small delay to ensure DOM is updated
      setTimeout(() => updateToolbar(), 10);
    });

    return () => {
      removeUpdateListener();
    };
  }, [editor, editorRootElement, updateToolbar]);

  useEffect(() => {
    // Listen to mouse events for selection changes
    const handleMouseUp = () => {
      setTimeout(() => updateToolbar(), 50);
    };

    const handleKeyUp = () => {
      setTimeout(() => updateToolbar(), 50);
    };

    const handleSelectionChange = () => {
      setTimeout(() => updateToolbar(), 50);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [updateToolbar]);

  const handleToolbarAction = useCallback((item: ToolbarItem) => {
    const { type } = item;

    // Handle text formatting commands (bold, italic, underline, strikethrough)
    if (type === 'bold' || type === 'italic' || type === 'underline' || type === 'strikethrough') {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
      return;
    }

    // Handle heading formatting
    if (type.startsWith('heading')) {
      const levelNum = parseInt(type.replace('heading', ''));
      const level = `h${levelNum}` as HeadingTagType;
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          let element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
          const elementKey = element.getKey();
          const elementNode = editor.getElementByKey(elementKey);
          
          if (elementNode !== null && $isElementNode(element)) {
            const headingNode = $createHeadingNode(level);
            const children = element.getChildren();
            headingNode.append(...children);
            element.replace(headingNode);
            headingNode.selectEnd();
          }
        }
      });
      return;
    }

    // Handle paragraph formatting
    if (type === 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          let element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
          const elementKey = element.getKey();
          const elementNode = editor.getElementByKey(elementKey);
          
          if (elementNode !== null && $isHeadingNode(element) && $isElementNode(element)) {
            const paragraphNode = $createParagraphNode();
            const children = element.getChildren();
            paragraphNode.append(...children);
            element.replace(paragraphNode);
            paragraphNode.selectEnd();
          }
        }
      });
      return;
    }
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
      {floatingItems.map((item, index) => {
        const label = item.label || getToolbarLabel(item.type);
        const isHeading = item.type.startsWith('heading');
        const headingLevel = isHeading ? parseInt(item.type.replace('heading', '')) : null;

        return (
          <button
            key={`${item.type}-${index}`}
            onClick={() => handleToolbarAction(item)}
            title={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            style={{
              padding: '6px 12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: '4px',
              fontWeight: item.type === 'bold' ? 'bold' : 'normal',
              fontStyle: item.type === 'italic' ? 'italic' : 'normal',
              textDecoration: item.type === 'underline' ? 'underline' : item.type === 'strikethrough' ? 'line-through' : 'none',
              fontSize: headingLevel ? `${18 - headingLevel * 2}px` : '14px',
              minWidth: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {item.icon || label}
          </button>
        );
      })}
    </div>,
    document.body
  );
}