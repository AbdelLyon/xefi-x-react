import { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
declare const meta: Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const RadiusComparison: Story;
export declare const ModernShowcase: Story;
export declare const LoadingStates: Story;
