export declare const useSearchState: () => {
    searchTerms: {
        siteSearch: string;
        teamSearch: string;
        userSearch: string;
        tagsWithUsersSearch: string;
    };
    searchHandlers: {
        handleSiteSearchChange: (search?: string) => void;
        handleTeamSearchChange: (search?: string) => void;
        handleUserSearchChange: (search?: string) => void;
        handleTagsWithUsersSearchChange: (search: string) => void;
    };
    resetSearchTerms: () => void;
};
