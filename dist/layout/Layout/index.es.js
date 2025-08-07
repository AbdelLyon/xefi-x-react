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
import { Navbar } from "../../navbar/Navbar/index.es.js";
import { Sidebar } from "../../sidebar/Sidebar/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
const Layout = ({
  children,
  navbar,
  sidebar,
  className
}) => {
  const hasNavbar = Boolean(navbar);
  const hasSidebar = Boolean(sidebar);
  return /* @__PURE__ */ jsxs("div", { className: "relative h-full max-h-screen overflow-x-hidden", children: [
    hasNavbar && /* @__PURE__ */ jsx(Navbar, __spreadValues({}, navbar)),
    hasSidebar && /* @__PURE__ */ jsx(Sidebar, __spreadValues({}, sidebar)),
    /* @__PURE__ */ jsx(
      "main",
      {
        className: mergeTailwindClasses(
          "transition-all duration-300 h-full overflow-y-auto",
          {
            "pt-16": hasNavbar
            // Espace pour la navbar fixe
          },
          className
        ),
        style: {
          marginLeft: hasSidebar ? "var(--sidebar-width, 270px)" : "0px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-none p-6", children })
      }
    )
  ] });
};
export {
  Layout
};
