import { useMediaQuery } from "../useMediaQuery/index.es.js";
const MEDIA_QUERIES = {
  desktop: "(min-width: 1281px)",
  tablet: "(min-width: 768px) and (max-width: 1280px)"
};
const useResponsive = (customQuery) => {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop, {
    initialValue: true,
    getInitialValueInEffect: true
  });
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet, {
    initialValue: false
  });
  const isMobile = !isDesktop && !isTablet;
  const customMatch = useMediaQuery(
    typeof customQuery === "string" && customQuery.length > 0 ? customQuery : ""
  );
  const getBreakpoint = () => {
    if (isDesktop === true) {
      return "isDesktop";
    }
    if (isTablet === true) {
      return "isTablet";
    }
    return "isMobile";
  };
  const isBreakpoint = (breakpoint) => {
    const breakpoints = {
      isDesktop,
      isTablet,
      isMobile
    };
    return breakpoints[breakpoint] === true;
  };
  const hasValidCustomQuery = typeof customQuery === "string" && customQuery.length > 0;
  return {
    isDesktop,
    isTablet,
    isMobile,
    matches: hasValidCustomQuery ? customMatch : void 0,
    getBreakpoint,
    isBreakpoint
  };
};
export {
  useResponsive
};
