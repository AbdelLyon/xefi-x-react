import { useCallback, useState } from "react";

export const useSearchState = () => {
  const [siteSearch, setSiteSearch] = useState<string>("");
  const [teamSearch, setTeamSearch] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");
  const [tagsWithUsersSearch, setTagsWithUsersSearch] = useState<string>("");

  const handleSiteSearchChange = useCallback((search?: string) => {
    setSiteSearch(search ?? "");
  }, []);

  const handleTeamSearchChange = useCallback((search?: string) => {
    setTeamSearch(search ?? "");
  }, []);

  const handleUserSearchChange = useCallback((search?: string) => {
    setUserSearch(search ?? "");
  }, []);

  const handleTagsWithUsersSearchChange = useCallback((search: string) => {
    setTagsWithUsersSearch(search);
  }, []);

  const resetSearchTerms = useCallback(() => {
    setSiteSearch("");
    setTeamSearch("");
    setUserSearch("");
    setTagsWithUsersSearch("");
  }, []);

  return {
    searchTerms: {
      siteSearch,
      teamSearch,
      userSearch,
      tagsWithUsersSearch,
    },
    searchHandlers: {
      handleSiteSearchChange,
      handleTeamSearchChange,
      handleUserSearchChange,
      handleTagsWithUsersSearchChange,
    },
    resetSearchTerms,
  };
};