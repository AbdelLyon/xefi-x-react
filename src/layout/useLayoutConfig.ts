type UseLayoutConfigOptions<T> = {
  navbar?: Partial<T>;
  sidebar?: Partial<T>;
};

export type LayoutConfig<T> = {
  navbar?: Partial<T>;
  sidebar?: Partial<T>;
};

export const useLayoutConfig = <T extends object>(
  options: UseLayoutConfigOptions<T> = {},
): LayoutConfig<T> => {
  const { navbar, sidebar } = options;

  return {
    navbar: navbar
      ? {
          className: "fixed top-0 z-40",
          ...navbar,
        }
      : undefined,
    sidebar: sidebar
      ? {
          className: "fixed z-30",
          ...sidebar,
        }
      : undefined,
  };
};
