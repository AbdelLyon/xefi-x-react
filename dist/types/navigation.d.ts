import { Color, LinkColor } from './types';
export type Item = {
    key: string;
    label?: string;
    onPress?: () => void;
    isActive?: boolean;
    href?: string;
    linkColor?: LinkColor;
    buttonColor?: Color;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
};
