import type { Preview } from '@storybook/react';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
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
          value: '#000000',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <HeroUIProvider>
          <div className="p-4">
            <Story />
          </div>
        </HeroUIProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;