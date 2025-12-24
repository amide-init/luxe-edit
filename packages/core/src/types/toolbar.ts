import React from 'react';

// Toolbar item types
export type ToolbarItemType = 
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
  | 'paragraph';

export interface ToolbarItem {
  type: ToolbarItemType;
  label?: string; // Optional custom label (defaults to type)
  icon?: React.ReactNode; // Optional custom icon
}
