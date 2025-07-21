import { useState, useCallback, useEffect } from "react";

interface StorageProperties<T> {
  key: string;
  defaultValue: T;
}

function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export const useLocalStorage = <T>(
  props: StorageProperties<T>,
): readonly [T, (value: T | ((val: T) => T)) => void, () => void] => {
  const { key, defaultValue } = props;

  const [storedValue, setStoredValue] = useState<T>(
    (): T => getStorageValue(key, defaultValue),
  );

  const setValue = useCallback(
    (value: T | ((val: T) => T)): void => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  const removeValue = (): void => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(defaultValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Synchroniser avec les autres onglets/fenêtres
  useEffect((): (() => void) => {
    const handleStorageChange = (event: StorageEvent): void => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch {
          setStoredValue(defaultValue);
        }
      } else if (event.key === key) {
        setStoredValue(defaultValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return (): void =>
      window.removeEventListener("storage", handleStorageChange);
  }, [key, defaultValue]);

  return [storedValue, setValue, removeValue] as const;
};
