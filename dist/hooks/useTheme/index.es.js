import { useTheme as useTheme$1 } from "next-themes";
const useTheme = () => {
  const { setTheme, theme } = useTheme$1();
  return { setTheme, theme };
};
export {
  useTheme
};
