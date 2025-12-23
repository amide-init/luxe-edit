# LuxeEdit - Rich Text Editor Monorepo

A modern monorepo setup for building and publishing `@luxe-edit/core`, a React-based rich text editor powered by Lexical.

## 📁 Project Structure

```
luxe-edit/
├── packages/
│   └── core/                 # The main package to be published
│       ├── src/
│       │   ├── index.tsx     # Main entry point, exports LuxeEditor
│       │   ├── styles.css    # CSS styles for the editor
│       │   └── plugins/
│       │       └── FloatingToolbarPlugin.tsx  # Example plugin
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

## 🏗️ Architecture Overview

### **Monorepo Setup (Yarn Workspaces)**

This project uses **Yarn Workspaces** to manage multiple packages in a single repository:

- **Root `package.json`**: Defines workspaces (`packages/*`, `apps/*`)
- **Local linking**: The `demo` app automatically uses the local `@luxe-edit/core` package
- **Shared dependencies**: Common dependencies are hoisted to the root `node_modules`

### **Core Package (`@luxe-edit/core`)**

**What it is:**
- A React component library that wraps Lexical editor
- Exports `LuxeEditor` component
- Includes CSS styles
- Built as both ESM and CommonJS formats

**Build Process:**
1. **Source**: `src/index.tsx` (TypeScript + React/JSX)
2. **Builder**: `tsup` (fast build tool powered by esbuild)
3. **Output**: `dist/` folder containing:
   - `index.mjs` - ESM format (modern)
   - `index.js` - CommonJS format (Node.js)
   - `index.d.ts` - TypeScript declarations
   - `index.css` - CSS styles

**Package Configuration (`package.json`):**
```json
{
  "name": "@luxe-edit/core",
  "main": "./dist/index.js",        // CommonJS entry
  "module": "./dist/index.mjs",     // ESM entry
  "types": "./dist/index.d.ts",     // TypeScript types
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",  // For: import { ... } from '@luxe-edit/core'
      "require": "./dist/index.js"   // For: require('@luxe-edit/core')
    },
    "./index.css": "./dist/index.css"  // CSS import path
  },
  "files": ["dist"]  // Only publish dist folder to npm
}
```

### **Demo App**

A Vite-based React app that:
- Imports and uses `@luxe-edit/core` locally (via workspace)
- Tests the package during development
- Shows real-world usage examples

## 🚀 How It Works for Publishing

### **Yarn vs NPM Compatibility**

✅ **Works with both Yarn and NPM** because:
1. Standard `package.json` fields (`main`, `module`, `types`)
2. Modern `exports` field (Node.js standard)
3. No Yarn-specific features in package config

### **Installation (After Publishing to NPM)**

Users can install via either:

```bash
# Using npm
npm install @luxe-edit/core

# Using yarn
yarn add @luxe-edit/core

# Using pnpm
pnpm add @luxe-edit/core
```

### **Usage (After Publishing)**

```tsx
import { LuxeEditor } from '@luxe-edit/core';
import '@luxe-edit/core/index.css';  // Import styles

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

## 🛠️ Development Workflow

### **1. Build the Core Package**
```bash
cd packages/core
yarn build
```
This creates the `dist/` folder with compiled code.

### **2. Run the Demo App**
```bash
cd apps/demo
yarn dev
```
Visit `http://localhost:5173` to see the editor in action.

### **3. Make Changes**
- Edit `packages/core/src/index.tsx`
- Rebuild: `yarn build` (in `packages/core`)
- Demo app will hot-reload automatically

### **From Root (Workspace Commands)**
```bash
# Build core package
yarn workspace @luxe-edit/core build

# Run demo
yarn workspace demo dev

# Install all dependencies
yarn install
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

# Publish (make sure you're in packages/core directory)
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

## ✅ Current Strengths

1. ✅ **Monorepo structure** - Clean separation of package and demo
2. ✅ **Modern build setup** - Uses tsup (fast, based on esbuild)
3. ✅ **Dual format output** - ESM + CommonJS for maximum compatibility
4. ✅ **TypeScript support** - Includes `.d.ts` files
5. ✅ **CSS included** - Styles are part of the package
6. ✅ **React externalized** - React is not bundled (prevents duplicates)
7. ✅ **Proper exports** - Modern `exports` field with types first

## 🎯 Recommendations & Improvements

### **1. Add Missing Metadata (IMPORTANT)**

```json
// packages/core/package.json
{
  "name": "@luxe-edit/core",
  "version": "1.0.0",
  "description": "A beautiful rich text editor for React built on Lexical",  // ⭐ ADD
  "keywords": ["react", "editor", "lexical", "rich-text", "wysiwyg"],      // ⭐ ADD
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/luxe-edit.git"                  // ⭐ ADD
  },
  "author": "amin uddin",                                                    // ✅ Already have
  "license": "MIT",                                                          // ✅ Already have
  "homepage": "https://github.com/yourusername/luxe-edit#readme"            // ⭐ ADD
}
```

### **2. Add README to Core Package**

Create `packages/core/README.md` with:
- Installation instructions
- Usage examples
- API documentation
- Props/types documentation

### **3. Fix TypeScript Types**

```tsx
// packages/core/src/index.tsx
// Instead of `any`, use proper types:

import { InitialConfigType } from '@lexical/react/LexicalComposer';

export function LuxeEditor({ 
  initialConfig 
}: { 
  initialConfig: Partial<InitialConfigType> 
}) {
  // ...
}
```

### **4. Add Pre-publish Script**

```json
// packages/core/package.json
{
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "yarn build"  // ⭐ Auto-build before publish
  }
}
```

### **5. Add .npmignore (or rely on `files` field)**

```npmignore
# .npmignore (optional, since you use "files" field)
src/
tsconfig.json
tsup.config.ts
node_modules/
*.ts
*.tsx
!*.d.ts
```

### **6. Add Repository Scripts**

```json
// Root package.json
{
  "scripts": {
    "build": "yarn workspace @luxe-edit/core build",
    "dev": "yarn workspace demo dev",
    "build:demo": "yarn workspace demo build"
  }
}
```

### **7. Add Version Management**

Consider using:
- **Changesets** - For version management and changelog
- **Lerna** - Alternative monorepo tool (if you need more features)

### **8. Add CI/CD**

GitHub Actions example:
```yaml
# .github/workflows/publish.yml
name: Publish
on:
  push:
    branches: [main]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: yarn install
      - run: yarn workspace @luxe-edit/core build
      - run: npm publish --access public
        working-directory: packages/core
```

### **9. Fix FloatingToolbarPlugin Bug**

The plugin references `FORMAT_TEXT_COMMAND` which isn't imported:

```tsx
// packages/core/src/plugins/FloatingToolbarPlugin.tsx
import { FORMAT_TEXT_COMMAND } from 'lexical';  // ⭐ ADD THIS
```

### **10. Add More Exports**

Consider exporting plugins separately:

```json
// package.json exports
{
  "exports": {
    ".": { ... },
    "./index.css": "./dist/index.css",
    "./plugins": "./dist/plugins/index.js"  // ⭐ For advanced users
  }
}
```

### **11. Add Peer Dependencies**

Make React a peer dependency (already external, but declare it):

```json
// packages/core/package.json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

### **12. Add Testing**

```bash
# Add to packages/core
yarn add -D vitest @testing-library/react
```

### **13. Add Linting/Formatting**

```bash
# Add to root
yarn add -D -W eslint prettier @typescript-eslint/parser
```

## 📋 Pre-Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Add description, keywords, repository URL
- [ ] Write comprehensive README
- [ ] Fix all TypeScript `any` types
- [ ] Add `prepublishOnly` script
- [ ] Test installation: `npm pack` (creates a tarball you can test)
- [ ] Test the tarball locally: `npm install ./luxe-edit-core-1.0.0.tgz`
- [ ] Update changelog
- [ ] Tag git release
- [ ] Run `npm publish --access public`

## 🔍 Testing Package Locally Before Publishing

```bash
cd packages/core

# Create a tarball (without publishing)
npm pack

# This creates: luxe-edit-core-1.0.0.tgz

# In another project, test it:
npm install /path/to/luxe-edit-core-1.0.0.tgz
```

## 📚 Resources

- [Yarn Workspaces Docs](https://yarnpkg.com/features/workspaces)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [tsup Documentation](https://tsup.egoist.dev/)
- [Lexical Documentation](https://lexical.dev/)

## 🎉 Summary

This is a **well-structured monorepo** that's ready for publishing. The main improvements needed are:
1. Add package metadata (description, keywords, repository)
2. Fix TypeScript types (remove `any`)
3. Add README documentation
4. Test before publishing with `npm pack`

The architecture is solid and follows modern best practices for React component libraries! 🚀
