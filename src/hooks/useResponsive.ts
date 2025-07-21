import { useMediaQuery } from "./useMediaQuery";

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

const MEDIA_QUERIES = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
} as const;

export const useResponsive = (customQuery?: string): ResponsiveHook => {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop, {
    initialValue: true,
    getInitialValueInEffect: true,
  });
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet, {
    initialValue: false,
  });
  const isMobile = !isDesktop && !isTablet;

  const customMatch = useMediaQuery(
    typeof customQuery === "string" && customQuery.length > 0
      ? customQuery
      : "",
  );

  const getBreakpoint = (): keyof Breakpoints => {
    if (isDesktop === true) {
      return "isDesktop";
    }
    if (isTablet === true) {
      return "isTablet";
    }
    return "isMobile";
  };

  const isBreakpoint = (breakpoint: keyof Breakpoints): boolean => {
    const breakpoints: Breakpoints = {
      isDesktop,
      isTablet,
      isMobile,
    };
    return breakpoints[breakpoint] === true;
  };

  const hasValidCustomQuery =
    typeof customQuery === "string" && customQuery.length > 0;

  return {
    isDesktop,
    isTablet,
    isMobile,
    matches: hasValidCustomQuery ? customMatch : undefined,
    getBreakpoint,
    isBreakpoint,
  };
};
