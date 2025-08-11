import { Group } from '../../../models/User';
interface PlanningSidebarProps {
    isFetchingNextPage: boolean;
    handleLoadMore: () => void;
    hasNextPage: boolean;
    isLoading?: boolean;
    currentGroups: Group[];
}
export declare const PlanningSidebar: React.FC<PlanningSidebarProps>;
export {};
