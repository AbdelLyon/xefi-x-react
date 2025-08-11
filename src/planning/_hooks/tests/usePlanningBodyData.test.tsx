// __tests__/hooks/usePlanningBodyData.test.tsx
import { renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  useCellSize,
  usePeriodDays,
} from "@/app/planning/_hooks/usePlanningBodyData";
import { Filter } from "@/services/types";
import * as PlanningStore from "@/store/usePlanningStore";

vi.mock("@/store/usePlanningStore");

describe("usePlanningBodyData hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("usePeriodDays", () => {
    it("should return week days", () => {
      vi.mocked(PlanningStore.usePlanningStore).mockReturnValue({
        currentDate: dayjs("2024-01-15"),
        viewMode: "week",
        filters: [],
      });

      const { result } = renderHook(() => usePeriodDays());
      expect(Array.isArray(result.current)).toBe(true);
      expect(result.current.length).toBe(7); 
    });

    it("should return month days", () => {
      vi.mocked(PlanningStore.usePlanningStore).mockReturnValue({
        currentDate: dayjs("2024-01-15"),
        viewMode: "month",
        filters: [],
      });

      const { result } = renderHook(() => usePeriodDays());
      expect(Array.isArray(result.current)).toBe(true);
      expect(result.current.length).toBeGreaterThan(27); 
    });

    it("should use custom date filters", () => {
      vi.mocked(PlanningStore.usePlanningStore).mockReturnValue({
        currentDate: dayjs("2024-01-15"),
        viewMode: "custom",
        filters: [
          { field: "start_date", operator: ">=", value: "2024-01-01" },
          { field: "end_date", operator: "<=", value: "2024-01-10" },
        ],
      });

      const { result } = renderHook(() => usePeriodDays());
      expect(result.current.length).toBe(10); 
    });
  });

  describe("useCellSize", () => {
    const mockPeriodDays = Array.from({ length: 7 }, (_, i) =>
      dayjs("2024-01-01").add(i, "day"),
    );

    it("should return size for week view", () => {
      const { result } = renderHook(() =>
        useCellSize(mockPeriodDays, "week", []),
      );

      expect(result.current).toEqual({
        height: "h-8",
        width: "min-w-[40px]",
      });
    });

    it("should return size for month view", () => {
      const { result } = renderHook(() =>
        useCellSize(mockPeriodDays, "month", []),
      );

      expect(result.current).toEqual({
        height: "h-6",
        width: "min-w-[20px]",
      });
    });

    it("should adapt size with filters", () => {
      const filters: Filter[] = [
        { field: "start_date", operator: ">=", value: "2024-01-01" },
        { field: "end_date", operator: "<=", value: "2024-01-03" },
      ];

      const { result } = renderHook(() =>
        useCellSize(mockPeriodDays, "custom", filters),
      );

      expect(result.current.height).toBeDefined();
      expect(result.current.width).toBeDefined();
    });
  });
});
