import type { HeroUIProviderProps as ProviderProps } from "@heroui/react";
import { HeroUIProvider as Provider } from "@heroui/react";
import type { JSX } from "react";
import { type ReactNode } from "react";

type AppProviderProps = {
  children: ReactNode;
} & ProviderProps;

export const UIProvider = (props: AppProviderProps): JSX.Element => {
  const { children, ...rest } = props;

  return <Provider {...rest}>{children}</Provider>;
};
