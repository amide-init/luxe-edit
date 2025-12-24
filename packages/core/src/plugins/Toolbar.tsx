import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useCallback } from 'react';
import { ToolbarItem, ToolbarItemType } from '../types/toolbar';

// Get label for toolbar item
export function getToolbarLabel(type: ToolbarItemType): string {
  const labels: Record<ToolbarItemType, string> = {
    bold: 'B',
    italic: 'I',
    underline: 'U',
    strikethrough: 'S',
    heading1: 'H1',
    heading2: 'H2',
    heading3: 'H3',
    heading4: 'H4',
    heading5: 'H5',
    heading6: 'H6',
    paragraph: 'P',
  };
  return labels[type] || type;
}

interface ToolbarButtonProps {
  item: ToolbarItem;
  onAction: (item: ToolbarItem) => void;
}

function ToolbarButton({ item, onAction }: ToolbarButtonProps) {
  const isHeading = item.type.startsWith('heading');
  const headingLevel = isHeading ? parseInt(item.type.replace('heading', '')) : null;
  const label = item.label || getToolbarLabel(item.type);

  return (
    <button
      onClick={() => onAction(item)}
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
}

interface ToolbarProps {
  items: ToolbarItem[];
}

export function Toolbar({ items }: ToolbarProps) {
  const [editor] = useLexicalComposerContext();

  const handleToolbarAction = useCallback((item: ToolbarItem) => {
    const { type } = item;

    // Handle text formatting commands (bold, italic, underline, strikethrough)
    if (type === 'bold' || type === 'italic' || type === 'underline' || type === 'strikethrough') {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
      return;
    }

    // Note: Heading and paragraph formatting require additional Lexical nodes
    if (type.startsWith('heading') || type === 'paragraph') {
      console.warn(`${type} formatting requires additional Lexical nodes. Please ensure your editor config includes the necessary nodes.`);
    }
  }, [editor]);

  return (
    <div 
      className="luxe-toolbar" 
      style={{ 
        display: 'flex',
        gap: '4px',
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        borderRadius: '8px 8px 0 0',
        padding: '8px',
        flexWrap: 'wrap'
      }}
    >
      {items.map((item, index) => (
        <ToolbarButton
          key={`${item.type}-${index}`}
          item={item}
          onAction={handleToolbarAction}
        />
      ))}
    </div>
  );
}
