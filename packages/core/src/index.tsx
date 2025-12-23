import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

// Export the FloatingToolbarPlugin
export { FloatingToolbarPlugin } from './plugins/FloatingToolbarPlugin';

// Define a default theme using CSS variables for easy customization
const defaultTheme = {
  paragraph: 'luxe-paragraph',
  text: {
    bold: 'luxe-bold',
    italic: 'luxe-italic',
  }
};

export function LuxeEditor({ 
  initialConfig, 
  children 
}: { 
  initialConfig: any;
  children?: React.ReactNode;
}) {
  const config = {
    ...initialConfig,
    theme: defaultTheme,
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div className="luxe-editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="luxe-input" />}
          placeholder={<div className="luxe-placeholder">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {children}
      </div>
    </LexicalComposer>
  );
}