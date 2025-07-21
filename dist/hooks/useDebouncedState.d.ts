import { SetStateAction } from 'react';
export declare const useDebouncedState: <T>(defaultValue: T, wait: number, options?: {
    leading: boolean;
}) => readonly [T, (newValue: SetStateAction<T>) => void];
