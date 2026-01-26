import { EditorState } from 'lexical';
import { $getRoot, $isElementNode, $isTextNode } from 'lexical';
import { $isHeadingNode } from '@lexical/rich-text';

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

/**
 * Get the editor content as formatted text (preserves headings and formatting)
 */
export function getEditorFormattedText(editorState: EditorState): string {
  let formattedText = '';
  
  editorState.read(() => {
    const root = $getRoot();
    const children = root.getChildren();
    
    const formatNode = (node: any, depth: number = 0): string => {
      let result = '';
      
      if ($isHeadingNode(node)) {
        const tag = node.getTag(); // h1, h2, h3, etc.
        const level = parseInt(tag.replace('h', ''));
        const hashes = '#'.repeat(level);
        const text = node.getTextContent();
        result += `${hashes} ${text}\n\n`;
      } else if ($isElementNode(node)) {
        const children = node.getChildren();
        let nodeText = '';
        
        for (const child of children) {
          if ($isTextNode(child)) {
            let text = child.getTextContent();
            const format = child.getFormat();
            
            // Apply text formatting markers
            if (format & 1) text = `**${text}**`; // bold
            if (format & 2) text = `*${text}*`; // italic
            if (format & 4) text = `__${text}__`; // underline
            if (format & 8) text = `~~${text}~~`; // strikethrough
            
            nodeText += text;
          } else if ($isElementNode(child)) {
            nodeText += formatNode(child, depth + 1);
          }
        }
        
        const nodeType = node.getType();
        if (nodeType === 'paragraph') {
          result += nodeText + '\n\n';
        } else if (nodeType === 'list') {
          result += nodeText;
        } else {
          result += nodeText;
        }
      } else if ($isTextNode(node)) {
        let text = node.getTextContent();
        const format = node.getFormat();
        
        // Apply text formatting markers
        if (format & 1) text = `**${text}**`; // bold
        if (format & 2) text = `*${text}*`; // italic
        if (format & 4) text = `__${text}__`; // underline
        if (format & 8) text = `~~${text}~~`; // strikethrough
        
        result += text;
      }
      
      return result;
    };
    
    for (const child of children) {
      formattedText += formatNode(child);
    }
  });
  
  return formattedText.trim();
}
