import { useTheme as useNextTheme } from "next-themes";

type ThemeHook = {
  setTheme: (theme: string) => void;
  theme: string | undefined;
}

export const useTheme = (): ThemeHook => {
  const { setTheme, theme } = useNextTheme();
  return { setTheme, theme };
};
