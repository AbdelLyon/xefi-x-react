export declare const useIntersection: <T extends HTMLElement = HTMLElement>(options?: ConstructorParameters<typeof IntersectionObserver>[1]) => {
    ref: (element: T | null) => void;
    entry: IntersectionObserverEntry | null;
};
