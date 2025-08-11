export declare const useSelectionState: () => {
    selections: {
        selectedSite: string;
        selectedTeam: string;
        selectedUser: string;
    };
    selectionSetters: {
        setSelectedSite: import('react').Dispatch<import('react').SetStateAction<string>>;
        setSelectedTeam: import('react').Dispatch<import('react').SetStateAction<string>>;
        setSelectedUser: import('react').Dispatch<import('react').SetStateAction<string>>;
    };
    resetSelections: () => void;
};
