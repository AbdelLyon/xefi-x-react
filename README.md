# @xefi/x-react

[![npm version](https://img.shields.io/npm/v/@xefi/x-react.svg)](https://www.npmjs.com/package/@xefi/x-react)
[![npm downloads](https://img.shields.io/npm/dm/@xefi/x-react.svg)](https://www.npmjs.com/package/@xefi/x-react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@xefi/x-react)](https://bundlephobia.com/package/@xefi/x-react)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A modern, comprehensive React component library built with TypeScript, featuring tree-shakeable components, dark/light theme support, and extensive customization options.

## ✨ Features

- 🎨 **30+ High-quality Components** - Comprehensive set of UI components
- 📦 **Tree-shakeable** - Import only what you need
- 🎭 **Theme Support** - Built-in dark/light mode switching
- 🔧 **TypeScript** - Full TypeScript support with strict typing
- 🎯 **Accessibility** - WCAG compliant components
- 📱 **Responsive** - Mobile-first responsive design
- 🔄 **Modern Hooks** - 20+ custom React hooks
- ⚡ **Performance** - Optimized bundle with minimal overhead
- 🎨 **Tailwind CSS** - Utility-first styling with customization
- 📊 **Chart Components** - Built-in chart.js integration

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @xefi/x-react

# yarn
yarn add @xefi/x-react

# pnpm
pnpm add @xefi/x-react
```

### Peer Dependencies

```bash
npm install react react-dom @tabler/icons-react framer-motion
```

### Basic Usage

```tsx
import { Button } from "@xefi/x-react/button"
import { useToggle } from "@xefi/x-react/hooks"
import "@xefi/x-react/style.css"

function App() {
  const [isOpen, toggle] = useToggle(false)
  
  return (
    <Button onClick={toggle} variant="primary">
      {isOpen ? 'Close' : 'Open'}
    </Button>
  )
}
```

## 📦 Available Components

### UI Components
- **Button** - Interactive buttons with multiple variants
- **Card** - Flexible content containers
- **Modal** - Accessible modal dialogs
- **Accordion** - Collapsible content sections
- **Alert** - Status and feedback messages
- **Avatar** - User profile pictures and placeholders
- **Badge** - Small status indicators
- **Chip** - Compact elements for tags and filters
- **Divider** - Visual content separators
- **Progress** - Progress indicators and loaders
- **Skeleton** - Loading state placeholders
- **Tooltip** - Contextual information overlays

### Form Components
- **Input** - Text input fields
- **Select** - Dropdown selection components
- **Checkbox** - Selection controls
- **Radio** - Single choice selection
- **Switch** - Toggle controls
- **Textarea** - Multi-line text input
- **DatePicker** - Date selection component
- **Slider** - Range input controls

### Navigation
- **Navbar** - Application navigation bars
- **Sidebar** - Side navigation panels
- **Tabs** - Tabbed content organization
- **Pagination** - Page navigation controls
- **Breadcrumbs** - Hierarchical navigation

### Data Display
- **DataGrid** - Advanced data tables with sorting, filtering
- **Chart** - Chart.js integration for data visualization
- **Typography** - Text styling components
- **Image** - Optimized image components

### Layout
- **Container** - Content layout containers
- **Layout** - Page layout components
- **Drawer** - Slide-out panels

### Feedback
- **Toast** - Temporary notification messages
- **Popover** - Contextual popup content

## 🎣 Custom Hooks

```tsx
import { 
  useToggle, 
  useCounter, 
  useLocalStorage,
  useMediaQuery,
  useDebouncedValue,
  useClickOutside 
} from "@xefi/x-react/hooks"

function Example() {
  const [count, { increment, decrement }] = useCounter(0)
  const [value, setValue] = useLocalStorage('key', 'default')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const debouncedSearch = useDebouncedValue(searchTerm, 300)
  
  // ... more hooks available
}
```

## 🎨 Theming

```tsx
import { ThemeProvider } from "@xefi/x-react/providers"
import { ToggleTheme } from "@xefi/x-react/theme"

function App() {
  return (
    <ThemeProvider>
      <ToggleTheme />
      {/* Your app components */}
    </ThemeProvider>
  )
}
```

### Tailwind Configuration

Extend your `tailwind.config.js`:

```js
import config from "@xefi/x-react/tailwind.config"

export default {
  ...config,
  // Your customizations
}
```

## 📖 Documentation

Visit our [documentation site](https://github.com/AbdelLyon/xefi-x-react) for:
- Detailed component APIs
- Interactive examples
- Migration guides
- Best practices

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/AbdelLyon/xefi-x-react.git

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## 📋 Requirements

- Node.js >= 18.0.0
- React >= 18.0.0
- TypeScript >= 4.9.0

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [HeroUI](https://heroui.com/) components
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Tabler Icons](https://tabler-icons.io/)
- Charts powered by [Chart.js](https://www.chartjs.org/)

## 📞 Support

- 🐛 [Report Issues](https://github.com/AbdelLyon/xefi-x-react/issues)
- 💬 [GitHub Discussions](https://github.com/AbdelLyon/xefi-x-react/discussions)
- 📧 Contact: [Your Email]

---

Made with ❤️ by [DailyApps](https://github.com/AbdelLyon)