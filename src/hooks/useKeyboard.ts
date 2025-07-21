import { useEffect, useRef, useCallback } from "react";

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
 * Normalize key combination string
 */
const normalizeKeys = (keys: string): string => {
  return keys
    .toLowerCase()
    .split('+')
    .map(key => key.trim())
    .sort()
    .join('+');
};

/**
 * Check if keyboard event matches key combination
 */
const matchesKeys = (event: KeyboardEvent, keys: string): boolean => {
  const eventKeys: string[] = [];

  // Add modifier keys
  if (event.ctrlKey || event.metaKey) {
    eventKeys.push(event.metaKey ? 'cmd' : 'ctrl');
  }
  if (event.altKey) { eventKeys.push('alt'); }
  if (event.shiftKey) { eventKeys.push('shift'); }

  // Add main key
  const key = event.key.toLowerCase();
  if (!['control', 'alt', 'shift', 'meta'].includes(key)) {
    eventKeys.push(key);
  }

  const eventKeyString = eventKeys.sort().join('+');
  const targetKeyString = normalizeKeys(keys);

  return eventKeyString === targetKeyString;
};

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
export const useKeyboard = (
  options: UseKeyboardOptions = {},
): UseKeyboardReturn => {
  const {
    target = typeof document !== 'undefined' ? document : null,
    eventType = 'keydown',
    enabled = true,
  } = options;

  const shortcutsRef = useRef<Map<string, KeyboardShortcut>>(new Map());

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    if (!enabled) { return; }

    for (const [keys, shortcut] of shortcutsRef.current.entries()) {
      if (shortcut.enabled === false) { continue; }

      if (matchesKeys(event, keys)) {
        if (shortcut.preventDefault) {
          event.preventDefault();
        }
        if (shortcut.stopPropagation) {
          event.stopPropagation();
        }

        shortcut.handler(event);
        break; // Only execute first matching shortcut
      }
    }
  }, [enabled]);

  // Set up event listener
  useEffect(() => {
    if (!target || !enabled) { return; }

    const element = target as EventTarget;
    element.addEventListener(eventType, handleKeyEvent as EventListener);

    return () => {

      element.removeEventListener(eventType, handleKeyEvent as EventListener);
    };
  }, [target, eventType, enabled, handleKeyEvent]);

  const addShortcut = useCallback((shortcut: KeyboardShortcut) => {
    const normalizedKeys = normalizeKeys(shortcut.keys);
    shortcutsRef.current.set(normalizedKeys, {
      ...shortcut,
      enabled: shortcut.enabled ?? true,
    });

    // Return cleanup function
    return () => {
      shortcutsRef.current.delete(normalizedKeys);
    };
  }, []);

  const removeShortcut = useCallback((keys: string) => {
    const normalizedKeys = normalizeKeys(keys);
    shortcutsRef.current.delete(normalizedKeys);
  }, []);

  const getShortcuts = useCallback((): KeyboardShortcut[] => {
    return Array.from(shortcutsRef.current.values());
  }, []);

  const clearShortcuts = useCallback(() => {
    shortcutsRef.current.clear();
  }, []);

  return {
    addShortcut,
    removeShortcut,
    getShortcuts,
    clearShortcuts,
  };
};