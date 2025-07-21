import { ReactNode } from 'react';
import { SliderProps } from '@heroui/react';
interface FormatConfig {
    formatOptions?: Intl.NumberFormatOptions;
    formatValue?: (value: number[]) => string;
    renderLabel?: (value: number[]) => ReactNode;
}
interface StyleProps {
    containerClassName?: string;
    labelClassName?: string;
}
interface RangeSliderProps extends FormatConfig, StyleProps {
    sliderProps?: Omit<SliderProps, "value" | "onChange">;
    initialValue?: number[];
    label?: string;
    labelPosition?: "top" | "bottom" | "none";
    onChange?: (value: number[]) => void;
}
export declare const RangeSlider: import('react').ForwardRefExoticComponent<RangeSliderProps & import('react').RefAttributes<HTMLDivElement>>;
export {};
