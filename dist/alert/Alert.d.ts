import { ReactNode } from 'react';
import { ButtonProps, AlertProps as HeroUIAlertProps } from '@heroui/react';
import { BaseComponentProps, Color } from '../types';
/**
 * Enhanced Alert props extending HeroUI Alert
 */
export interface AlertProps extends Omit<HeroUIAlertProps, "color" | "onClose">, BaseComponentProps {
    /** Alert color theme */
    color?: Color;
    /** Close button properties */
    closeButtonProps?: ButtonProps;
    /** Callback when visibility changes */
    onVisibleChange?: (isVisible: boolean) => void;
    /** Callback when alert is closed */
    onClose?: () => void;
    /** Auto-dismiss after specified milliseconds */
    autoCloseDelay?: number;
    /** Custom icon for the alert */
    icon?: ReactNode;
    /** Alert actions (buttons, links, etc.) */
    actions?: ReactNode;
    /** Whether alert can be dismissed with Escape key */
    dismissOnEscape?: boolean;
    /** Custom styling for different parts */
    classNames?: {
        base?: string;
        mainWrapper?: string;
        description?: string;
        iconWrapper?: string;
        actionsWrapper?: string;
    };
}
/**
 * Enhanced Alert component built on top of HeroUI Alert
 * Provides auto-dismiss, custom actions, and keyboard navigation
 *
 * @example
 * ```tsx
 * // Basic alert
 * <Alert color="success" title="Success!">
 *   Your changes have been saved.
 * </Alert>
 *
 * // Alert with actions
 * <Alert
 *   color="warning"
 *   title="Confirm Action"
 *   actions={
 *     <div className="flex gap-2">
 *       <Button size="sm">Confirm</Button>
 *       <Button size="sm" variant="light">Cancel</Button>
 *     </div>
 *   }
 * >
 *   This action cannot be undone.
 * </Alert>
 *
 * // Auto-dismiss alert
 * <Alert
 *   color="info"
 *   autoCloseDelay={5000}
 *   onClose={() => console.log('Alert closed')}
 * >
 *   This will disappear in 5 seconds.
 * </Alert>
 * ```
 */
export declare const Alert: import('react').ForwardRefExoticComponent<Omit<AlertProps, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
