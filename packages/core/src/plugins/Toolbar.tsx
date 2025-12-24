import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { ToolbarItem, ToolbarItemType } from '../types/toolbar';

// Get label for toolbar item
export function getToolbarLabel(type: ToolbarItemType): string {
  const labels: Record<ToolbarItemType, string> = {
    undo: '↶',
    redo: '↷',
    divider: '',
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
    alignLeft: '⬅',
    alignCenter: '⬌',
    alignRight: '➡',
    alignJustify: '⬌',
  };
  return labels[type] || type;
}

function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '24px',
        background: '#e5e7eb',
        margin: '0 4px',
      }}
    />
  );
}

interface ToolbarButtonProps {
  item: ToolbarItem;
  active?: boolean;
  disabled?: boolean;
  onAction: (item: ToolbarItem) => void;
}

function ToolbarButton({ item, active = false, disabled = false, onAction }: ToolbarButtonProps) {
  const isHeading = item.type.startsWith('heading');
  const headingLevel = isHeading ? parseInt(item.type.replace('heading', '')) : null;
  const label = item.label || getToolbarLabel(item.type);

  if (item.type === 'divider') {
    return <Divider />;
  }

  return (
    <button
      onClick={() => onAction(item)}
      disabled={disabled}
      title={item.type.charAt(0).toUpperCase() + item.type.slice(1).replace(/([A-Z])/g, ' $1').trim()}
      style={{
        padding: '6px 12px',
        border: 'none',
        background: active ? '#e5e7eb' : 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: '4px',
        fontWeight: item.type === 'bold' ? 'bold' : 'normal',
        fontStyle: item.type === 'italic' ? 'italic' : 'normal',
        textDecoration: item.type === 'underline' ? 'underline' : item.type === 'strikethrough' ? 'line-through' : 'none',
        fontSize: headingLevel ? `${18 - headingLevel * 2}px` : '14px',
        minWidth: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !active) {
          e.currentTarget.style.background = '#f3f4f6';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
        } else {
          e.currentTarget.style.background = '#e5e7eb';
        }
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
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format states
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  const handleToolbarAction = useCallback((item: ToolbarItem) => {
    const { type } = item;

    // Handle undo/redo
    if (type === 'undo') {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
      return;
    }
    if (type === 'redo') {
      editor.dispatchCommand(REDO_COMMAND, undefined);
      return;
    }

    // Handle text formatting commands (bold, italic, underline, strikethrough)
    if (type === 'bold' || type === 'italic' || type === 'underline' || type === 'strikethrough') {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
      return;
    }

    // Handle alignment commands
    if (type === 'alignLeft') {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
      return;
    }
    if (type === 'alignCenter') {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
      return;
    }
    if (type === 'alignRight') {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
      return;
    }
    if (type === 'alignJustify') {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
      return;
    }

    // Note: Heading and paragraph formatting require additional Lexical nodes
    if (type.startsWith('heading') || type === 'paragraph') {
      console.warn(`${type} formatting requires additional Lexical nodes. Please ensure your editor config includes the necessary nodes.`);
    }
  }, [editor]);

  const getButtonState = (type: ToolbarItemType) => {
    switch (type) {
      case 'undo':
        return { disabled: !canUndo };
      case 'redo':
        return { disabled: !canRedo };
      case 'bold':
        return { active: isBold };
      case 'italic':
        return { active: isItalic };
      case 'underline':
        return { active: isUnderline };
      case 'strikethrough':
        return { active: isStrikethrough };
      default:
        return {};
    }
  };

  return (
    <div 
      className="luxe-toolbar" 
      style={{ 
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        borderRadius: '8px 8px 0 0',
        padding: '8px',
        flexWrap: 'wrap'
      }}
    >
      {items.map((item, index) => {
        const state = getButtonState(item.type);
        return (
          <ToolbarButton
            key={`${item.type}-${index}`}
            item={item}
            active={state.active}
            disabled={state.disabled}
            onAction={handleToolbarAction}
          />
        );
      })}
    </div>
  );
}
