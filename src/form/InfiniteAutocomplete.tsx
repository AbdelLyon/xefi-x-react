import { useInfiniteScroll } from "@/hooks";
import { useDebouncedValue } from "@/hooks";
import { Tooltip } from "@/tooltip";
import { mergeTailwindClasses } from "@/utils";
import type { AutocompleteProps } from "@heroui/react";
import {
  Autocomplete,
  AutocompleteItem,
  cn,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
  Button,
  ScrollShadow,
} from "@heroui/react";
import { IconXboxX, IconTrash } from "@tabler/icons-react";
import type { JSX, ReactNode } from "react";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";

type SelectionKey = string | number;

interface InfiniteSelectProps<T extends object>
  extends Omit<
    AutocompleteProps<T>,
    "items" | "children" | "selectedKey" | "onSelectionChange"
  > {
  // React Query props
  items: T[];
  isFetching: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  error?: Error | null;

  renderItem: (item: T) => React.ReactNode;
  getItemKey: (item: T) => SelectionKey;
  getItemValue?: (item: T) => string;

  onSearchChange?: (searchText: string) => void;
  searchDebounceMs?: number;

  selectionMode?: "single" | "multiple";
  selectedKey?: SelectionKey | null;
  selectedKeys?: Set<SelectionKey>;
  onSelectionChange?: (key: SelectionKey | Set<SelectionKey> | null) => void;
  maxVisibleInBadge?: number;

  selectionIcon?: ReactNode;
  selectionLabel?: string;
  itemClassName?: string;

  emptyContent?: React.ReactNode;
  errorContent?: React.ReactNode;
  loadingContent?: React.ReactNode;
  fetchingMoreContent?: React.ReactNode;

  "aria-label"?: string;
  "aria-describedby"?: string;
}

export function InfiniteAutocomplete<T extends Record<string, unknown>>({
  items,
  isFetching,
  fetchNextPage,
  hasNextPage,
  isLoading,
  error,
  className = "max-w-xs",
  renderItem,
  getItemKey,
  getItemValue = (item: T): string =>
    String(renderItem(item)).replace(/<[^>]*>/g, ""),
  onSearchChange,
  searchDebounceMs = 300,
  selectionMode = "single",
  selectedKey,
  selectedKeys = new Set(),
  onSelectionChange,
  maxVisibleInBadge = 2,
  selectionIcon = null,
  selectionLabel = "sélectionné",
  itemClassName,
  emptyContent = "Aucun élément trouvé",
  errorContent,
  loadingContent = "Chargement des données...",
  fetchingMoreContent = "Chargement de plus d'éléments...",
  ...autocompleteProps
}: InfiniteSelectProps<T>): JSX.Element {
  const commonAutocompleteProps = {
    radius: "sm" as const,
    size: "md" as const,
    variant: "faded" as const,
    selectionMode: "multiple" as const,
    multiple: true,
    maxVisibleInBadge: 2,
    inputProps: {
      classNames: {
        inputWrapper: `border border-border bg-transparent data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparent data-[hover=true]:border-outline ${
          error ? "border-red-500" : ""
        }`,
      },
    },
  };

  // États
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [savedSelectedItems, setSavedSelectedItems] = useState<
    Map<SelectionKey, T>
  >(new Map());

  const lastSearchTermRef = useRef<string>("");
  const isMultiSelect = selectionMode === "multiple";

  const { debouncedValue: debouncedSearchTerm, cancel: cancelDebounce } =
    useDebouncedValue(inputValue, searchDebounceMs);

  const { scrollContainerRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen && !error,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  useEffect((): void => {
    if (onSearchChange && debouncedSearchTerm !== lastSearchTermRef.current) {
      lastSearchTermRef.current = debouncedSearchTerm;
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect((): void => {
    if (!isMultiSelect) {
      return;
    }

    setSavedSelectedItems((prev): Map<SelectionKey, T> => {
      const newSavedItems = new Map(prev);

      items.forEach((item): void => {
        const key = getItemKey(item);
        if (selectedKeys.has(key) && !newSavedItems.has(key)) {
          newSavedItems.set(key, item);
        }
      });

      Array.from(newSavedItems.keys()).forEach((key): void => {
        if (!selectedKeys.has(key)) {
          newSavedItems.delete(key);
        }
      });

      return newSavedItems;
    });
  }, [items, selectedKeys, getItemKey, isMultiSelect]);

  const selectedItems = useMemo((): T[] => {
    return isMultiSelect ? Array.from(savedSelectedItems.values()) : [];
  }, [savedSelectedItems, isMultiSelect]);

  const handleInputChange = useCallback(
    (value: string): void => {
      setInputValue(value);
      if (value === "" && onSearchChange) {
        cancelDebounce();
        lastSearchTermRef.current = "";
        onSearchChange("");
      }
    },
    [onSearchChange, cancelDebounce],
  );

  const handleSelectionChange = useCallback(
    (key: SelectionKey | null): void => {
      if (key === null || key === undefined) {
        if (!isMultiSelect) {
          onSelectionChange?.(null);
        }
        return;
      }

      if (!isMultiSelect) {
        onSelectionChange?.(key);
        setInputValue("");
        return;
      }

      const newSelectedKeys = new Set(selectedKeys);
      if (selectedKeys.has(key)) {
        newSelectedKeys.delete(key);
      } else {
        newSelectedKeys.add(key);
      }

      onSelectionChange?.(newSelectedKeys);
      setInputValue("");
    },
    [isMultiSelect, selectedKeys, onSelectionChange],
  );

  const handleRemoveChip = useCallback(
    (itemKey: SelectionKey): void => {
      if (!isMultiSelect) {
        return;
      }

      const newSelectedKeys = new Set(selectedKeys);
      newSelectedKeys.delete(itemKey);
      onSelectionChange?.(newSelectedKeys);
    },
    [selectedKeys, onSelectionChange, isMultiSelect],
  );

  const handleClearAll = useCallback((): void => {
    if (!isMultiSelect) {
      return;
    }

    onSelectionChange?.(new Set());
    setIsPopoverOpen(false);
  }, [onSelectionChange, isMultiSelect]);

  const handleOpenChange = useCallback(
    (open: boolean): void => {
      setIsOpen(open);
      autocompleteProps.onOpenChange?.(open);

      if (!open && inputValue) {
        setInputValue("");
        cancelDebounce();
        lastSearchTermRef.current = "";
        onSearchChange?.("");
      }
    },
    [autocompleteProps, inputValue, onSearchChange, cancelDebounce],
  );

  const isItemSelected = useCallback(
    (item: T): boolean => {
      return isMultiSelect && selectedKeys.has(getItemKey(item));
    },
    [isMultiSelect, selectedKeys, getItemKey],
  );

  const autocompleteItems = useMemo((): JSX.Element[] => {
    return items.map(
      (item): JSX.Element => (
        <AutocompleteItem
          key={getItemKey(item)}
          className={mergeTailwindClasses(
            "border border-border/10 transition-colors duration-200",
            isItemSelected(item) && "bg-default/50 border-primary/20",
            itemClassName,
          )}
          endContent={
            isItemSelected(item) ? (
              <span className="font-semibold text-success">✓</span>
            ) : undefined
          }
        >
          {renderItem(item)}
        </AutocompleteItem>
      ),
    );
  }, [items, getItemKey, isItemSelected, itemClassName, renderItem]);

  const selectionBadge = useCallback((): JSX.Element | null => {
    if (!isMultiSelect || selectedItems.length === 0) {
      return null;
    }

    if (selectedItems.length <= maxVisibleInBadge) {
      return (
        <div className="flex flex-wrap gap-2 bg-content1/90 py-2 dark:bg-background/90">
          {selectedItems.map((item): JSX.Element => {
            const itemKey = getItemKey(item);
            const itemValue = getItemValue(item);

            return (
              <div
                key={itemKey}
                className="group relative flex min-w-0 items-center rounded-md border border-primary/20 bg-content1/50 p-2 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
              >
                <span
                  className="flex-1 truncate text-xs font-medium text-foreground group-hover:text-primary"
                  title={itemValue}
                >
                  {itemValue}
                </span>

                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={(): void => handleRemoveChip(itemKey)}
                  className="ml-2 size-4 bg-danger/20 opacity-60 transition-all duration-200 hover:scale-110 hover:bg-danger/30 hover:opacity-100"
                  aria-label={`Supprimer ${itemValue}`}
                >
                  <IconXboxX size={12} />
                </Button>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="py-2">
        <Popover
          isOpen={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          placement="top-start"
          showArrow
          backdrop="transparent"
          classNames={{
            content: "border-0 bg-transparent shadow-none p-0",
          }}
        >
          <PopoverTrigger>
            <Badge
              content={selectedItems.length}
              color="primary"
              size="lg"
              className="cursor-pointer"
              classNames={{
                badge: "bg-primary text-white font-semibold min-w-5 h-5",
              }}
            >
              <Button
                variant="flat"
                size="sm"
                startContent={selectionIcon}
                className="h-9 border border-primary/20 bg-content1/90 px-4 text-xs font-medium text-primary backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:shadow-md"
                onPress={(): void => setIsPopoverOpen(!isPopoverOpen)}
                aria-label={`${selectedItems.length} ${selectionLabel}${selectedItems.length > 1 ? "s" : ""} sélectionné${selectedItems.length > 1 ? "s" : ""}`}
              >
                {selectedItems.length} {selectionLabel}
                {selectedItems.length > 1 ? "s" : ""}
              </Button>
            </Badge>
          </PopoverTrigger>

          <PopoverContent className="border border-border bg-gradient-to-b from-content1 to-content1 p-3 backdrop-blur-xl transition-all dark:from-background/90 dark:to-background/70">
            <div className="mb-4 flex w-full items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">
                Éléments {selectionLabel}s ({selectedItems.length})
              </h4>
              <Tooltip
                content="Tout supprimer"
                placement="top"
                delay={500}
                trigger={
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="danger"
                    onPress={handleClearAll}
                    className="size-8 bg-danger/10 transition-all duration-200 hover:scale-105 hover:bg-danger/20"
                    aria-label="Supprimer tous les éléments sélectionnés"
                  >
                    <IconTrash size={16} />
                  </Button>
                }
              />
            </div>

            <ScrollShadow className="max-h-80 w-80 overflow-x-hidden">
              <div className="grid w-full grid-cols-2 gap-2 pr-2">
                {selectedItems.map((item): JSX.Element => {
                  const itemKey = getItemKey(item);
                  const itemValue = getItemValue(item);

                  return (
                    <div
                      key={itemKey}
                      className="group relative flex min-w-0 items-center rounded-md border border-primary/20 bg-content1/50 p-2 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                    >
                      <span
                        className="flex-1 truncate text-xs font-medium text-foreground group-hover:text-primary"
                        title={itemValue}
                      >
                        {itemValue}
                      </span>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={(): void => handleRemoveChip(itemKey)}
                        className="ml-2 size-5 bg-danger/20 opacity-60 transition-all duration-200 hover:scale-110 hover:bg-danger/30 hover:opacity-100"
                        aria-label={`Supprimer ${itemValue}`}
                      >
                        <IconXboxX size={14} />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollShadow>
          </PopoverContent>
        </Popover>
      </div>
    );
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
    handleClearAll,
  ]);
  if (error && !isLoading) {
    return (
      <div className={cn("relative", className)}>
        {selectionBadge()}
        <Autocomplete
          className="w-full"
          isDisabled
          placeholder="Erreur de chargement"
          aria-label="Autocomplete en erreur"
          {...commonAutocompleteProps}
          {...autocompleteProps}
        >
          <AutocompleteItem key="error" isReadOnly className="text-danger">
            {errorContent ?? `Erreur: ${error.message}`}
          </AutocompleteItem>
        </Autocomplete>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div className={cn("relative", className)}>
        {selectionBadge()}
        <Autocomplete
          className="w-full"
          isLoading
          placeholder="Chargement..."
          aria-label="Autocomplete en chargement"
          {...autocompleteProps}
        >
          <AutocompleteItem
            key="loading"
            isReadOnly
            className="text-default-500"
          >
            {loadingContent}
          </AutocompleteItem>
        </Autocomplete>
      </div>
    );
  }

  return (
    <div className={cn("relative z-50", className)}>
      {selectionBadge()}

      <Autocomplete<T>
        className="w-full"
        inputProps={{
          classNames: {
            inputWrapper: cn(
              autocompleteProps.variant === "bordered" &&
                "border border-border",
              "transition-colors duration-200",
            ),
          },
          ...autocompleteProps.inputProps,
        }}
        isLoading={isFetching && items.length === 0}
        items={items}
        scrollRef={scrollContainerRef}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        selectedKey={isMultiSelect ? null : selectedKey}
        onSelectionChange={handleSelectionChange}
        onOpenChange={handleOpenChange}
        shouldCloseOnBlur={!isMultiSelect}
        allowsCustomValue={isMultiSelect}
        menuTrigger="focus"
        aria-label={
          autocompleteProps["aria-label"] || "Autocomplete avec scroll infini"
        }
        aria-describedby={
          isFetching
            ? "infinite-autocomplete-loading"
            : autocompleteProps["aria-describedby"]
        }
        {...autocompleteProps}
      >
        {items.length === 0 && !isLoading ? (
          <AutocompleteItem key="empty" isReadOnly className="text-default-500">
            {emptyContent}
          </AutocompleteItem>
        ) : (
          <>{autocompleteItems}</>
        )}

        {isFetching && items.length > 0 ? (
          <AutocompleteItem
            key="fetching-more"
            isReadOnly
            className="text-default-500"
          >
            {fetchingMoreContent}
          </AutocompleteItem>
        ) : null}
      </Autocomplete>
    </div>
  );
}

export type { InfiniteSelectProps };
