import { jsxs, jsx } from "react/jsx-runtime";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useCallback } from "react";
import { Popover } from "../../../../popover/Popover/index.es.js";
import { Button } from "../../../../button/Button/index.es.js";
import { Tooltip } from "../../../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../../../utils/string/index.es.js";
const Legend = ({
  config,
  className = "",
  position = "bottom",
  compact = false
}) => {
  const handleToggle = useCallback((itemId, visible) => {
    var _a;
    (_a = config.onToggle) == null ? void 0 : _a.call(config, itemId, visible);
  }, [config]);
  const renderLegendItem = useCallback((item, isVisible = true) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: mergeTailwindClasses(
        "flex items-center gap-2 px-2 py-1 rounded-md transition-all",
        config.toggleable && "cursor-pointer hover:bg-default-100",
        !isVisible && "opacity-50"
      ),
      onClick: () => config.toggleable && handleToggle(item.id, !isVisible),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "size-3 rounded-full border border-border/20",
            style: { backgroundColor: item.color }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: mergeTailwindClasses(
          "text-xs font-medium",
          isVisible ? "text-foreground-700" : "text-foreground-500"
        ), children: item.label }),
        item.count !== void 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-foreground-500", children: [
          "(",
          item.count,
          ")"
        ] }),
        config.toggleable && /* @__PURE__ */ jsx("div", { className: "ml-auto", children: isVisible ? /* @__PURE__ */ jsx(IconEye, { className: "size-3 text-foreground-400" }) : /* @__PURE__ */ jsx(IconEyeOff, { className: "size-3 text-foreground-400" }) })
      ]
    },
    item.id
  ), [config.toggleable, handleToggle]);
  if (!config.enabled || config.items.length === 0) {
    return null;
  }
  const visibleItems = config.items.filter((item) => item.visible !== false);
  const hiddenItems = config.items.filter((item) => item.visible === false);
  if (compact) {
    return /* @__PURE__ */ jsx(
      Popover,
      {
        placement: position,
        trigger: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "light",
            size: "sm",
            className: mergeTailwindClasses("hover:bg-default-100", className),
            children: [
              "Légende (",
              visibleItems.length,
              ")",
              hiddenItems.length > 0 && /* @__PURE__ */ jsxs("span", { className: "ml-1 text-xs text-foreground-500", children: [
                "+",
                hiddenItems.length,
                " masqués"
              ] })
            ]
          }
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-xs p-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold", children: "Légende" }),
          visibleItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-3 space-y-1", children: [
            /* @__PURE__ */ jsx("h5", { className: "text-xs font-medium uppercase tracking-wide text-foreground-600", children: "Visible" }),
            visibleItems.map((item) => renderLegendItem(item, true))
          ] }),
          hiddenItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h5", { className: "text-xs font-medium uppercase tracking-wide text-foreground-600", children: "Masqué" }),
            hiddenItems.map((item) => renderLegendItem(item, false))
          ] }),
          config.toggleable && config.items.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-3 border-t border-border pt-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "light",
                className: "flex-1 text-xs",
                onPress: () => {
                  config.items.forEach((item) => handleToggle(item.id, true));
                },
                children: "Tout afficher"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "light",
                className: "flex-1 text-xs",
                onPress: () => {
                  config.items.forEach((item) => handleToggle(item.id, false));
                },
                children: "Tout masquer"
              }
            )
          ] }) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: mergeTailwindClasses(
    "rounded-lg border border-border bg-background p-3",
    className
  ), children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "Légende" }),
      config.toggleable && /* @__PURE__ */ jsx(Tooltip, { content: "Gérer la visibilité", children: /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "light",
          className: "px-2 text-xs",
          children: /* @__PURE__ */ jsx(IconEye, { className: "size-3" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: mergeTailwindClasses(
      "grid gap-1",
      config.items.length > 6 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
    ), children: [
      visibleItems.map((item) => renderLegendItem(item, true)),
      hiddenItems.map((item) => renderLegendItem(item, false))
    ] }),
    config.items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 border-t border-border pt-2 text-xs text-foreground-500", children: [
      visibleItems.length,
      " élément",
      visibleItems.length !== 1 ? "s" : "",
      " visible",
      visibleItems.length !== 1 ? "s" : "",
      hiddenItems.length > 0 && /* @__PURE__ */ jsxs("span", { children: [
        ", ",
        hiddenItems.length,
        " masqué",
        hiddenItems.length !== 1 ? "s" : ""
      ] })
    ] })
  ] });
};
export {
  Legend
};
