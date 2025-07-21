import { createClassNamesConfig } from "../../utils/classNames/index.es.js";
const defaultTabsClassNames = {
  base: "",
  tabList: "gap-2",
  cursor: "",
  tab: "text-base",
  tabContent: "group-data-[selected=true]:text-primary",
  panel: "py-4"
};
const tabsVariantClasses = {
  solid: {
    tabList: "",
    tab: ""
  },
  bordered: {
    tabList: "border-1 border-border",
    tab: ""
  },
  underlined: {
    tabList: "gap-4",
    tab: "h-auto"
  },
  light: {
    tabList: "",
    tab: "bg-transparent"
  }
};
const tabsClassConfig = createClassNamesConfig(defaultTabsClassNames);
const getTabsVariantClasses = (variant = "solid") => {
  return tabsVariantClasses[variant] || tabsVariantClasses.solid;
};
const mergeTabsClassNames = tabsClassConfig.mergeClasses;
export {
  defaultTabsClassNames,
  getTabsVariantClasses,
  mergeTabsClassNames,
  tabsClassConfig,
  tabsVariantClasses
};
