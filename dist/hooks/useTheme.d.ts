type ThemeHook = {
    setTheme: (theme: string) => void;
    theme: string | undefined;
};
export declare const useTheme: () => ThemeHook;
export {};
