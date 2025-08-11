import { useCallback, useState } from "react";

export const useSelectionState = () => {
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const resetSelections = useCallback(() => {
    setSelectedSite("");
    setSelectedTeam("");
    setSelectedUser("");
  }, []);

  return {
    selections: {
      selectedSite,
      selectedTeam,
      selectedUser,
    },
    selectionSetters: {
      setSelectedSite,
      setSelectedTeam,
      setSelectedUser,
    },
    resetSelections,
  };
};