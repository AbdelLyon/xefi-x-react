export interface UseStateHistoryHandlers<T> {
    set: (value: T) => void;
    back: (steps?: number) => void;
    forward: (steps?: number) => void;
    reset: () => void;
}
export interface StateHistory<T> {
    history: T[];
    current: number;
}
export interface UseStateHistoryReturn<T> {
    value: T;
    handlers: UseStateHistoryHandlers<T>;
    state: StateHistory<T>;
}
export declare const useStateHistory: <T>(initialValue: T) => UseStateHistoryReturn<T>;
