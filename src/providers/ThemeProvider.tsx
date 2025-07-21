import type {
  ThemeProviderProps} from "next-themes";
import {
  ThemeProvider as NextThemesProvider
} from "next-themes";
import type { JSX } from "react";

const ThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps): JSX.Element => {
  return (
    <NextThemesProvider
      defaultTheme="light"
      attribute="class"
      disableTransitionOnChange={true}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

export { ThemeProvider, type ThemeProviderProps };
