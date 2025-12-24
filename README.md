# LuxeEdit - Rich Text Editor Monorepo

A modern, feature-rich React-based rich text editor powered by Lexical with customizable toolbars and floating toolbar support.

## 📁 Project Structure

```
luxe-edit/
├── packages/
│   └── core/                 # The main package to be published
│       ├── src/
│       │   ├── index.tsx     # Main entry point, exports LuxeEditor
│       │   ├── styles.css    # CSS styles for the editor
│       │   ├── types/
│       │   │   └── toolbar.ts  # Toolbar item types
│       │   └── plugins/
│       │       ├── Toolbar.tsx           # Top toolbar component
│       │       └── FloatingToolbarPlugin.tsx  # Floating toolbar plugin
│       ├── dist/             # Built output (generated)
│       ├── package.json      # Package configuration
│       ├── tsconfig.json     # TypeScript config
│       └── tsup.config.ts    # Build configuration
│
├── apps/
│   └── demo/                 # Demo/example app
│       ├── src/
│       │   └── main.tsx      # Demo app entry point
│       ├── index.html        # HTML template
│       ├── vite.config.ts    # Vite configuration
│       └── package.json      # Demo app dependencies
│
├── package.json              # Root monorepo config
└── yarn.lock                 # Dependency lock file
```

## ✨ Features

### **Rich Text Formatting**
- ✅ **Text Formatting**: Bold, Italic, Underline, Strikethrough
- ✅ **Headings**: H1, H2, H3, H4, H5, H6
- ✅ **Alignment**: Left, Center, Right, Justify
- ✅ **History**: Undo/Redo with proper state tracking

### **Toolbars**
- ✅ **Top Toolbar**: Fixed toolbar at the top of the editor
- ✅ **Floating Toolbar**: Appears above selected text (3-4 essential options)
- ✅ **Customizable**: Array-based configuration for toolbar items
- ✅ **Active States**: Visual feedback for active formatting

### **Developer Experience**
- ✅ **TypeScript**: Full TypeScript support with exported types
- ✅ **Customizable**: Custom toolbar items, labels, and icons
- ✅ **Theme Support**: CSS variable-based theming
- ✅ **Monorepo**: Clean workspace structure

## 🚀 Quick Start

### Installation (After Publishing)

```bash
# Using npm
npm install @luxe-edit/core

# Using yarn
yarn add @luxe-edit/core

# Using pnpm
pnpm add @luxe-edit/core
```

### Basic Usage

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

### With Custom Toolbar

```tsx
import { LuxeEditor, type ToolbarItem } from '@luxe-edit/core';
import '@luxe-edit/core/index.css';

function App() {
  const toolbarItems: ToolbarItem[] = [
    { type: 'undo' },
    { type: 'redo' },
    { type: 'divider' },
    { type: 'bold' },
    { type: 'italic' },
    { type: 'underline' },
    { type: 'strikethrough' },
    { type: 'divider' },
    { type: 'heading1' },
    { type: 'heading2' },
    { type: 'heading3' },
    { type: 'divider' },
    { type: 'alignLeft' },
    { type: 'alignCenter' },
    { type: 'alignRight' },
    { type: 'alignJustify' },
  ];

  return (
    <LuxeEditor 
      initialConfig={{ namespace: 'MyEditor', theme: {} }}
      showToolbar={true}
      showFloatingToolbar={true}
      toolbarItems={toolbarItems}
    />
  );
}
```

## 📚 API Reference

### `LuxeEditor` Component

#### Props

```typescript
interface LuxeEditorProps {
  initialConfig: any;                    // Lexical editor initial config
  showFloatingToolbar?: boolean;         // Show floating toolbar (default: true)
  showToolbar?: boolean;                 // Show top toolbar (default: false)
  toolbarItems?: ToolbarItem[];          // Toolbar items for top toolbar
  floatingToolbarItems?: ToolbarItem[];  // Separate items for floating toolbar (optional)
  children?: React.ReactNode;            // Custom plugins/components
}
```

### `ToolbarItem` Type

```typescript
interface ToolbarItem {
  type: ToolbarItemType;
  label?: string;        // Optional custom label
  icon?: React.ReactNode; // Optional custom icon
}

type ToolbarItemType = 
  | 'undo'
  | 'redo'
  | 'divider'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6'
  | 'paragraph'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify';
```

### Available Toolbar Types

#### Text Formatting
- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underlined text
- `strikethrough` - Strikethrough text

#### Headings
- `heading1` through `heading6` - Heading levels

#### Actions
- `undo` - Undo last action
- `redo` - Redo last action
- `paragraph` - Convert to paragraph

#### Alignment
- `alignLeft` - Left align text
- `alignCenter` - Center align text
- `alignRight` - Right align text
- `alignJustify` - Justify text

#### Utility
- `divider` - Visual separator between toolbar sections

## 🎨 Customization

### Custom Toolbar Items

```tsx
const toolbarItems: ToolbarItem[] = [
  { type: 'bold', label: 'Bold Text' },
  { type: 'italic', icon: <em>I</em> },
  { type: 'divider' },
  { type: 'heading1' },
];
```

### Custom Theme

```tsx
<LuxeEditor 
  initialConfig={{ 
    namespace: 'MyEditor',
    theme: {
      text: {
        bold: 'my-bold-class',
        italic: 'my-italic-class',
      }
    }
  }} 
/>
```

### Separate Floating Toolbar

The floating toolbar automatically filters to show only essential text formatting options (bold, italic, underline). You can customize it:

```tsx
<LuxeEditor 
  toolbarItems={fullToolbarItems}        // All options for top toolbar
  floatingToolbarItems={[                // Limited options for floating toolbar
    { type: 'bold' },
    { type: 'italic' },
    { type: 'underline' }
  ]}
  showToolbar={true}
  showFloatingToolbar={true}
/>
```

## 🛠️ Development Workflow

### **From Root Directory**

```bash
# Install all dependencies
yarn install

# Build the core package
yarn build

# Run the demo app
yarn dev

# Or use workspace commands
yarn workspace @luxe-edit/core build
yarn workspace demo dev
```

### **Make Changes**

1. Edit source files in `packages/core/src/`
2. Rebuild: `yarn build` (in `packages/core`)
3. Demo app will hot-reload automatically

## 🏗️ Architecture Overview

### **Monorepo Setup (Yarn Workspaces)**

- **Root `package.json`**: Defines workspaces (`packages/*`, `apps/*`)
- **Local linking**: The `demo` app automatically uses the local `@luxe-edit/core` package
- **Shared dependencies**: Common dependencies are hoisted to the root `node_modules`

### **Core Package (`@luxe-edit/core`)**

**Build Process:**
1. **Source**: `src/index.tsx` (TypeScript + React/JSX)
2. **Builder**: `tsup` (fast build tool powered by esbuild)
3. **Output**: `dist/` folder containing:
   - `index.mjs` - ESM format (modern)
   - `index.js` - CommonJS format (Node.js)
   - `index.d.ts` - TypeScript declarations
   - `index.css` - CSS styles

**Package Configuration:**
```json
{
  "name": "@luxe-edit/core",
  "main": "./dist/index.js",        // CommonJS entry
  "module": "./dist/index.mjs",     // ESM entry
  "types": "./dist/index.d.ts",     // TypeScript types
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./index.css": "./dist/index.css"
  },
  "files": ["dist"]  // Only publish dist folder
}
```

## 📦 Publishing to NPM

### **Before Publishing:**

1. **Ensure package is built:**
   ```bash
   cd packages/core
   yarn build
   ```

2. **Update version in `packages/core/package.json`**:
   ```json
   {
     "version": "1.0.1"  // Bump version
   }
   ```

3. **Verify `dist/` contains:**
   - `index.js`, `index.mjs`, `index.d.ts`, `index.css`

### **Publishing Steps:**

```bash
cd packages/core

# Login to npm (first time only)
npm login

# Publish
npm publish --access public  # --access public needed for scoped packages

# Or use version bumping
npm version patch  # 1.0.0 -> 1.0.1
npm publish --access public
```

### **What Gets Published:**

Only files in the `"files"` array (`dist/`) are published:
- ✅ `dist/index.js`
- ✅ `dist/index.mjs`
- ✅ `dist/index.d.ts`
- ✅ `dist/index.css`
- ❌ `src/`, `tsconfig.json`, `tsup.config.ts` (not included)

## 🎯 Features in Detail

### **Toolbar System**

#### Top Toolbar
- Always visible at the top of the editor
- Shows active formatting states
- Supports all toolbar item types
- Fully customizable via `toolbarItems` prop

#### Floating Toolbar
- Appears above selected text
- Automatically filters to show only essential options (3-4 items)
- Only shows: bold, italic, underline, strikethrough
- Can be customized via `floatingToolbarItems` prop

### **Active State Tracking**

The toolbar tracks and displays active formatting:
- **Bold/Italic/Underline/Strikethrough**: Highlights when active
- **Headings**: Shows which heading level is active
- **Undo/Redo**: Disabled when not available

### **Heading Support**

Full support for headings H1-H6:
- Proper Lexical HeadingNode integration
- Active state tracking
- Seamless conversion between headings and paragraphs
- Styled headings via CSS

## 📋 Usage Examples

### Minimal Setup (Default)

```tsx
<LuxeEditor initialConfig={{ namespace: 'MyEditor' }} />
// Shows floating toolbar with bold, italic, underline
```

### Full Featured Toolbar

```tsx
const toolbarItems: ToolbarItem[] = [
  { type: 'undo' },
  { type: 'redo' },
  { type: 'divider' },
  { type: 'bold' },
  { type: 'italic' },
  { type: 'underline' },
  { type: 'strikethrough' },
  { type: 'divider' },
  { type: 'heading1' },
  { type: 'heading2' },
  { type: 'heading3' },
  { type: 'divider' },
  { type: 'alignLeft' },
  { type: 'alignCenter' },
  { type: 'alignRight' },
  { type: 'alignJustify' },
];

<LuxeEditor 
  initialConfig={{ namespace: 'MyEditor' }}
  showToolbar={true}
  toolbarItems={toolbarItems}
/>
```

### Custom Floating Toolbar Only

```tsx
<LuxeEditor 
  initialConfig={{ namespace: 'MyEditor' }}
  showToolbar={false}
  showFloatingToolbar={true}
  floatingToolbarItems={[
    { type: 'bold' },
    { type: 'italic' },
    { type: 'underline' }
  ]}
/>
```

### Advanced: Custom Plugins

```tsx
<LuxeEditor 
  initialConfig={{ namespace: 'MyEditor' }}
  showToolbar={true}
>
  {/* Add custom Lexical plugins */}
  <MyCustomPlugin />
</LuxeEditor>
```

## 🔍 Testing Package Locally Before Publishing

```bash
cd packages/core

# Create a tarball (without publishing)
npm pack

# This creates: luxe-edit-core-1.0.0.tgz

# In another project, test it:
npm install /path/to/luxe-edit-core-1.0.0.tgz
```

## 📋 Pre-Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Add description, keywords, repository URL to `package.json`
- [ ] Write comprehensive README (this file)
- [ ] Fix all TypeScript `any` types
- [ ] Add `prepublishOnly` script
- [ ] Test installation: `npm pack`
- [ ] Test the tarball locally
- [ ] Update changelog
- [ ] Tag git release
- [ ] Run `npm publish --access public`

## ✅ Current Features

1. ✅ **Monorepo structure** - Clean separation of package and demo
2. ✅ **Modern build setup** - Uses tsup (fast, based on esbuild)
3. ✅ **Dual format output** - ESM + CommonJS for maximum compatibility
4. ✅ **TypeScript support** - Full TypeScript with exported types
5. ✅ **CSS included** - Styles are part of the package
6. ✅ **React externalized** - React is not bundled (prevents duplicates)
7. ✅ **Proper exports** - Modern `exports` field with types first
8. ✅ **Customizable toolbars** - Array-based configuration
9. ✅ **Floating toolbar** - Context-aware toolbar for selected text
10. ✅ **Active state tracking** - Visual feedback for formatting
11. ✅ **Heading support** - Full H1-H6 support
12. ✅ **Text formatting** - Bold, Italic, Underline, Strikethrough
13. ✅ **Alignment** - Left, Center, Right, Justify
14. ✅ **History** - Undo/Redo with proper state management

## 🎯 Recommended Improvements

### **1. Add Package Metadata**

```json
{
  "description": "A beautiful, customizable rich text editor for React built on Lexical",
  "keywords": ["react", "editor", "lexical", "rich-text", "wysiwyg", "toolbar"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/luxe-edit.git"
  },
  "homepage": "https://github.com/yourusername/luxe-edit#readme"
}
```

### **2. Add Pre-publish Script**

```json
{
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "yarn build"
  }
}
```

### **3. Improve TypeScript Types**

Replace `any` types with proper Lexical types:

```tsx
import { InitialConfigType } from '@lexical/react/LexicalComposer';

export interface LuxeEditorProps {
  initialConfig: Partial<InitialConfigType>;
  // ...
}
```

### **4. Add Peer Dependencies**

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

## 📚 Resources

- [Yarn Workspaces Docs](https://yarnpkg.com/features/workspaces)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [tsup Documentation](https://tsup.egoist.dev/)
- [Lexical Documentation](https://lexical.dev/)

## 🎉 Summary

**LuxeEdit** is a production-ready rich text editor package with:
- ✅ Complete toolbar system (top + floating)
- ✅ Full formatting support (text, headings, alignment)
- ✅ Active state tracking
- ✅ Customizable toolbar items
- ✅ TypeScript support
- ✅ Modern build setup
- ✅ Ready for npm publishing

The architecture follows modern best practices for React component libraries! 🚀
