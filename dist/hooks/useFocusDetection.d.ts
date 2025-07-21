export interface UseFocusDetectionOptions {
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
}
export declare const useFocusDetection: <T extends HTMLElement>({ onBlur, onFocus, }?: UseFocusDetectionOptions) => {
    ref: React.RefObject<T>;
    focused: boolean;
};
