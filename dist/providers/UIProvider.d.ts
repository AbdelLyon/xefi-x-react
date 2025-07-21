import { HeroUIProviderProps as ProviderProps } from '@heroui/react';
import { JSX, ReactNode } from 'react';
type AppProviderProps = {
    children: ReactNode;
} & ProviderProps;
export declare const UIProvider: (props: AppProviderProps) => JSX.Element;
export {};
