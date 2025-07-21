import type {
  AnchorHTMLAttributes,
  ComponentType,
  JSX,
  ReactNode,
} from "react";
import type { ButtonProps as ButtonRootProps } from "@heroui/react";
import { Button as ButtonRoot } from "@heroui/react";
import type { Color, Radius } from "@/types/types";

export interface ButtonProps extends Omit<ButtonRootProps, "onPress"> {
  LinkComponent?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
  classNames?: {
    base?: string;
    beforeContent?: string;
    afterContent?: string;
    content?: string;
  };
  onClick?: () => void;
  radius?: Radius;
  color?: Color;
}

export const Button = ({
  onClick,
  radius = "sm",
  color = "primary",
  startContent,
  endContent,
  LinkComponent,
  classNames = {},
  href,
  children,
  target,
  rel,
  ...props
}: ButtonProps): JSX.Element => {
  const { beforeContent = "", afterContent = "", content = "" } = classNames;

  const Content = (): ReactNode => (
    <>
      {startContent && <span className={beforeContent}>{startContent}</span>}
      <span className={content}>{children}</span>
      {endContent && <span className={afterContent}>{endContent}</span>}
    </>
  );

  const hasValidLink = href && href.length > 0 && LinkComponent;

  const buttonProps = {
    onPress: onClick,
    radius,
    color,
    ...props,
  };

  if (hasValidLink) {
    return (
      <ButtonRoot
        as={LinkComponent}
        href={href}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        target={target}
        {...buttonProps}
      >
        <Content />
      </ButtonRoot>
    );
  }

  return (
    <ButtonRoot {...buttonProps}>
      <Content />
    </ButtonRoot>
  );
};
