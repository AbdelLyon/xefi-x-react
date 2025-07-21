import { AccordionItemProps, AccordionProps } from '@heroui/react';
export interface ExtendedAccordionItemProps extends Omit<AccordionItemProps, "content"> {
    content?: React.ReactNode;
}
interface AccordionWrapperProps extends Omit<AccordionProps, "children"> {
    items: ExtendedAccordionItemProps[];
    itemClasses?: {
        base?: string;
        title?: string;
        [key: string]: string | undefined;
    };
}
export declare const Accordion: import('react').ForwardRefExoticComponent<Omit<AccordionWrapperProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export {};
