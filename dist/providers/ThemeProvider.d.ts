import { ThemeProviderProps } from 'next-themes';
import { JSX } from 'react';
declare const ThemeProvider: ({ children, ...props }: ThemeProviderProps) => JSX.Element;
export { ThemeProvider, type ThemeProviderProps };
