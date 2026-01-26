import { EditorState } from 'lexical';
import { $getRoot } from 'lexical';

/**
 * Get the editor content as JSON
 */
export function getEditorJSON(editorState: EditorState): any {
  return editorState.toJSON();
}

/**
 * Get the editor content as plain text
 */
export function getEditorText(editorState: EditorState): string {
  let text = '';
  editorState.read(() => {
    const root = $getRoot();
    text = root.getTextContent();
  });
  return text;
}
