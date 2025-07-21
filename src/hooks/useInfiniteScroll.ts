import { createDebouncedFunction } from "@/utils";
import { useLayoutEffect, useRef, useCallback } from "react";

export interface UseInfiniteScrollProps {
  isEnabled?: boolean;
  hasMore?: boolean;
  distance?: number;
  shouldUseLoader?: boolean;
  onLoadMore?: () => void;
  debounceDelay?: number;
  threshold?: number;
}

export interface UseInfiniteScrollReturn {
  loaderRef: React.RefObject<HTMLElement | null>;
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  isLoading: boolean;
  triggerLoadMore: () => void;
}

export const useInfiniteScroll = (
  props: UseInfiniteScrollProps = {},
): UseInfiniteScrollReturn => {
  const {
    hasMore = true,
    distance = 250,
    isEnabled = true,
    shouldUseLoader = true,
    debounceDelay = 100,
    threshold = 0.1,
    onLoadMore,
  } = props;

  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const loaderRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const triggerLoadMore = useCallback((): void => {
    if (isLoadingRef.current || !hasMore || !onLoadMore) {
      return;
    }

    isLoadingRef.current = true;
    onLoadMore();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout((): void => {
      isLoadingRef.current = false;
    }, debounceDelay);
  }, [hasMore, onLoadMore, debounceDelay]);

  useLayoutEffect((): (() => void) | undefined => {
    if (!isEnabled || !shouldUseLoader || !hasMore) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    const loader = loaderRef.current;

    if (!scrollContainer || !loader) {
      return;
    }

    const options: IntersectionObserverInit = {
      root: scrollContainer,
      rootMargin: `0px 0px ${distance}px 0px`,
      threshold,
    };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          triggerLoadMore();
        }
      },
      options,
    );

    observer.observe(loader);
    observerRef.current = observer;

    return (): void => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [
    isEnabled,
    shouldUseLoader,
    hasMore,
    distance,
    threshold,
    triggerLoadMore,
  ]);

  useLayoutEffect((): (() => void) | undefined => {
    if (!isEnabled || shouldUseLoader || !hasMore) {
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const checkScrollPosition = (): void => {
      const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom <= distance) {
        triggerLoadMore();
      }
    };

    const debouncedCheck = createDebouncedFunction(
      checkScrollPosition,
      debounceDelay,
    );

    scrollContainer.addEventListener("scroll", debouncedCheck, {
      passive: true,
    });

    return (): void => {
      scrollContainer.removeEventListener("scroll", debouncedCheck);
    };
  }, [
    isEnabled,
    shouldUseLoader,
    hasMore,
    distance,
    debounceDelay,
    triggerLoadMore,
  ]);

  useLayoutEffect((): (() => void) => {
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    loaderRef,
    scrollContainerRef,
    isLoading: isLoadingRef.current,
    triggerLoadMore,
  };
};
