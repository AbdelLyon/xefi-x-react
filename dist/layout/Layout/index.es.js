var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { jsxs, jsx } from "react/jsx-runtime";
import { useMediaQuery } from "../../hooks/useMediaQuery/index.es.js";
import { Navbar } from "../../navbar/Navbar/index.es.js";
import { Sidebar } from "../../sidebar/Sidebar/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Layout = ({
  children,
  navbar,
  sidebar,
  className
}) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const hasNavbar = Boolean(navbar);
  const hasSidebar = Boolean(sidebar);
  return /* @__PURE__ */ jsxs("div", { className: "relative h-full max-h-screen overflow-x-hidden bg-background", children: [
    hasNavbar && /* @__PURE__ */ jsx(Navbar, __spreadValues({}, navbar)),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      hasSidebar && /* @__PURE__ */ jsx(Sidebar, __spreadValues({}, sidebar)),
      /* @__PURE__ */ jsx(
        "main",
        {
          className: mergeTailwindClasses(
            "flex-1 overflow-hidden transition-all duration-200 mb-4",
            {
              "pt-4": hasNavbar,
              "ml-0": !hasSidebar || !isTablet && !isDesktop,
              "ml-[90px]": hasSidebar && isTablet,
              "ml-[270px]": hasSidebar && isDesktop,
              "px-4 sm:px-6 md:px-8 lg:px-12": true
            },
            className
          ),
          children
        }
      )
    ] })
  ] });
};
export {
  Layout
};
