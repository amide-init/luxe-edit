# luxe-edit

A beautiful, customizable rich text editor for React built on Lexical with customizable toolbars and floating toolbar support.

🌐 **Live Demo**: [https://amide-init.github.io/luxe-edit/](https://amide-init.github.io/luxe-edit/)

🌐 **[View Live Demo →](https://amide-init.github.io/luxe-edit/)**

## Installation

```bash
npm install luxe-edit
# or
yarn add luxe-edit
# or
pnpm add luxe-edit
```

## Quick Start

```tsx
import { LuxeEditor } from 'luxe-edit';
import 'luxe-edit/index.css';

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
