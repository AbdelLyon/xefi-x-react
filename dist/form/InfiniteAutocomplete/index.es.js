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
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { AutocompleteItem, Button, Popover, PopoverTrigger, Badge, PopoverContent, ScrollShadow, cn, Autocomplete } from "@heroui/react";
import { IconXboxX, IconTrash } from "@tabler/icons-react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue/index.es.js";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll/index.es.js";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
import { mergeTailwindClasses } from "../../utils/utils/index.es.js";
function InfiniteAutocomplete(_a) {
  var _b = _a, {
    items,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    className = "max-w-xs",
    renderItem,
    getItemKey,
    getItemValue = (item) => String(renderItem(item)).replace(/<[^>]*>/g, ""),
    onSearchChange,
    searchDebounceMs = 300,
    selectionMode = "single",
    selectedKey,
    selectedKeys = /* @__PURE__ */ new Set(),
    onSelectionChange,
    maxVisibleInBadge = 2,
    selectionIcon = null,
    selectionLabel = "sélectionné",
    itemClassName,
    emptyContent = "Aucun élément trouvé",
    errorContent,
    loadingContent = "Chargement des données...",
    fetchingMoreContent = "Chargement de plus d'éléments..."
  } = _b, autocompleteProps = __objRest(_b, [
    "items",
    "isFetching",
    "fetchNextPage",
    "hasNextPage",
    "isLoading",
    "error",
    "className",
    "renderItem",
    "getItemKey",
    "getItemValue",
    "onSearchChange",
    "searchDebounceMs",
    "selectionMode",
    "selectedKey",
    "selectedKeys",
    "onSelectionChange",
    "maxVisibleInBadge",
    "selectionIcon",
    "selectionLabel",
    "itemClassName",
    "emptyContent",
    "errorContent",
    "loadingContent",
    "fetchingMoreContent"
  ]);
  const commonAutocompleteProps = {
    radius: "sm",
    size: "md",
    variant: "faded",
    selectionMode: "multiple",
    multiple: true,
    maxVisibleInBadge: 2,
    inputProps: {
      classNames: {
        inputWrapper: `border border-border bg-transparent data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparent data-[hover=true]:border-outline ${error ? "border-red-500" : ""}`
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [savedSelectedItems, setSavedSelectedItems] = useState(/* @__PURE__ */ new Map());
  const lastSearchTermRef = useRef("");
  const isMultiSelect = selectionMode === "multiple";
  const { debouncedValue: debouncedSearchTerm, cancel: cancelDebounce } = useDebouncedValue(inputValue, searchDebounceMs);
  const { scrollContainerRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen && !error,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage
  });
  useEffect(() => {
    if (onSearchChange && debouncedSearchTerm !== lastSearchTermRef.current) {
      lastSearchTermRef.current = debouncedSearchTerm;
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);
  useEffect(() => {
    if (!isMultiSelect) {
      return;
    }
    setSavedSelectedItems((prev) => {
      const newSavedItems = new Map(prev);
      items.forEach((item) => {
        const key = getItemKey(item);
        if (selectedKeys.has(key) && !newSavedItems.has(key)) {
          newSavedItems.set(key, item);
        }
      });
      Array.from(newSavedItems.keys()).forEach((key) => {
        if (!selectedKeys.has(key)) {
          newSavedItems.delete(key);
        }
      });
      return newSavedItems;
    });
  }, [items, selectedKeys, getItemKey, isMultiSelect]);
  const selectedItems = useMemo(() => {
    return isMultiSelect ? Array.from(savedSelectedItems.values()) : [];
  }, [savedSelectedItems, isMultiSelect]);
  const handleInputChange = useCallback(
    (value) => {
      setInputValue(value);
      if (value === "" && onSearchChange) {
        cancelDebounce();
        lastSearchTermRef.current = "";
        onSearchChange("");
      }
    },
    [onSearchChange, cancelDebounce]
  );
  const handleSelectionChange = useCallback(
    (key) => {
      if (key === null || key === void 0) {
        if (!isMultiSelect) {
          onSelectionChange == null ? void 0 : onSelectionChange(null);
        }
        return;
      }
      if (!isMultiSelect) {
        onSelectionChange == null ? void 0 : onSelectionChange(key);
        setInputValue("");
        return;
      }
      const newSelectedKeys = new Set(selectedKeys);
      if (selectedKeys.has(key)) {
        newSelectedKeys.delete(key);
      } else {
        newSelectedKeys.add(key);
      }
      onSelectionChange == null ? void 0 : onSelectionChange(newSelectedKeys);
      setInputValue("");
    },
    [isMultiSelect, selectedKeys, onSelectionChange]
  );
  const handleRemoveChip = useCallback(
    (itemKey) => {
      if (!isMultiSelect) {
        return;
      }
      const newSelectedKeys = new Set(selectedKeys);
      newSelectedKeys.delete(itemKey);
      onSelectionChange == null ? void 0 : onSelectionChange(newSelectedKeys);
    },
    [selectedKeys, onSelectionChange, isMultiSelect]
  );
  const handleClearAll = useCallback(() => {
    if (!isMultiSelect) {
      return;
    }
    onSelectionChange == null ? void 0 : onSelectionChange(/* @__PURE__ */ new Set());
    setIsPopoverOpen(false);
  }, [onSelectionChange, isMultiSelect]);
  const handleOpenChange = useCallback(
    (open) => {
      var _a2;
      setIsOpen(open);
      (_a2 = autocompleteProps.onOpenChange) == null ? void 0 : _a2.call(autocompleteProps, open);
      if (!open && inputValue) {
        setInputValue("");
        cancelDebounce();
        lastSearchTermRef.current = "";
        onSearchChange == null ? void 0 : onSearchChange("");
      }
    },
    [autocompleteProps, inputValue, onSearchChange, cancelDebounce]
  );
  const isItemSelected = useCallback(
    (item) => {
      return isMultiSelect && selectedKeys.has(getItemKey(item));
    },
    [isMultiSelect, selectedKeys, getItemKey]
  );
  const autocompleteItems = useMemo(() => {
    return items.map(
      (item) => /* @__PURE__ */ jsx(
        AutocompleteItem,
        {
          className: mergeTailwindClasses(
            "border border-border/10 transition-colors duration-200",
            isItemSelected(item) && "bg-default/50 border-primary/20",
            itemClassName
          ),
          endContent: isItemSelected(item) ? /* @__PURE__ */ jsx("span", { className: "font-semibold text-success", children: "✓" }) : void 0,
          children: renderItem(item)
        },
        getItemKey(item)
      )
    );
  }, [items, getItemKey, isItemSelected, itemClassName, renderItem]);
  const selectionBadge = useCallback(() => {
    if (!isMultiSelect || selectedItems.length === 0) {
      return null;
    }
    if (selectedItems.length <= maxVisibleInBadge) {
      return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 bg-content1/90 py-2 dark:bg-background/90", children: selectedItems.map((item) => {
        const itemKey = getItemKey(item);
        const itemValue = getItemValue(item);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative flex min-w-0 items-center rounded-md border border-primary/20 bg-content1/50 p-2 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "flex-1 truncate text-xs font-medium text-foreground group-hover:text-primary",
                  title: itemValue,
                  children: itemValue
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  isIconOnly: true,
                  size: "sm",
                  variant: "flat",
                  color: "danger",
                  onPress: () => handleRemoveChip(itemKey),
                  className: "ml-2 size-4 bg-danger/20 opacity-60 transition-all duration-200 hover:scale-110 hover:bg-danger/30 hover:opacity-100",
                  "aria-label": `Supprimer ${itemValue}`,
                  children: /* @__PURE__ */ jsx(IconXboxX, { size: 12 })
                }
              )
            ]
          },
          itemKey
        );
      }) });
    }
    return /* @__PURE__ */ jsx("div", { className: "py-2", children: /* @__PURE__ */ jsxs(
      Popover,
      {
        isOpen: isPopoverOpen,
        onOpenChange: setIsPopoverOpen,
        placement: "top-start",
        showArrow: true,
        backdrop: "transparent",
        classNames: {
          content: "border-0 bg-transparent shadow-none p-0"
        },
        children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { children: /* @__PURE__ */ jsx(
            Badge,
            {
              content: selectedItems.length,
              color: "primary",
              size: "lg",
              className: "cursor-pointer",
              classNames: {
                badge: "bg-primary text-white font-semibold min-w-5 h-5"
              },
              children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "flat",
                  size: "sm",
                  startContent: selectionIcon,
                  className: "h-9 border border-primary/20 bg-content1/90 px-4 text-xs font-medium text-primary backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:shadow-md",
                  onPress: () => setIsPopoverOpen(!isPopoverOpen),
                  "aria-label": `${selectedItems.length} ${selectionLabel}${selectedItems.length > 1 ? "s" : ""} sélectionné${selectedItems.length > 1 ? "s" : ""}`,
                  children: [
                    selectedItems.length,
                    " ",
                    selectionLabel,
                    selectedItems.length > 1 ? "s" : ""
                  ]
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs(PopoverContent, { className: "border border-border bg-gradient-to-b from-content1 to-content1 p-3 backdrop-blur-xl transition-all dark:from-background/90 dark:to-background/70", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center justify-between", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-foreground", children: [
                "Éléments ",
                selectionLabel,
                "s (",
                selectedItems.length,
                ")"
              ] }),
              /* @__PURE__ */ jsx(
                Tooltip,
                {
                  content: "Tout supprimer",
                  placement: "top",
                  delay: 500,
                  trigger: /* @__PURE__ */ jsx(
                    Button,
                    {
                      isIconOnly: true,
                      size: "sm",
                      variant: "flat",
                      color: "danger",
                      onPress: handleClearAll,
                      className: "size-8 bg-danger/10 transition-all duration-200 hover:scale-105 hover:bg-danger/20",
                      "aria-label": "Supprimer tous les éléments sélectionnés",
                      children: /* @__PURE__ */ jsx(IconTrash, { size: 16 })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(ScrollShadow, { className: "max-h-80 w-80 overflow-x-hidden", children: /* @__PURE__ */ jsx("div", { className: "grid w-full grid-cols-2 gap-2 pr-2", children: selectedItems.map((item) => {
              const itemKey = getItemKey(item);
              const itemValue = getItemValue(item);
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "group relative flex min-w-0 items-center rounded-md border border-primary/20 bg-content1/50 p-2 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "flex-1 truncate text-xs font-medium text-foreground group-hover:text-primary",
                        title: itemValue,
                        children: itemValue
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        isIconOnly: true,
                        size: "sm",
                        variant: "flat",
                        color: "danger",
                        onPress: () => handleRemoveChip(itemKey),
                        className: "ml-2 size-5 bg-danger/20 opacity-60 transition-all duration-200 hover:scale-110 hover:bg-danger/30 hover:opacity-100",
                        "aria-label": `Supprimer ${itemValue}`,
                        children: /* @__PURE__ */ jsx(IconXboxX, { size: 14 })
                      }
                    )
                  ]
                },
                itemKey
              );
            }) }) })
          ] })
        ]
      }
    ) });
  }, [
    isMultiSelect,
    selectedItems,
    maxVisibleInBadge,
    getItemKey,
    getItemValue,
    handleRemoveChip,
    isPopoverOpen,
    selectionIcon,
    selectionLabel,
    handleClearAll
  ]);
  if (error && !isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
      selectionBadge(),
      /* @__PURE__ */ jsx(
        Autocomplete,
        __spreadProps(__spreadValues(__spreadValues({
          className: "w-full",
          isDisabled: true,
          placeholder: "Erreur de chargement",
          "aria-label": "Autocomplete en erreur"
        }, commonAutocompleteProps), autocompleteProps), {
          children: /* @__PURE__ */ jsx(AutocompleteItem, { isReadOnly: true, className: "text-danger", children: errorContent != null ? errorContent : `Erreur: ${error.message}` }, "error")
        })
      )
    ] });
  }
  if (isLoading && items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
      selectionBadge(),
      /* @__PURE__ */ jsx(
        Autocomplete,
        __spreadProps(__spreadValues({
          className: "w-full",
          isLoading: true,
          placeholder: "Chargement...",
          "aria-label": "Autocomplete en chargement"
        }, autocompleteProps), {
          children: /* @__PURE__ */ jsx(
            AutocompleteItem,
            {
              isReadOnly: true,
              className: "text-default-500",
              children: loadingContent
            },
            "loading"
          )
        })
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("relative z-50", className), children: [
    selectionBadge(),
    /* @__PURE__ */ jsxs(
      Autocomplete,
      __spreadProps(__spreadValues({
        className: "w-full",
        inputProps: __spreadValues({
          classNames: {
            inputWrapper: cn(
              autocompleteProps.variant === "bordered" && "border border-border",
              "transition-colors duration-200"
            )
          }
        }, autocompleteProps.inputProps),
        isLoading: isFetching && items.length === 0,
        items,
        scrollRef: scrollContainerRef,
        inputValue,
        onInputChange: handleInputChange,
        selectedKey: isMultiSelect ? null : selectedKey,
        onSelectionChange: handleSelectionChange,
        onOpenChange: handleOpenChange,
        shouldCloseOnBlur: !isMultiSelect,
        allowsCustomValue: isMultiSelect,
        menuTrigger: "focus",
        "aria-label": autocompleteProps["aria-label"] || "Autocomplete avec scroll infini",
        "aria-describedby": isFetching ? "infinite-autocomplete-loading" : autocompleteProps["aria-describedby"]
      }, autocompleteProps), {
        children: [
          items.length === 0 && !isLoading ? /* @__PURE__ */ jsx(AutocompleteItem, { isReadOnly: true, className: "text-default-500", children: emptyContent }, "empty") : /* @__PURE__ */ jsx(Fragment, { children: autocompleteItems }),
          isFetching && items.length > 0 ? /* @__PURE__ */ jsx(
            AutocompleteItem,
            {
              isReadOnly: true,
              className: "text-default-500",
              children: fetchingMoreContent
            },
            "fetching-more"
          ) : null
        ]
      })
    )
  ] });
}
export {
  InfiniteAutocomplete
};
