import { AccordionProps as HeroUIAccordionProps } from '@heroui/react';
import { AccordionItemConfig } from './accordionConfig';
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
interface EnhancedAccordionProps extends Omit<HeroUIAccordionProps, "children" | "classNames"> {
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
export declare const Accordion: import('react').ForwardRefExoticComponent<Omit<EnhancedAccordionProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
