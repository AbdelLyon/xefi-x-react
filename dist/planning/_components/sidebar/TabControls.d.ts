import { default as React } from 'react';
interface TabControlsProps {
    selectedTab: "sites" | "équipes";
    onTabChange: (key: string) => void;
    showBalances: boolean;
    onToggleBalances: () => void;
}
export declare const TabControls: React.FC<TabControlsProps>;
export {};
