import { useInfiniteScroll } from "@/hooks";
import type { SelectProps } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import type { JSX } from "react";
import { useState, useMemo } from "react";
import { mergeTailwindClasses } from "@/utils";

interface ProcessedItem<T> {
  data: T;
  uniqueIndex: number;
}

interface BaseInfiniteSelectProps<T>
  extends Omit<SelectProps, "items" | "children"> {
  renderItem: (item: T) => React.ReactNode;
  getItemKey: (item: T, index?: number) => string | number;
  className?: string;
  classNames?: {
    base?: string;
    trigger?: string;
    value?: string;
    popoverContent?: string;
    selectItem?: string;
  };
}

interface FetchFunctionProps<T> extends BaseInfiniteSelectProps<T> {
  fetchFunction: (
    offset: number,
    limit: number,
  ) => Promise<{
    items: T[];
    hasMore: boolean;
  }>;
  fetchDelay?: number;
  limit?: number;

  items?: undefined;
  hasMore?: undefined;
  isLoadingMore?: undefined;
  onLoadMore?: undefined;
}

interface ExternalDataProps<T> extends BaseInfiniteSelectProps<T> {
  items: T[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;

  fetchFunction?: undefined;
  fetchDelay?: undefined;
  limit?: undefined;
}

type InfiniteSelectProps<T> = FetchFunctionProps<T> | ExternalDataProps<T>;

const defaultClassNames = {
  base: "max-w-xs",
  trigger:
    "h-10 bg-white dark:bg-background data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparant data-[hover=true]:border-outline",
  value: "text-small",
  popoverContent: "bg-white dark:bg-background",
  selectItem: "text-small",
} as const;

export function InfiniteSelect<T extends object>({
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
  selectionMode = "single",
  ...selectProps
}: InfiniteSelectProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const processedItems = useMemo<ProcessedItem<T>[]>(() => {
    if (!externalItems) {
      return [];
    }

    return externalItems.map((item, index) => ({
      data: item,
      uniqueIndex: index,
    }));
  }, [externalItems]);

  const { scrollContainerRef } = useInfiniteScroll({
    hasMore: !!externalHasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: externalLoadMore,
  });

  const mergedClassNames = {
    base: mergeTailwindClasses(defaultClassNames.base, classNames?.base),
    trigger: mergeTailwindClasses(
      defaultClassNames.trigger,
      classNames?.trigger,
    ),
    value: mergeTailwindClasses(defaultClassNames.value, classNames?.value),
    popoverContent: mergeTailwindClasses(
      defaultClassNames.popoverContent,
      classNames?.popoverContent,
    ),
  };

  const rootClassName = mergeTailwindClasses(mergedClassNames.base, className);

  const selectItemClassName = mergeTailwindClasses(
    defaultClassNames.selectItem,
    classNames?.selectItem,
  );

  return (
    <Select
      className={rootClassName}
      classNames={mergedClassNames}
      isLoading={!!externalIsLoading}
      items={processedItems}
      scrollRef={scrollContainerRef}
      selectionMode={selectionMode}
      onOpenChange={(open): void => {
        setIsOpen(open);
        selectProps.onOpenChange?.(open);
      }}
      {...selectProps}
    >
      {(wrapper: ProcessedItem<T>): JSX.Element => (
        <SelectItem
          key={`${getItemKey(wrapper.data)}-${wrapper.uniqueIndex}`}
          textValue={String(getItemKey(wrapper.data))}
          className={selectItemClassName}
        >
          {renderItem(wrapper.data)}
        </SelectItem>
      )}
    </Select>
  );
}
