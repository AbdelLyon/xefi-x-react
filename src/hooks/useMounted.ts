import { useEffect, useState } from "react";

export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect((): void => setMounted(true), []);
  return mounted;
};
