import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import type { InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { LinkNode, AutoLinkNode } from '@lexical/link';
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
  initialConfig: Partial<InitialConfigType>;
  showFloatingToolbar?: boolean;
  showToolbar?: boolean;
  toolbarItems?: ToolbarItem[];
  floatingToolbarItems?: ToolbarItem[]; // Separate items for floating toolbar (optional)
  children?: React.ReactNode;
}

export function LuxeEditor({ 
  initialConfig, 
  showFloatingToolbar = true,
  showToolbar = true,
  toolbarItems,
  floatingToolbarItems,
  children 
}: LuxeEditorProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  // Default nodes for rich text editing
  const defaultNodes = [
    HeadingNode,
    ParagraphNode,
    TextNode,
    LinkNode,
    AutoLinkNode,
  ];

  // Merge theme with user's theme if provided
  const mergedTheme = initialConfig.theme 
    ? { ...defaultTheme, ...initialConfig.theme }
    : defaultTheme;

  // Extract theme from initialConfig to avoid override
  const { theme: _, ...restInitialConfig } = initialConfig;

  const config = {
    namespace: 'LuxeEditor',
    theme: mergedTheme,
    nodes: defaultNodes,
    onError: (error: Error) => console.error(error),
    ...restInitialConfig,
  };

  // Default toolbar items if none provided
  const defaultToolbarItems: ToolbarItem[] = [
    { type: 'undo' },
    { type: 'redo' },
    { type: 'divider' },
    { type: 'bold' },
    { type: 'italic' },
    { type: 'underline' },
    { type: 'strikethrough' },
    { type: 'divider' },
    { type: 'headingDropdown' },
    { type: 'divider' },
    { type: 'link' },
  ];
  const items = toolbarItems || defaultToolbarItems;

  const toggleFullscreen = React.useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  return (
    <LexicalComposer initialConfig={config}>
      <div className={`luxe-editor-container ${isFullscreen ? 'luxe-editor-fullscreen' : ''}`}>
        {showToolbar && items && items.length > 0 && (
          <Toolbar items={items} onFullscreenToggle={toggleFullscreen} isFullscreen={isFullscreen} />
        )}
        <RichTextPlugin
          contentEditable={<ContentEditable className="luxe-input" />}
          placeholder={<div className="luxe-placeholder">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <LinkPlugin />
        {showFloatingToolbar && (
          <FloatingToolbarPlugin 
            enabled={true} 
            items={floatingToolbarItems || items}
          />
        )}
        {children}
      </div>
    </LexicalComposer>
  );
}