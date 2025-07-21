import { DatePickerProps as DatePickerRootProps, DateRangePickerProps as DateRangePickerRootProps, RangeValue } from '@heroui/react';
type BaseProps = {
    variant?: "bordered" | "flat" | "faded" | "underlined";
    color?: string;
    size?: string;
    radius?: string;
    labelPlacement?: string;
    fullWidth?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
};
type DatePickerProps = DatePickerRootProps & BaseProps & {
    customValidation?: (value: Date | null) => boolean | string;
};
type DateRangePickerProps = DateRangePickerRootProps & BaseProps;
export declare const DatePicker: import('react').ForwardRefExoticComponent<Omit<DatePickerProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export declare const DateRangePicker: import('react').ForwardRefExoticComponent<Omit<DateRangePickerProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export type { RangeValue };
