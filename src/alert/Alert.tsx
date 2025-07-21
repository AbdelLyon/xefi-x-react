import type { JSX, ReactNode } from "react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import type { ButtonProps, AlertProps as HeroUIAlertProps } from "@heroui/react";
import { Alert as HeroUIAlert } from "@heroui/react";
import { mergeTailwindClasses } from "@/utils";
import type { BaseComponentProps, Color } from "@/types";

/**
 * Enhanced Alert props extending HeroUI Alert
 */
export interface AlertProps 
  extends Omit<HeroUIAlertProps, "color" | "onClose">,
    BaseComponentProps {
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
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      onVisibleChange,
      onClose,
      isVisible = true,
      isClosable = false,
      autoCloseDelay,
      icon,
      actions,
      dismissOnEscape = true,
      color = "default",
      classNames,
      className,
      children,
      ...props
    },
    ref,
  ): JSX.Element | null => {
    const [internalVisible, setInternalVisible] = useState(isVisible);

    const handleClose = useCallback((): void => {
      setInternalVisible(false);
      onClose?.();
      onVisibleChange?.(false);
    }, [onClose, onVisibleChange]);

    const handleVisibilityChange = (visible: boolean): void => {
      setInternalVisible(visible);
      onVisibleChange?.(visible);
    };

    // Handle visibility changes
    useEffect(() => {
      setInternalVisible(isVisible);
    }, [isVisible]);

    // Auto-dismiss functionality
    useEffect(() => {
      if (!autoCloseDelay || !internalVisible) {return;}

      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }, [autoCloseDelay, internalVisible, handleClose]);

    // Escape key handling
    useEffect(() => {
      if (!dismissOnEscape || !internalVisible || !isClosable) {return;}

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [dismissOnEscape, internalVisible, isClosable, handleClose]);

    if (!internalVisible) {
      return null;
    }

    return (
      <HeroUIAlert
        ref={ref}
        color={color}
        isClosable={isClosable}
        onVisibleChange={handleVisibilityChange}
        onClose={handleClose}
        startContent={icon}
        endContent={actions}
        className={mergeTailwindClasses(
          // Custom transitions for auto-dismiss
          autoCloseDelay && "transition-all duration-300 ease-in-out",
          className
        )}
        classNames={{
          base: mergeTailwindClasses(classNames?.base),
          mainWrapper: mergeTailwindClasses(classNames?.mainWrapper),
          description: mergeTailwindClasses(classNames?.description),
          iconWrapper: mergeTailwindClasses(classNames?.iconWrapper)
        }}
        {...props}
      >
        {children}
        {actions && (
          <div className={mergeTailwindClasses(
            "mt-3 flex items-center gap-2",
            classNames?.actionsWrapper
          )}>
            {actions}
          </div>
        )}
      </HeroUIAlert>
    );
  },
);

Alert.displayName = "Alert";