import { Meta, StoryObj } from '@storybook/react-vite';
declare const IntroductionComponent: () => import("react/jsx-runtime").JSX.Element;
declare const meta: Meta<typeof IntroductionComponent>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
