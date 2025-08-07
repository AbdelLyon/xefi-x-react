import { heroui } from "@heroui/react";
import { lightTheme } from "./src/theme/lightTheme";
import { darkTheme } from "./src/theme/darkTheme";

const config = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'md': '6px', 
        'lg': '8px',
        'full': '9999px',
      },
    },
  },
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
      layout: {
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
      },
      defaultTheme: "light",
      defaultExtendTheme: "light",
    }),
  ],
};

export default config;
