import { heroui } from "@heroui/react";
import { lightTheme } from "./src/theme/lightTheme";
import { darkTheme } from "./src/theme/darkTheme";

const config = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: lightTheme,
        },
        dark: {
          colors: darkTheme,
        },
      },
    }),
  ],
};

export default config;
