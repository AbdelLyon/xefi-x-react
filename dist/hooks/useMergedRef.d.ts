import { Ref } from 'react';
type PossibleRef<T> = Ref<T> | undefined;
export type MergedRefCallback<T> = (node: T | null) => void;
export declare const useMergedRef: <T>(...refs: PossibleRef<T>[]) => MergedRefCallback<T>;
export {};
