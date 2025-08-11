import { User } from '../../models/User';
export declare const filterUsersBySearch: (users: User[], searchQuery: string) => User[];
export declare const deduplicateUsers: (users: User[]) => User[];
export declare const processUserGroup: (users: User[], searchQuery: string) => User[];
export declare const getCellSize: (viewMode: string) => {
    readonly height: "h-8";
    readonly width: "min-w-[40px]";
} | {
    readonly height: "h-8";
    readonly width: "min-w-[168px]";
} | {
    readonly height: "h-6";
    readonly width: "min-w-[38px]";
} | {
    readonly height: "h-5";
    readonly width: "min-w-[19px]";
} | {
    readonly height: "h-6";
    readonly width: "min-w-[20px]";
};
export declare const PLANNING_CONSTANTS: {
    readonly SIDEBAR_WIDTH: "w-[240px]";
    readonly HEADER_HEIGHT: "h-28";
    readonly GROUP_SEPARATOR_HEIGHT: "h-[30px]";
    readonly USER_ROW_HEIGHT: "h-8";
};
