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
export declare const useClipboard: (options?: UseClipboardOptions) => UseClipboardReturn;
