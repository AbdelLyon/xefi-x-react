import { Avatar, AvatarGroup, UserAvatar } from "@/avatar";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Composants Avatar", (): void => {
  describe("Avatar", (): void => {
    describe("Snapshots", (): void => {
      it("devrait correspondre au snapshot sans props", (): void => {
        const { container } = render(<Avatar />);
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec src et alt", (): void => {
        const { container } = render(
          <Avatar src="test.jpg" alt="Mon avatar" />,
        );
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec name", (): void => {
        const { container } = render(<Avatar name="John Doe" />);
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec taille différente", (): void => {
        const { container } = render(<Avatar size="lg" />);
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec fallback", (): void => {
        const { container } = render(
          <Avatar
            src="invalid.jpg"
            fallback={<div data-testid="fallback">FB</div>}
            showFallback
          />,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("AvatarGroup", (): void => {
    describe("Snapshots", (): void => {
      it("devrait correspondre au snapshot pour un groupe simple", (): void => {
        const { container } = render(
          <AvatarGroup>
            <Avatar name="User 1" />
            <Avatar name="User 2" />
          </AvatarGroup>,
        );
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec max et total", (): void => {
        const { container } = render(
          <AvatarGroup max={1} total={3}>
            <Avatar name="User 1" />
            <Avatar name="User 2" />
            <Avatar name="User 3" />
          </AvatarGroup>,
        );
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec styles personnalisés", (): void => {
        const { container } = render(
          <AvatarGroup className="size-6">
            <Avatar />
          </AvatarGroup>,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("UserAvatar", (): void => {
    describe("Snapshots", (): void => {
      it("devrait correspondre au snapshot avec informations de base", (): void => {
        const { container } = render(
          <UserAvatar name="John Doe" description="Developer" />,
        );
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec avatar personnalisé", (): void => {
        const { container } = render(
          <UserAvatar
            name="John Doe"
            avatarProps={{
              src: "test.jpg",
              alt: "John",
            }}
          />,
        );
        expect(container).toMatchSnapshot();
      });

      it("devrait correspondre au snapshot avec contenus personnalisés", (): void => {
        const { container } = render(
          <UserAvatar
            name={<span data-testid="custom-name">John</span>}
            description={<span data-testid="custom-desc">Info</span>}
          />,
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
