# Contributing to @xefi/x-react

We love your input! We want to make contributing to @xefi/x-react as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

1. **Prerequisites**
   - Node.js >= 18.0.0
   - pnpm >= 8.0.0

2. **Clone and install**
   ```bash
   git clone https://github.com/AbdelLyon/xefi-x-react.git
   cd xefi-x-react
   pnpm install
   ```

3. **Development commands**
   ```bash
   pnpm dev          # Start development build
   pnpm build        # Production build
   pnpm test         # Run tests
   pnpm test:watch   # Run tests in watch mode
   pnpm lint         # Lint code
   pnpm format       # Format code
   pnpm typecheck    # TypeScript type checking
   ```

## Code Style

We use several tools to maintain code quality:

- **ESLint** - For code linting
- **Prettier** - For code formatting  
- **TypeScript** - For type safety

Run `pnpm validate` before submitting to ensure your code meets our standards.

## Component Development

### Creating a New Component

1. **File Structure**
   ```
   src/[component-name]/
   ├── [ComponentName].tsx    # Main component
   └── index.ts              # Exports with CSS imports
   ```

2. **Component Template**
   ```tsx
   import { forwardRef } from "react"
   import { ComponentProps } from "./types" // if needed
   
   export interface ComponentNameProps {
     // Your props here
   }
   
   const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
     ({ ...props }, ref) => {
       return (
         // Your component JSX
       )
     }
   )
   
   ComponentName.displayName = "ComponentName"
   export default ComponentName
   ```

3. **Export Configuration**
   - Add to `package.json` exports
   - Add to `vite.config.ts` modules array
   - Create comprehensive tests

### Testing Requirements

- **Unit Tests**: Test component behavior and props
- **Snapshot Tests**: Ensure visual consistency  
- **Accessibility Tests**: Verify ARIA compliance
- **Hook Tests**: For custom hooks

Test files should be in `src/tests/` and named `[Component].test.tsx`

### Documentation

- Add JSDoc comments for all public APIs
- Include usage examples in component files
- Update README.md if adding major features

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat(button): add new size variant
fix(modal): resolve focus trap issue
docs: update installation guide
```

## Issue Guidelines

### Bug Reports

Use the bug report template and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node, React versions)
- Code examples or screenshots

### Feature Requests

Use the feature request template and include:

- Problem the feature would solve
- Proposed solution
- Alternatives considered
- Mockups or examples if applicable

## Component Design Principles

1. **Accessibility First** - All components must be accessible by default
2. **TypeScript Native** - Full TypeScript support with proper typing
3. **Performance Conscious** - Optimize for bundle size and runtime performance
4. **Consistency** - Follow established patterns and conventions
5. **Extensibility** - Allow customization through props and styling

## Release Process

1. Update CHANGELOG.md with new features and fixes
2. Update version in package.json following semantic versioning
3. Create release notes describing changes
4. Tag the release in GitHub

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## Questions?

Feel free to open an issue for questions about contributing, or reach out to the maintainers directly.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.