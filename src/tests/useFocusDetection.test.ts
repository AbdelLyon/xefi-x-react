import { useFocusDetection } from "@/hooks/useFocusDetection";
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("useFocusDetection hook", (): void => {
  it("devrait retourner une ref et un état focused initial à false", (): void => {
    const { result } = renderHook(
      (): {
        ref: React.RefObject<HTMLElement>;
        focused: boolean;
      } => useFocusDetection({}),
    );
    expect(result.current.ref.current).toBe(null);
    expect(result.current.focused).toBe(false);
  });
});
