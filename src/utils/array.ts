/**
 * Array utilities for collection manipulation and operations
 */

export function filterUnique<T>(
  arr: T[],
  criteria: ((item: T) => unknown) | keyof T,
): T[] {
  const iteratee =
    typeof criteria === "function"
      ? criteria
      : (item: T): unknown => item[criteria];
  const seen = new Map();
  return arr.filter((item): boolean => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    }
    seen.set(key, true);
    return true;
  });
}

export function findIntersection<T>(
  arrays: T[][],
  criteria: ((item: T) => unknown) | keyof T,
): T[] {
  if (!arrays.length) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }

  const iteratee =
    typeof criteria === "function"
      ? criteria
      : (item: T): unknown => item[criteria];
  const [first, ...rest] = arrays;
  const transformedRest = rest.map(
    (arr): Set<unknown> => new Set(arr.map(iteratee)),
  );

  return first.filter((item): boolean => {
    const transformed = iteratee(item);
    return transformedRest.every((set): boolean => set.has(transformed));
  });
}

export function arrayToObject<T extends Record<string, unknown>>(
  arr: T[],
): Record<string, unknown> {
  if (!arr?.length) {
    return {};
  }
  return arr.reduce<Record<string, unknown>>(
    (acc: Record<string, unknown>, item: T): Record<string, unknown> => ({
      ...acc,
      ...item,
    }),
    {},
  );
}