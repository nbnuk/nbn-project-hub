# Modern Monorepo Baseline

This brings the monorepo to a modern baseline (**Yarn 4 + Vite 7 + React 19 + TS 5.9 + Storybook 10 + Jest 30 via SWC
**), and includes **CRA → Vite migration** for the demo app.

---

## 0) Prereqs (do this first)

### Node + Corepack

Use a modern Node (**Node 20+ is fine; Node 22/24 also fine**). Then:

```bash
corepack enable
node -v
```

## 1) Root of repo: replace/add these files

### package.json (REPLACE)

```   
{
   "name": "nbn-project-hub",
   "packageManager": "yarn@4.12.0",
   "workspaces": [
   "packages/nbn-js-lib",
   "packages/nbn-react-components",
   "packages/nbn-maps",
   "apps/*"
   ],
   "scripts": {
   "build:demo": "yarn build:nbn-react-components && yarn workspace @nbnuk/demo build",
   "dev:demo": "yarn workspace @nbnuk/demo dev",

   "build:nbn-react-components": "yarn workspace @nbnuk/nbn-react-components build",
   "storybook:nbn-react-components": "yarn workspace @nbnuk/nbn-react-components storybook",
   "docs:nbn-react-components": "yarn workspace @nbnuk/nbn-react-components docs",

   "build:maps": "yarn workspace @nbnuk/nbn-maps build",
   "storybook:maps": "yarn workspace @nbnuk/nbn-maps storybook",

   "test": "jest",
   "chromatic": "chromatic --exit-zero-on-changes"
   },
   "devDependencies": {
   "@swc/core": "^1.7.0",
   "@swc/jest": "^0.2.36",
   "@testing-library/jest-dom": "^6.9.1",
   "@testing-library/react": "^16.3.1",
   "@types/geojson": "^7946.0.10",
   "@types/jest": "^30.0.0",
   "@types/leaflet": "^1.9.3",
   "@types/proj4": "^2.5.2",
   "jest": "^30.2.0",
   "jest-environment-jsdom": "^30.2.0",
   "jest-fetch-mock": "^3.0.3",
   "json": "^11.0.0",
   "typedoc": "^0.28.15",
   "typescript": "^5.9.3",
   "vite-plugin-dts": "^4.5.4"
   },
   "dependencies": {
   "@vitejs/plugin-react": "^5.1.2",
   "brc-atlas-bigr": "^2.4.0",
   "leaflet": "^1.9.4",
   "leaflet-easyprint": "^2.1.9",
   "proj4": "^2.19.0",
   "swr": "^2.3.5"
   },
   "private": true
}
```

### .yarnrc.yml (REPLACE)

```
nodeLinker: node-modules
```

### jest.config.mjs (ADD at repo root)

```
export default {
   projects: ['<rootDir>/packages/nbn-react-components'],
   collectCoverage: true,
   coverageReporters: ['text', 'lcov'],
};
```

## 2) Demo app: CRA → Vite migration (apps/demo)

### apps/demo/package.json (REPLACE)

```   
{
   "name": "@nbnuk/demo",
   "version": "0.1.0",
   "private": true,
   "type": "module",
   "dependencies": {
      "@nbnuk/nbn-react-components": "workspace:*",
      "react": "^19.2.3",
      "react-dom": "^19.2.3"
   },
   "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "preview": "vite preview",
      "test": "vitest"
   },
   "devDependencies": {
      "@types/node": "^25.0.3",
      "@types/react": "^19.0.3",
      "@types/react-dom": "^19.0.3",
      "@vitejs/plugin-react": "^5.1.2",
      "@testing-library/jest-dom": "^6.9.1",
      "@testing-library/react": "^16.3.1",
      "jsdom": "^27.3.0",
      "typescript": "^5.9.3",
      "vite": "^7.3.0",
      "vitest": "^4.0.16"
   }
}
```

### apps/demo/vite.config.ts (ADD/REPLACE)

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
   server: {
      port: 3000,
   },
   test: {
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      globals: true,
   },
});
```

### apps/demo/index.html (ADD)

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NBN Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### apps/demo/tsconfig.json (REPLACE)

```
{
   "compilerOptions": {
      "target": "ES2022",
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "module": "ESNext",
      "moduleResolution": "Bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "react-jsx",
      "types": ["vite/client", "vitest/globals"],
      "noEmit": true,
      "useDefineForClassFields": true
   },
   "include": ["src"],
   "references": [{ "path": "../../packages/nbn-react-components" }]
}
```

### apps/demo/src/main.tsx (ADD)

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
   <App />
</React.StrictMode>,
);
```

### Delete CRA-only files/folders (if present)

### Remove these if they exist in apps/demo:

public/

src/index.tsx

src/reportWebVitals.ts

src/react-app-env.d.ts

src/setupProxy.* (if any)

CRA scripts in package.json (react-scripts)

Your existing src/App.tsx, src/App.css, src/index.css, src/setupTests.ts, src/App.test.tsx can stay.

## 3) React component library: packages/nbn-react-components

### packages/nbn-react-components/package.json (REPLACE)

```
{
   "name": "@nbnuk/nbn-react-components",
   "description": "React component library for the NBN Atlas, the UK's largest repository of publicly available biodiversity data",
   "homepage": "https://nbnatlas.org/",
   "version": "1.0.0",
   "type": "module",
   "repository": {
      "type": "git",
      "url": "git+https://github.com/nbnuk/nbn-project-hub.git"
   },
   "files": ["dist"],
   "author": { "name": "helenmanders-jones" },
   "main": "./dist/nbn-react-components.es.js",
   "module": "./dist/nbn-react-components.es.js",
   "style": "./dist/index.css",
   "types": "./dist/index.d.ts",
   "exports": {
      ".": {
         "import": "./dist/nbn-react-components.es.js",
         "require": "./dist/nbn-react-components.umd.js"
      }
   },
   "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "lint": "eslint .",
      "preview": "vite preview",
      "storybook": "storybook dev -p 6006",
      "build-storybook": "storybook build",
      "test": "jest",
      "docs": "npx typedoc --out docs src/components/**/*.ts",
      "chromatic": "npx chromatic --project-token=chpt_faa48f23404bf10"
   },
   "peerDependencies": {
      "react": "^18.2.0 || ^19.0.0",
      "react-dom": "^18.2.0 || ^19.0.0"
   },
   "devDependencies": {
      "@eslint/js": "^9.39.2",
      "@storybook/addon-actions": "^10.1.10",
      "@storybook/addon-essentials": "^10.1.10",
      "@storybook/addon-interactions": "^10.1.10",
      "@storybook/addon-links": "^10.1.10",
      "@storybook/addon-onboarding": "^10.1.10",
      "@storybook/blocks": "^10.1.10",
      "@storybook/preset-create-react-app": "^10.1.10",
      "@storybook/react": "^10.1.10",
      "@storybook/react-vite": "^10.1.10",
      "@storybook/testing-library": "^10.1.10",
      "@testing-library/jest-dom": "^6.9.1",
      "@testing-library/react": "^16.3.1",
      "@types/jest": "^29.5.3",
      "@types/react": "^19.0.3",
      "@types/react-dom": "^19.0.3",
      "@typescript-eslint/eslint-plugin": "^8.50.1",
      "@typescript-eslint/parser": "^8.50.1",
      "@vitejs/plugin-react": "^5.1.2",
      "@swc/core": "^1.7.0",
      "@swc/jest": "^0.2.36",
      "autoprefixer": "^10.4.21",
      "chromatic": "^12.0.0",
      "eslint": "^9.39.2",
      "eslint-plugin-react-hooks": "^5.2.0",
      "eslint-plugin-react-refresh": "^0.4.9",
      "eslint-plugin-storybook": "^0.12.0",
      "jest": "^30.2.0",
      "jest-environment-jsdom": "^30.2.0",
      "postcss": "^8.5.6",
      "storybook": "^10.1.10",
      "tailwindcss": "^3.4.17",
      "ts-node": "^10.9.2",
      "typescript": "^5.9.3",
      "vite": "^7.3.0"
   },
   "dependencies": {
      "@emotion/react": "^11.14.0",
      "@emotion/styled": "^11.14.0",
      "@fortawesome/fontawesome-svg-core": "^6.7.2",
      "@fortawesome/free-solid-svg-icons": "^6.7.2",
      "@fortawesome/react-fontawesome": "^3.1.1",
      "@mui/icons-material": "^7.3.6",
      "@mui/material": "^7.3.6",
      "date-fns": "^4.1.0",
      "react-grid-gallery": "^1.0.2",
      "react-select": "^5.10.2",
      "zod": "^4.2.1"
   }
}
```

### packages/nbn-react-components/vite.config.ts (REPLACE)

This is important: it ensures the output filenames match your exports (*.es.js and *.umd.js).

```
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
   plugins: [
      react(),
      dts({
         insertTypesEntry: true,
      }),
   ],
   build: {
      sourcemap: true,
      lib: {
         entry: path.resolve(__dirname, 'src/index.ts'),
         name: 'nbnReactComponents',
         formats: ['es', 'umd'],
         fileName: (format) => `nbn-react-components.${format}.js`,
      },
      rollupOptions: {
         external: ['react', 'react-dom'],
         output: {
            globals: {
               react: 'React',
               'react-dom': 'ReactDOM',
               },
            },
         },
      },
      define: {
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
});
```

### packages/nbn-react-components/jest.config.mjs (ADD/REPLACE)

Switch off ts-jest and use SWC for Jest 30.

```
export default {
   testEnvironment: 'jsdom',
   setupFilesAfterEnv: ['@testing-library/jest-dom'],
   transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest'],
   },
   moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
   },
};
```

### packages/nbn-react-components/eslint.config.js (ADD/REPLACE)

ESLint 9 flat config:

```
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
   { ignores: ['dist/**', 'docs/**', 'node_modules/**'] },
   js.configs.recommended,
   {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
         ecmaVersion: 2022,
         sourceType: 'module',
      },
      plugins: {
         '@typescript-eslint': tsPlugin,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
         storybook,
      },
      rules: {
         ...tsPlugin.configs.recommended.rules,
         ...reactHooks.configs.recommended.rules,
         ...storybook.configs.recommended.rules,
         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      },
   },
];
```

### Delete old ESLint config (if present)

Remove packages/nbn-react-components/.eslintrc.*

## packages/nbn-react-components/tsconfig.json (REPLACE)

```
{
   "compilerOptions": {
      "target": "ES2022",
      "useDefineForClassFields": true,
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "Bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": false,
      "declaration": true,
      "declarationMap": true,
      "emitDeclarationOnly": false,

      "jsx": "react-jsx",
      "strict": true,
      "types": ["vite/client"]
   },
   "include": ["src"],
   "references": [{ "path": "./tsconfig.node.json" }]
}
```

## packages/nbn-react-components/tsconfig.node.json (REPLACE)

```
{
   "compilerOptions": {
      "composite": true,
      "module": "ESNext",
      "moduleResolution": "Bundler",
      "skipLibCheck": true
   },
   "include": ["vite.config.ts"]
}
```

## 4) Other packages (keep minimal + modern)

### packages/nbn-maps/package.json (REPLACE)

```
{
   "name": "@nbnuk/nbn-maps",
   "private": true,
   "version": "0.0.0",
   "type": "module",
   "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "storybook": "storybook dev -p 6006",
      "build-storybook": "storybook build"
   },
   "devDependencies": {
      "@storybook/addon-essentials": "^10.1.10",
      "@storybook/addon-interactions": "^10.1.10",
      "@storybook/addon-links": "^10.1.10",
      "@storybook/blocks": "^10.1.10",
      "@storybook/html": "^10.1.10",
      "@storybook/html-vite": "^10.1.10",
      "@storybook/testing-library": "^10.1.10",
      "react": "^19.2.3",
      "react-dom": "^19.2.3",
      "storybook": "^10.1.10",
      "vite": "^7.3.0"
   }
}
```

### packages/nbn-js-lib/package.json (REPLACE)

```
{
   "name": "@nbnuk/nbn-js-lib",
   "private": true,
   "version": "0.0.0",
   "type": "module",
   "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
   },
   "devDependencies": {
      "vite": "^7.3.0"
   }
}
```

## 5) Install + run (from repo root)

```
   corepack enable
   yarn -v

   yarn install

   yarn build:nbn-react-components
   yarn dev:demo

   yarn test
   yarn storybook:nbn-react-components
   yarn storybook:maps
```

## 6) IntelliJ IDEA setup (so it “just works”)

Open the repo root (folder containing root package.json)

Settings → Node.js

Node interpreter: your installed Node

Package manager: Yarn (it will use Corepack; packageManager in package.json helps)

If IntelliJ complains about Yarn PnP:

You’re using nodeLinker: node-modules, so it should be fine.

Create Run Configurations (optional, but nice):

```
   yarn dev:demo
   yarn test

   yarn storybook:nbn-react-components
```

