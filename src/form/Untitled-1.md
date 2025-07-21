import { useInfiniteScroll } from "@/hooks";
import type { AutocompleteProps } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import type { JSX } from "react";
import { useState, useMemo } from "react";
import { mergeTailwindClasses } from "@/utils";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

interface ProcessedItem<T extends object> {
data: T;
uniqueIndex: number;
}

interface BaseInfiniteAutocompleteProps<T extends object>
extends Omit<
AutocompleteProps<ProcessedItem<T>>,
"items" | "children" | "onInputChange"

> {
> renderItem: (item: T) => React.ReactNode;
> getItemKey: (item: T, index?: number) => string | number;
> className?: string;
> classNames?: {

    base?: string;
    trigger?: string;
    listbox?: string;
    value?: string;
    popoverContent?: string;
    autocompleteItem?: string;

};
debounceDelay?: number;
onSearchChange?: (value: string) => void;
}

interface FetchFunctionProps<T extends object>
extends BaseInfiniteAutocompleteProps<T> {
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

interface ExternalDataProps<T extends object>
extends BaseInfiniteAutocompleteProps<T> {
items: T[];
hasMore?: boolean;
isLoadingMore?: boolean;
onLoadMore?: () => void;

fetchFunction?: undefined;
fetchDelay?: undefined;
limit?: undefined;
}

type InfiniteAutocompleteProps<T extends object> =
| FetchFunctionProps<T>
| ExternalDataProps<T>;

const defaultClassNames = {
base: "max-w-xs",
trigger:
"border border-border bg-transparant data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparant data-[hover=true]:border-outline",
listbox: "data-[focus=true]:outline-0",
value: "text-small",
popoverContent: "bg-white dark:bg-background",
autocompleteItem: "text-small",
} as const;

export function InfiniteAutocomplete<T extends object>({
fetchFunction: \_fetchFunction,
fetchDelay: \_fetchDelay = 0,
limit: \_limit = 10,

items: externalItems,
hasMore: externalHasMore,
isLoadingMore: externalIsLoading,
onLoadMore: externalLoadMore,

className,
classNames,
renderItem,
getItemKey,
debounceDelay = 300,
onSearchChange,
...autocompleteProps
}: InfiniteAutocompleteProps<T>): JSX.Element {
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState<string>("");

const debouncedSearchChange = useDebouncedCallback((...args: unknown[]) => {
if (onSearchChange) {
onSearchChange(args[0] as string);
}
}, debounceDelay);

const processedItems = useMemo<ProcessedItem<T>[]>(() => {
if (!externalItems) {
return [];
}

    return externalItems.map((item, index) => ({
      data: item,
      uniqueIndex: index,
    }));

}, [externalItems]);

const [, scrollerRef] = useInfiniteScroll({
hasMore: !!externalHasMore,
isEnabled: isOpen,
shouldUseLoader: false,
onLoadMore: externalLoadMore,
});

const mergedClassNames = {
base: mergeTailwindClasses(defaultClassNames.base, classNames?.base),
inputWrapper: mergeTailwindClasses(
defaultClassNames.trigger,
classNames?.trigger,
),
listbox: mergeTailwindClasses(
defaultClassNames.listbox,
classNames?.listbox,
),
value: mergeTailwindClasses(defaultClassNames.value, classNames?.value),
popoverContent: mergeTailwindClasses(
defaultClassNames.popoverContent,
classNames?.popoverContent,
),
};

const rootClassName = mergeTailwindClasses(mergedClassNames.base, className);

const autocompleteItemClassName = mergeTailwindClasses(
defaultClassNames.autocompleteItem,
classNames?.autocompleteItem,
);

const handleInputChange = (value: string) => {
setInputValue(value);
debouncedSearchChange(value);
};

return (
<Autocomplete
className={rootClassName}
classNames={mergedClassNames}
isLoading={!!externalIsLoading}
items={processedItems}
scrollRef={scrollerRef}
inputValue={inputValue}
onInputChange={handleInputChange}
onOpenChange={(open): void => {
setIsOpen(open);
autocompleteProps.onOpenChange?.(open);
}}
{...autocompleteProps} >
{(wrapper: ProcessedItem<T>): JSX.Element => (
<AutocompleteItem
key={`${getItemKey(wrapper.data)}-${wrapper.uniqueIndex}`}
textValue={String(getItemKey(wrapper.data))}
className={autocompleteItemClassName} >
{renderItem(wrapper.data)}
</AutocompleteItem>
)}
</Autocomplete>
);
}
