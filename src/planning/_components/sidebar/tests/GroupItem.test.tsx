import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { User } from "@/models/User";

vi.mock("@xefi/x-react/icons", () => ({
  IconChevronDown: vi.fn(({ className, size }) => (
    <div data-testid="icon-chevron-down" className={className} data-size={size}>
      ▼
    </div>
  )),
}));

vi.mock("@xefi/x-react/skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@/components/Indicator", () => ({
  Indicator: () => <div data-testid="indicator">Loading...</div>,
}));

vi.mock("@/store/usePlanningStore", () => ({
  usePlanningStore: () => ({
    hoveredUser: null,
    setHoveredUser: vi.fn(),
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

import { GroupItem } from "../GroupItem";

describe("GroupItem", () => {
  const mockUsers: User[] = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
    } as User,
    {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane@example.com",
    } as User,
  ];

  const defaultProps = {
    id: "group-1",
    name: "Development Team",
    users: mockUsers,
    isExpanded: false,
    onToggle: vi.fn(),
    showBalances: true,
    getLeaveBalance: vi.fn((_userId: number, isLastYear: boolean) =>
      isLastYear ? 20 : 25,
    ),
    getLeavesTaken: vi.fn(() => 5),
    isFetchingNextPage: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render group name and user count", () => {
    render(<GroupItem {...defaultProps} />);

    expect(screen.getByText("Development Team")).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  it("should call onToggle when clicked", async () => {
    const user = userEvent.setup();
    render(<GroupItem {...defaultProps} />);

    const groupHeader = screen
      .getByText("Development Team")
      .closest('[class*="cursor-pointer"]');
    await user.click(groupHeader!);

    expect(defaultProps.onToggle).toHaveBeenCalled();
  });

  it("should show users when expanded", () => {
    const { container } = render(
      <GroupItem {...defaultProps} isExpanded={true} />,
    );

    const usersContainer = container.querySelector(
      '[class*="max-h-none"][class*="opacity-100"]',
    );
    expect(usersContainer).toBeInTheDocument();

    expect(screen.getByText("Doe John")).toBeInTheDocument();
    expect(screen.getByText("Smith Jane")).toBeInTheDocument();
  });

  it("should hide users when collapsed", () => {
    const { container } = render(
      <GroupItem {...defaultProps} isExpanded={false} />,
    );

    const usersContainer = container.querySelector(
      '[class*="max-h-0"][class*="opacity-0"]',
    );
    expect(usersContainer).toBeInTheDocument();

    // Users are present but visually hidden
    expect(screen.getByText("Doe John")).toBeInTheDocument();
    expect(screen.getByText("Smith Jane")).toBeInTheDocument();
  });

  it("should show loading indicator when fetching", () => {
    render(<GroupItem {...defaultProps} isFetchingNextPage={true} />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });
});
