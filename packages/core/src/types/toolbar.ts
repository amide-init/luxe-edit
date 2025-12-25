import React from 'react';

// Toolbar item types
export type ToolbarItemType = 
  | 'undo'
  | 'redo'
  | 'divider'
  | 'bold' 
  | 'italic' 
  | 'underline' 
  | 'strikethrough'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'paragraph'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'textColor'
  | 'backgroundColor'
  | 'fullscreen'
  | 'headingDropdown'
  | 'link';

export interface ToolbarItem {
  type: ToolbarItemType;
  label?: string; // Optional custom label (defaults to type)
  icon?: React.ReactNode; // Optional custom icon
  color?: string; // For textColor/backgroundColor: hex color value (e.g., '#ff0000')
  colors?: string[]; // Optional: predefined color palette for color picker
}
