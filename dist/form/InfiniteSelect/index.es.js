var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { jsx } from "react/jsx-runtime";
import { Select, SelectItem } from "@heroui/react";
import { useState, useMemo } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll/index.es.js";
import { mergeTailwindClasses } from "../../utils/string/index.es.js";
const defaultClassNames = {
  base: "max-w-xs",
  trigger: "h-10 bg-white dark:bg-background data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparant data-[hover=true]:border-outline",
  value: "text-small",
  popoverContent: "bg-white dark:bg-background",
  selectItem: "text-small"
};
function InfiniteSelect(_a) {
  var _b = _a, {
    fetchFunction: _fetchFunction,
    fetchDelay: _fetchDelay = 0,
    limit: _limit = 10,
    items: externalItems,
    hasMore: externalHasMore,
    isLoadingMore: externalIsLoading,
    onLoadMore: externalLoadMore,
    className,
    classNames,
    renderItem,
    getItemKey,
    selectionMode = "single"
  } = _b, selectProps = __objRest(_b, [
    "fetchFunction",
    "fetchDelay",
    "limit",
    "items",
    "hasMore",
    "isLoadingMore",
    "onLoadMore",
    "className",
    "classNames",
    "renderItem",
    "getItemKey",
    "selectionMode"
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const processedItems = useMemo(() => {
    if (!externalItems) {
      return [];
    }
    return externalItems.map((item, index) => ({
      data: item,
      uniqueIndex: index
    }));
  }, [externalItems]);
  const { scrollContainerRef } = useInfiniteScroll({
    hasMore: !!externalHasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: externalLoadMore
  });
  const mergedClassNames = {
    base: mergeTailwindClasses(defaultClassNames.base, classNames == null ? void 0 : classNames.base),
    trigger: mergeTailwindClasses(
      defaultClassNames.trigger,
      classNames == null ? void 0 : classNames.trigger
    ),
    value: mergeTailwindClasses(defaultClassNames.value, classNames == null ? void 0 : classNames.value),
    popoverContent: mergeTailwindClasses(
      defaultClassNames.popoverContent,
      classNames == null ? void 0 : classNames.popoverContent
    )
  };
  const rootClassName = mergeTailwindClasses(mergedClassNames.base, className);
  const selectItemClassName = mergeTailwindClasses(
    defaultClassNames.selectItem,
    classNames == null ? void 0 : classNames.selectItem
  );
  return /* @__PURE__ */ jsx(
    Select,
    __spreadProps(__spreadValues({
      className: rootClassName,
      classNames: mergedClassNames,
      isLoading: !!externalIsLoading,
      items: processedItems,
      scrollRef: scrollContainerRef,
      selectionMode,
      onOpenChange: (open) => {
        var _a2;
        setIsOpen(open);
        (_a2 = selectProps.onOpenChange) == null ? void 0 : _a2.call(selectProps, open);
      }
    }, selectProps), {
      children: (wrapper) => /* @__PURE__ */ jsx(
        SelectItem,
        {
          textValue: String(getItemKey(wrapper.data)),
          className: selectItemClassName,
          children: renderItem(wrapper.data)
        },
        `${getItemKey(wrapper.data)}-${wrapper.uniqueIndex}`
      )
    })
  );
}
export {
  InfiniteSelect
};
