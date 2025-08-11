import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

import { mergeTailwindClasses } from "@/utils";
import { useTheme } from "@/hooks/useTheme";
import type { JSX } from "react";

export const ToggleTheme = ({
  className,
  size = 22,
}: {
  className?: string;
  size?: number;
}): JSX.Element => {
  const { setTheme, theme } = useTheme();

  const handleClick = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
  };

  return (
    <button
      className={mergeTailwindClasses(
        "cursor-pointer transition-all hover:opacity-80 ",
        className,
      )}
      onClick={handleClick}
    >
      <IconSunFilled className="hidden dark:block" size={size} />
      <IconMoonFilled className="dark:hidden" size={size} />
    </button>
  );
};
