# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@xefi/x-react** is a comprehensive React component library built with TypeScript and modern tooling. It's designed as a modular, tree-shakeable package where each component can be imported individually.

## Development Commands

### Essential Commands
```bash
pnpm build        # Production build with Vite
pnpm test         # Run Vitest test suite  
pnpm test:cov     # Run tests with coverage
pnpm lint         # ESLint with TypeScript and Tailwind rules
pnpm clean        # Clean node_modules, dist, and logs
pnpm reset        # Clean and rebuild everything
```

### Testing Commands
```bash
pnpm test Button                    # Run tests for specific component
pnpm test --coverage               # Generate coverage report
pnpm test --watch                  # Watch mode for development
pnpm test src/tests/hooks/         # Test specific directory
```

## Architecture Overview

### Modular Export System
The library uses a sophisticated modular export pattern defined in package.json. Each component has its own entry point:

- `./button` → `dist/button/Button/index.es.js`  
- `./modal` → `dist/modal/Modal/index.es.js`
- `./hooks` → `dist/hooks/index.es.js`
- `./utils` → `dist/utils/index.es.js`

This enables tree-shaking and selective imports: `import { Button } from "@xefi/x-react/button"`

### Component Structure Pattern
All components follow this consistent structure:
```
src/[component-name]/
├── [ComponentName].tsx    # Main component with forwardRef pattern
└── index.ts              # Re-exports with CSS imports
```

Components extend Hero UI components while adding custom props, enhanced accessibility, and type safety.

### Build System (Vite)
- **Modular builds**: Each component built as separate entry point
- **External dependencies**: React, Hero UI marked as external  
- **TypeScript declarations**: Auto-generated with vite-plugin-dts
- **CSS code splitting**: Separate CSS bundles
- **Tree-shaking**: Aggressive optimization with `"sideEffects": false`

### Type System
Centralized types in `src/types/`:
- `types.ts`: Common UI types (Color, Variant, Size)  
- `datagrid.ts`: Complex grid component types
- `navigation.ts`: Navigation-specific types

All components use strict TypeScript with Hero UI integration.

### Testing Strategy
Uses Vitest + React Testing Library with jsdom environment:
- **Snapshot tests**: Visual regression testing  
- **Behavioral tests**: User interaction with userEvent
- **Accessibility tests**: ARIA validation
- **Hook tests**: Custom hook unit testing
- **Setup**: `src/tests/vitest.setup.ts` configures global mocks

Tests are written in French (project preference).

## Key Development Patterns

### Component Development
1. Create component in `src/[name]/[Name].tsx` using forwardRef
2. Extend appropriate Hero UI component props
3. Add custom props interface with proper TypeScript
4. Export through `src/[name]/index.ts` with CSS import
5. Add corresponding export entry in package.json
6. Write comprehensive tests in `src/tests/`

### Hook Development  
Custom hooks in `src/hooks/` cover:
- State management: `useToggle`, `useCounter`, `useStateHistory`
- Performance: `useDebouncedCallback`, `useDebouncedValue` 
- DOM interaction: `useClickOutside`, `useFocusDetection`
- Responsive: `useMediaQuery`, `useResponsive`

### Theme System
- Light/dark themes in `src/theme/`
- Tailwind integration with Hero UI
- Theme switching via `ToggleTheme` component
- Custom Tailwind config exported as `./tailwind.config`

## Dependencies Architecture

### Core Stack
- **@heroui/react**: Primary UI foundation
- **clsx**: Conditional class names
- **tailwind-merge**: Class conflict resolution  
- **next-themes**: Theme management

### Peer Dependencies (Required)
- **React 18+**: Modern React with concurrent features
- **@tabler/icons-react**: Icon system
- **framer-motion**: Animation framework

### Optional Dependencies  
- **Chart.js + react-chartjs-2**: For chart components
- **@internationalized/date**: Date utilities

## Build and Distribution

The library is ESM-only (`"type": "module"`) and distributes:
- Individual component bundles in `dist/`
- TypeScript declarations for all exports
- CSS with Tailwind styles
- Custom Tailwind configuration

GitHub Actions workflow publishes to npm on release creation.

## Code Quality

- **ESLint**: TypeScript, React Hooks, Tailwind class validation
- **TypeScript**: Strict mode with type-aware linting  
- **Testing**: Comprehensive test coverage expected
- **Accessibility**: Built-in ARIA considerations for all components

## Installation for Users

Users can install directly from GitHub:
```bash
npm install github:AbdelLyon/xefi-x-react
# or
pnpm add github:AbdelLyon/xefi-x-react
```

Then import components:
```typescript  
import { Button } from "@xefi/x-react/button"
import { useToggle } from "@xefi/x-react/hooks"
import "@xefi/x-react/style.css"
```