import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMounted } from "@/hooks/useMounted";

describe("useMounted", (): void => {
  it("devrait retourner true après le montage du composant", (): void => {
    const { result } = renderHook((): boolean => useMounted());
    expect(result.current).toBe(true);
  });

  it("devrait rester true après plusieurs rendus", (): void => {
    const { result } = renderHook((): boolean => useMounted());
    expect(result.current).toBe(true);
  });
});
