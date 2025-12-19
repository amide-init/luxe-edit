import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,         // Generates .d.ts files for TypeScript users
  minify: true,      // Shrinks the file size
  clean: true,       // Clears the dist folder before building
  external: ['react', 'react-dom'], // Don't bundle React
});