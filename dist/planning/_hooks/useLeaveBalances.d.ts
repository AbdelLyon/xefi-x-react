export declare const useLeaveBalances: () => {
    getLeaveBalance: (userId: number, isLastYear: boolean) => number;
    getLeavesTaken: (userId: number) => number;
};
