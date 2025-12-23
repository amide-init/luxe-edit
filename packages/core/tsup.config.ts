import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,         // Generates .d.ts files for TypeScript users
  minify: true,      // Shrinks the file size
  clean: true,       // Clears the dist folder before building
  external: ['react', 'react-dom'], // Don't bundle React
  banner: {
    js: '"use client";',
  },
  tsconfig: './tsconfig.json', // Use our tsconfig for dts generation
  onSuccess: async () => {
    // Copy CSS file to dist
    copyFileSync(
      join(__dirname, 'src/styles.css'),
      join(__dirname, 'dist/index.css')
    );
  },
});