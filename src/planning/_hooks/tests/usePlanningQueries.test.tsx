import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePlanningQueries } from "@/app/planning/_hooks/usePlanningQueries";

vi.mock("@/services/api/sites/SiteService", () => ({
  siteService: {
    search: vi.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
  },
}));

vi.mock("@/services/api/tags/TagService", () => ({
  teamService: {
    search: vi.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
  },
}));

vi.mock("@/services/api/users/UserService", () => ({
  userService: {
    search: vi.fn().mockResolvedValue({ data: [], meta: { total: 0 } }),
  },
}));

vi.mock("@/store/usePlanningStore", () => ({
  usePlanningStore: vi.fn(() => ({
    setFilters: vi.fn(),
  })),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "QueryClientTestWrapper";

  return Wrapper;
};

describe("usePlanningQueries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePlanningQueries(), {
      wrapper: createWrapper(),
    });

    expect(result.current.siteOptions).toEqual([]);
    expect(result.current.teamOptions).toEqual([]);
    expect(result.current.userOptions).toEqual([]);
    expect(result.current.hasErrors).toBe(false);
  });

  it("should have required functions", () => {
    const { result } = renderHook(() => usePlanningQueries(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.handleSiteSearchChange).toBe("function");
    expect(typeof result.current.handleTeamSearchChange).toBe("function");
    expect(typeof result.current.handleUserSearchChange).toBe("function");
    expect(typeof result.current.resetFilters).toBe("function");
    expect(typeof result.current.refetchAll).toBe("function");
  });
});
