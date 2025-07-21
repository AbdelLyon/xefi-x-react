import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Configuration for localStorage hook
 */
export interface UseLocalStorageOptions<T> {
  /** Serializer function */
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  };
  /** Error handler for storage operations */
  onError?: (error: Error, operation: 'read' | 'write' | 'remove') => void;
  /** Sync across tabs/windows */
  syncAcrossTabs?: boolean;
}

/**
 * Return type for useLocalStorage hook
 */
export interface UseLocalStorageReturn<T> {
  /** Current stored value */
  value: T;
  /** Set new value */
  setValue: (value: T | ((prevValue: T) => T)) => void;
  /** Remove value from storage */
  removeValue: () => void;
  /** Check if value exists in storage */
  hasValue: boolean;
  /** Loading state for initial value */
  loading: boolean;
  /** Last error encountered */
  error: Error | null;
}

const defaultSerializer = {
  read: <T>(value: string): T => {
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  },
  write: <T>(value: T): string => {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  },
};

/**
 * Enhanced localStorage hook with error handling and cross-tab sync
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { value, setValue } = useLocalStorage('user-preferences', {
 *   theme: 'light',
 *   language: 'en'
 * })
 * 
 * // With custom serializer
 * const { value, setValue } = useLocalStorage('counter', 0, {
 *   serializer: {
 *     read: (v) => parseInt(v, 10),
 *     write: (v) => v.toString()
 *   }
 * })
 * ```
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {},
): UseLocalStorageReturn<T> => {
  const {
    serializer = defaultSerializer,
    onError,
    syncAcrossTabs = true,
  } = options;

  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasValue, setHasValue] = useState(false);

  // Refs to avoid stale closure issues
  const keyRef = useRef(key);
  const defaultValueRef = useRef(defaultValue);
  const serializerRef = useRef(serializer);

  // Update refs when dependencies change
  useEffect(() => {
    keyRef.current = key;
    defaultValueRef.current = defaultValue;
    serializerRef.current = serializer;
  }, [key, defaultValue, serializer]);

  // Read from localStorage
  const readFromStorage = useCallback((): T => {
    if (typeof window === 'undefined') {
      return defaultValueRef.current;
    }

    try {
      const item = window.localStorage.getItem(keyRef.current);
      if (item === null) {
        setHasValue(false);
        return defaultValueRef.current;
      }
      
      setHasValue(true);
      return serializerRef.current.read(item);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to read from localStorage');
      setError(error);
      onError?.(error, 'read');
      setHasValue(false);
      return defaultValueRef.current;
    }
  }, [onError]);

  // Write to localStorage
  const writeToStorage = useCallback((newValue: T) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const serializedValue = serializerRef.current.write(newValue);
      window.localStorage.setItem(keyRef.current, serializedValue);
      setHasValue(true);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to write to localStorage');
      setError(error);
      onError?.(error, 'write');
    }
  }, [onError]);

  // Initialize value from localStorage
  useEffect(() => {
    const storedValue = readFromStorage();
    setValue(storedValue);
    setLoading(false);
  }, [readFromStorage]);

  // Set value function
  const setStoredValue = useCallback((newValue: T | ((prevValue: T) => T)) => {
    setValue(currentValue => {
      const valueToStore = typeof newValue === 'function' 
        ? (newValue as (prevValue: T) => T)(currentValue)
        : newValue;
      
      writeToStorage(valueToStore);
      return valueToStore;
    });
  }, [writeToStorage]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.removeItem(keyRef.current);
      setValue(defaultValueRef.current);
      setHasValue(false);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to remove from localStorage');
      setError(error);
      onError?.(error, 'remove');
    }
  }, [onError]);

  // Listen for storage changes across tabs
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === keyRef.current) {
        if (event.newValue === null) {
          setValue(defaultValueRef.current);
          setHasValue(false);
        } else {
          try {
            const newValue = serializerRef.current.read(event.newValue);
            setValue(newValue);
            setHasValue(true);
            setError(null);
          } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to parse storage event');
            setError(error);
            onError?.(error, 'read');
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [onError, syncAcrossTabs]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    hasValue,
    loading,
    error,
  };
};