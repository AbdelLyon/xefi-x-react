import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { User } from "@/models/User";

const mockSetHoveredUser = vi.fn();

vi.mock("@/store/usePlanningStore", () => ({
  usePlanningStore: () => ({
    hoveredUser: null,
    setHoveredUser: mockSetHoveredUser,
  }),
}));

vi.mock("@/store/useUserStore", () => ({
  useUserStore: () => ({
    currentUser: {
      profile: {
        label: "USER",
      },
    },
  }),
}));

vi.mock("@/app/teams/_hooks/useDirectorActionMutation", () => ({
  useDirectorActionMutation: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@xefi/x-react/toast", () => ({
  addToast: vi.fn(),
}));

import { UserItem } from "../UserItem";

describe("UserItem", () => {
  const mockUser: User = {
    id: 123,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
  } as User;

  const defaultProps = {
    user: mockUser,
    groupId: "group-1",
    index: 0,
    showBalances: true,
    getLeaveBalance: vi.fn((_userId: number, isLastYear: boolean) =>
      isLastYear ? 20 : 25,
    ),
    getLeavesTaken: vi.fn(() => 5),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render user name correctly", () => {
    render(<UserItem {...defaultProps} />);
    expect(screen.getByText("Doe John")).toBeInTheDocument();
  });

  it("should show balances when showBalances is true", () => {
    render(<UserItem {...defaultProps} showBalances={true} />);

    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should hide balances when showBalances is false", () => {
    render(<UserItem {...defaultProps} showBalances={false} />);

    expect(screen.queryByText("20")).not.toBeInTheDocument();
    expect(screen.queryByText("25")).not.toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();

    const balanceContainer = document.querySelector('[class*="opacity-0"]');
    expect(balanceContainer).toHaveClass("opacity-0");
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    render(<UserItem {...defaultProps} />);

    const userElement = screen.getByText("Doe John").closest('[role="button"]');
    await user.click(userElement!);

    expect(mockSetHoveredUser).toHaveBeenCalledWith(123);
  });

  it("should call balance functions with correct parameters", () => {
    render(<UserItem {...defaultProps} />);

    expect(defaultProps.getLeaveBalance).toHaveBeenCalledWith(123, true);
    expect(defaultProps.getLeaveBalance).toHaveBeenCalledWith(123, false);
    expect(defaultProps.getLeavesTaken).toHaveBeenCalledWith(123);
  });

  it("should format decimal balances correctly", () => {
    const customGetLeaveBalance = vi.fn(
      (_userId: number, isLastYear: boolean) => (isLastYear ? 15.5 : 30.25),
    );

    render(
      <UserItem {...defaultProps} getLeaveBalance={customGetLeaveBalance} />,
    );

    expect(screen.getByText("15.5")).toBeInTheDocument();
    expect(screen.getByText("30.3")).toBeInTheDocument();
  });
});
