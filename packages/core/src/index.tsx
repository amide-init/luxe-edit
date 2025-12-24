import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
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
  text: {
    bold: 'luxe-bold',
    italic: 'luxe-italic',
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
  const config = {
    ...initialConfig,
    theme: defaultTheme,
    onError: (error: Error) => console.error(error),
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