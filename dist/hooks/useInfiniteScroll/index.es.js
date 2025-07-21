import { useRef, useCallback, useLayoutEffect } from "react";
import { createDebouncedFunction } from "../../utils/utils/index.es.js";
const useInfiniteScroll = (props = {}) => {
  const {
    hasMore = true,
    distance = 250,
    isEnabled = true,
    shouldUseLoader = true,
    debounceDelay = 100,
    threshold = 0.1,
    onLoadMore
  } = props;
  const scrollContainerRef = useRef(null);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const timeoutRef = useRef(
    void 0
  );
  const triggerLoadMore = useCallback(() => {
    if (isLoadingRef.current || !hasMore || !onLoadMore) {
      return;
    }
    isLoadingRef.current = true;
    onLoadMore();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      isLoadingRef.current = false;
    }, debounceDelay);
  }, [hasMore, onLoadMore, debounceDelay]);
  useLayoutEffect(() => {
    if (!isEnabled || !shouldUseLoader || !hasMore) {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    const loader = loaderRef.current;
    if (!scrollContainer || !loader) {
      return;
    }
    const options = {
      root: scrollContainer,
      rootMargin: `0px 0px ${distance}px 0px`,
      threshold
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry == null ? void 0 : entry.isIntersecting) {
          triggerLoadMore();
        }
      },
      options
    );
    observer.observe(loader);
    observerRef.current = observer;
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [
    isEnabled,
    shouldUseLoader,
    hasMore,
    distance,
    threshold,
    triggerLoadMore
  ]);
  useLayoutEffect(() => {
    if (!isEnabled || shouldUseLoader || !hasMore) {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const checkScrollPosition = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      if (distanceFromBottom <= distance) {
        triggerLoadMore();
      }
    };
    const debouncedCheck = createDebouncedFunction(
      checkScrollPosition,
      debounceDelay
    );
    scrollContainer.addEventListener("scroll", debouncedCheck, {
      passive: true
    });
    return () => {
      scrollContainer.removeEventListener("scroll", debouncedCheck);
    };
  }, [
    isEnabled,
    shouldUseLoader,
    hasMore,
    distance,
    debounceDelay,
    triggerLoadMore
  ]);
  useLayoutEffect(() => {
    return () => {
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
    triggerLoadMore
  };
};
export {
  useInfiniteScroll
};
