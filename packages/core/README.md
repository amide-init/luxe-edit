# @luxe-edit/core

A beautiful, customizable rich text editor for React built on Lexical with customizable toolbars and floating toolbar support.

## Installation

```bash
npm install @luxe-edit/core
# or
yarn add @luxe-edit/core
# or
pnpm add @luxe-edit/core
```

## Quick Start

```tsx
import { LuxeEditor } from '@luxe-edit/core';
import '@luxe-edit/core/index.css';

function App() {
  return (
    <LuxeEditor 
      initialConfig={{ 
        namespace: 'MyEditor',
        theme: {} 
      }} 
    />
  );
}
```

## Features

- ✅ Rich text formatting (Bold, Italic, Underline, Strikethrough)
- ✅ Headings (H1-H6)
- ✅ Text and background colors
- ✅ Alignment options
- ✅ Undo/Redo
- ✅ Customizable toolbars
- ✅ Floating toolbar
- ✅ TypeScript support

## Documentation

For complete documentation, examples, and API reference, please visit the [main repository README](../../README.md).

## License

MIT
