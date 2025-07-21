/**
 * Keyboard event handler
 */
export type KeyboardHandler = (event: KeyboardEvent) => void;
/**
 * Keyboard shortcuts configuration
 */
export interface KeyboardShortcut {
    /** Key combination (e.g., 'ctrl+s', 'cmd+k', 'escape') */
    keys: string;
    /** Handler function */
    handler: KeyboardHandler;
    /** Description for accessibility/documentation */
    description?: string;
    /** Whether to prevent default behavior */
    preventDefault?: boolean;
    /** Whether to stop propagation */
    stopPropagation?: boolean;
    /** Whether the shortcut is enabled */
    enabled?: boolean;
}
/**
 * Options for useKeyboard hook
 */
export interface UseKeyboardOptions {
    /** Target element (defaults to document) */
    target?: HTMLElement | Document | Window | null;
    /** Event type to listen to */
    eventType?: 'keydown' | 'keyup' | 'keypress';
    /** Whether shortcuts are globally enabled */
    enabled?: boolean;
}
/**
 * Return type for useKeyboard hook
 */
export interface UseKeyboardReturn {
    /** Register a keyboard shortcut */
    addShortcut: (shortcut: KeyboardShortcut) => () => void;
    /** Remove a keyboard shortcut */
    removeShortcut: (keys: string) => void;
    /** Get all registered shortcuts */
    getShortcuts: () => KeyboardShortcut[];
    /** Clear all shortcuts */
    clearShortcuts: () => void;
}
/**
 * Enhanced keyboard event handling with shortcut management
 *
 * @example
 * ```tsx
 * const { addShortcut, removeShortcut } = useKeyboard();
 *
 * useEffect(() => {
 *   // Add shortcuts
 *   const unsubscribeSave = addShortcut({
 *     keys: 'ctrl+s',
 *     handler: () => save(),
 *     description: 'Save document',
 *     preventDefault: true
 *   });
 *
 *   const unsubscribeSearch = addShortcut({
 *     keys: 'cmd+k',
 *     handler: () => openSearch(),
 *     description: 'Open search'
 *   });
 *
 *   return () => {
 *     unsubscribeSave();
 *     unsubscribeSearch();
 *   };
 * }, []);
 * ```
 */
export declare const useKeyboard: (options?: UseKeyboardOptions) => UseKeyboardReturn;
