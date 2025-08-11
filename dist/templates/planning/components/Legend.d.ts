import { LegendConfig } from '../types/planning.types';
interface LegendProps {
    config: LegendConfig;
    className?: string;
    position?: "bottom" | "top" | "left" | "right";
    compact?: boolean;
}
export declare const Legend: React.FC<LegendProps>;
export {};
