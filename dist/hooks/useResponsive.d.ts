type Breakpoints = {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
};
type ResponsiveHook = {
    matches?: boolean;
    getBreakpoint: () => keyof Breakpoints;
    isBreakpoint: (breakpoint: keyof Breakpoints) => boolean;
} & Breakpoints;
export declare const useResponsive: (customQuery?: string) => ResponsiveHook;
export {};
