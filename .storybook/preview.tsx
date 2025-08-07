import type { Preview } from '@storybook/react';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import '../src/index.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'alpha',
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'gray',
          value: '#f4f4f5',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  
  decorators: [
    (Story, context) => {
      const theme = context.globals.backgrounds?.value === '#0a0a0a' ? 'dark' : 'light';
      
      return (
        <ThemeProvider 
          attribute="class" 
          defaultTheme={theme}
          enableSystem={false}
          forcedTheme={theme}
        >
          <HeroUIProvider>
            <div className={`min-h-screen transition-colors duration-200 ${
              theme === 'dark' 
                ? 'dark bg-background text-foreground' 
                : 'bg-background text-foreground'
            }`}>
              <div className="p-6">
                <Story />
              </div>
            </div>
          </HeroUIProvider>
        </ThemeProvider>
      );
    },
  ],
  
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;