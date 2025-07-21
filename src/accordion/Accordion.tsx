import type { JSX } from "react";
import { forwardRef } from "react";
import { mergeTailwindClasses } from "@/utils";
import type { AccordionProps as HeroUIAccordionProps } from "@heroui/react";
import { Accordion as AccordionRoot, AccordionItem } from "@heroui/react";
import {
  getAccordionVariantClasses,
  getAccordionSizeClasses,
  type AccordionItemConfig,
  validateAccordionItem,
} from "./accordionConfig";

/**
 * Enhanced accordion item interface with better typing
 */
export interface EnhancedAccordionItemProps {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  subtitle?: React.ReactNode;
  startContent?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  textValue?: string;
}

/**
 * Accordion component class names interface
 */
interface AccordionClassNames {
  base?: string;
  item?: string;
  itemTitle?: string;
  itemContent?: string;
  itemIndicator?: string;
}

/**
 * Enhanced Accordion props interface
 */
interface EnhancedAccordionProps
  extends Omit<HeroUIAccordionProps, "children" | "classNames"> {
  /** Array of accordion items */
  items: AccordionItemConfig[];
  /** Custom class names for different parts */
  classNames?: AccordionClassNames;
  /** Validation mode for development */
  validateItems?: boolean;
  /** Custom size (sm, md, lg) */
  size?: "sm" | "md" | "lg";
  /** Custom variant */
  variant?: "light" | "shadow" | "bordered" | "splitted";
}

/**
 * Enhanced Accordion component built on top of HeroUI Accordion
 * Provides professional styling, validation, and modular configuration
 *
 * @example
 * ```tsx
 * const items = [
 *   { key: "1", title: "What is this?", content: "This is an accordion item" },
 *   { key: "2", title: "How to use?", content: "Use it like this..." }
 * ];
 *
 * <Accordion
 *   items={items}
 *   variant="bordered"
 *   size="md"
 *   selectionMode="multiple"
 * />
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, EnhancedAccordionProps>(
  (
    {
      items,
      classNames,
      validateItems = process.env.NODE_ENV !== "production",
      size = "md",
      variant = "light",
      ...accordionProps
    },
    ref,
  ): JSX.Element => {
    // Validate items in development mode
    if (validateItems) {
      items.forEach((item, index) => {
        const validation = validateAccordionItem(item);
        if (!validation.valid) {
          console.warn(
            `[Accordion] Item at index ${index} has validation errors:`,
            validation.errors,
          );
        }
      });
    }

    // Get class configurations based on props
    const variantClasses = getAccordionVariantClasses(variant);
    const sizeClasses = getAccordionSizeClasses(size);

    // Merge all class configurations
    const mergedClasses = {
      base: mergeTailwindClasses(
        "rounded-md",
        variantClasses.base || "",
        classNames?.base,
      ),
      item: mergeTailwindClasses(
        "w-full shadow-none",
        variantClasses.item || "",
        classNames?.item,
      ),
      itemTitle: mergeTailwindClasses(
        "text-lg font-semibold",
        sizeClasses.itemTitle || "",
        classNames?.itemTitle,
      ),
      itemContent: mergeTailwindClasses(
        "text-sm",
        sizeClasses.itemContent || "",
        classNames?.itemContent,
      ),
      itemIndicator: mergeTailwindClasses(
        "",
        classNames?.itemIndicator,
      ),
    };

    // Create final props with defaults
    const finalProps = {
      variant,
      size,
      ...accordionProps,
    };

    return (
      <AccordionRoot
        ref={ref}
        {...finalProps}
        className={mergeTailwindClasses(
          mergedClasses.base,
          accordionProps.className,
        )}
        itemClasses={{
          base: mergedClasses.item,
          title: mergedClasses.itemTitle,
          content: mergedClasses.itemContent,
          indicator: mergedClasses.itemIndicator,
        }}
      >
        {items.map((item): JSX.Element => {
          const { key, title, content, ...itemProps } = item;
          return (
            <AccordionItem key={key} title={title} {...itemProps}>
              {content}
            </AccordionItem>
          );
        })}
      </AccordionRoot>
    )
  }
)

Accordion.displayName = "Accordion";
