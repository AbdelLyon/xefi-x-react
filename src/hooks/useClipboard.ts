import { useCallback, useState } from "react";

/**
 * Configuration options for useClipboard hook
 */
export interface UseClipboardOptions {
  /** Timeout in milliseconds for resetting copied state */
  timeout?: number;
  /** Callback when copy succeeds */
  onCopy?: (text: string) => void;
  /** Callback when copy fails */
  onError?: (error: Error) => void;
}

/**
 * Return type for useClipboard hook
 */
export interface UseClipboardReturn {
  /** Current clipboard value */
  value: string;
  /** Whether the text was recently copied */
  copied: boolean;
  /** Copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Reset the copied state */
  reset: () => void;
  /** Whether clipboard API is supported */
  isSupported: boolean;
}

/**
 * Check if clipboard API is supported
 */
const isClipboardSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'clipboard' in navigator &&
    'writeText' in navigator.clipboard
  );
};

/**
 * Fallback function for older browsers
 */
const fallbackCopy = (text: string): boolean => {
  if (typeof document === 'undefined') { return false; }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  textArea.setAttribute('readonly', '');

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    document.body.removeChild(textArea);
    return false;
  }
};

/**
 * Hook for copying text to clipboard with state management
 * 
 * @example
 * ```tsx
 * const { copy, copied, isSupported } = useClipboard({
 *   timeout: 2000,
 *   onCopy: (text) => console.log('Copied:', text),
 *   onError: (err) => console.error('Copy failed:', err)
 * })
 * 
 * const handleCopy = () => {
 *   copy('Hello, world!')
 * }
 * 
 * return (
 *   <button onClick={handleCopy} disabled={!isSupported}>
 *     {copied ? 'Copied!' : 'Copy'}
 *   </button>
 * )
 * ```
 */
export const useClipboard = (
  options: UseClipboardOptions = {},
): UseClipboardReturn => {
  const { timeout = 2000, onCopy, onError } = options;

  const [value, setValue] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const isSupported = isClipboardSupported();

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (typeof text !== 'string') {
      const error = new Error('Text must be a string');
      onError?.(error);
      return false;
    }

    setValue(text);

    try {
      // Try modern clipboard API first
      if (isSupported) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const success = fallbackCopy(text);
        if (!success) {
          throw new Error('Fallback copy method failed');
        }
      }

      setCopied(true);
      onCopy?.(text);

      // Reset copied state after timeout
      setTimeout(() => {
        setCopied(false);
      }, timeout);

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Copy failed');
      onError?.(error);
      return false;
    }
  }, [isSupported, onCopy, onError, timeout]);

  const reset = useCallback(() => {
    setValue('');
    setCopied(false);
  }, []);

  return {
    value,
    copied,
    copy,
    reset,
    isSupported,
  };
};