import { User } from "@/models/User";


export const filterUsersBySearch = (users: User[], searchQuery: string): User[] => {
  if (!searchQuery) return users;

  const query = searchQuery.toLowerCase();
  return users.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const email = user.email.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });
};

export const deduplicateUsers = (users: User[]): User[] => {
  const seen = new Set<number>();
  return users.filter((user) => {
    if (seen.has(user.id)) return false;
    seen.add(user.id);
    return true;
  });
};

export const processUserGroup = (
  users: User[],
  searchQuery: string
): User[] => {
  const uniqueUsers = deduplicateUsers(users);
  return filterUsersBySearch(uniqueUsers, searchQuery);
};


export const getCellSize = (viewMode: string) => {
  const CELL_SIZES = {
    day: { height: "h-8", width: "min-w-[40px]" },
    week: { height: "h-8", width: "min-w-[168px]" },
    month: { height: "h-6", width: "min-w-[38px]" },
    twomonths: { height: "h-5", width: "min-w-[19px]" },
    dateSelected: { height: "h-6", width: "min-w-[20px]" },
  } as const;

  return CELL_SIZES[viewMode as keyof typeof CELL_SIZES] || CELL_SIZES.month;
};

export const PLANNING_CONSTANTS = {
  SIDEBAR_WIDTH: "w-[240px]",
  HEADER_HEIGHT: "h-28",
  GROUP_SEPARATOR_HEIGHT: "h-[30px]",
  USER_ROW_HEIGHT: "h-8",
} as const;