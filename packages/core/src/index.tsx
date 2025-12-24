import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode } from '@lexical/rich-text';
import { ParagraphNode, TextNode } from 'lexical';
import { FloatingToolbarPlugin } from './plugins/FloatingToolbarPlugin';
import { Toolbar } from './plugins/Toolbar';

// Export types and components
export { FloatingToolbarPlugin } from './plugins/FloatingToolbarPlugin';
export { Toolbar } from './plugins/Toolbar';
export type { ToolbarItem } from './types/toolbar';
export type { ToolbarItemType } from './types/toolbar';

// Define a default theme using CSS variables for easy customization
const defaultTheme = {
  paragraph: 'luxe-paragraph',
  heading: {
    h1: 'luxe-heading-h1',
    h2: 'luxe-heading-h2',
    h3: 'luxe-heading-h3',
    h4: 'luxe-heading-h4',
    h5: 'luxe-heading-h5',
    h6: 'luxe-heading-h6',
  },
  text: {
    bold: 'luxe-bold',
    italic: 'luxe-italic',
    underline: 'luxe-underline',
    strikethrough: 'luxe-strikethrough',
  }
};

import type { ToolbarItem } from './types/toolbar';

export interface LuxeEditorProps {
  initialConfig: any;
  showFloatingToolbar?: boolean;
  showToolbar?: boolean;
  toolbarItems?: ToolbarItem[];
  children?: React.ReactNode;
}

export function LuxeEditor({ 
  initialConfig, 
  showFloatingToolbar = true,
  showToolbar = false,
  toolbarItems,
  children 
}: LuxeEditorProps) {
  // Default nodes for rich text editing
  const defaultNodes = [
    HeadingNode,
    ParagraphNode,
    TextNode,
  ];

  const config = {
    namespace: 'LuxeEditor',
    theme: defaultTheme,
    nodes: defaultNodes,
    onError: (error: Error) => console.error(error),
    ...initialConfig,
  };

  // Default toolbar items if none provided
  const defaultToolbarItems: ToolbarItem[] = [
    { type: 'bold' },
    { type: 'italic' },
  ];
  const items = toolbarItems || defaultToolbarItems;

  return (
    <LexicalComposer initialConfig={config}>
      <div className="luxe-editor-container">
        {showToolbar && items && items.length > 0 && (
          <Toolbar items={items} />
        )}
        <RichTextPlugin
          contentEditable={<ContentEditable className="luxe-input" />}
          placeholder={<div className="luxe-placeholder">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {showFloatingToolbar && (
          <FloatingToolbarPlugin 
            enabled={true} 
            items={items}
          />
        )}
        {children}
      </div>
    </LexicalComposer>
  );
}