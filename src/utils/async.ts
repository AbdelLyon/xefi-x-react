/**
 * Async utilities for handling promises and concurrent operations
 */

/**
 * Create a delay promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Timeout wrapper for promises
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage = 'Operation timed out',
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]);
};

/**
 * Retry a promise with exponential backoff
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    exponential?: boolean;
    shouldRetry?: (error: Error, attempt: number) => boolean;
  } = {},
): Promise<T> => {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    exponential = true,
    shouldRetry = () => true,
  } = options;

  let lastError: Error = new Error('Operation failed');

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxAttempts || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      const delayMs = exponential
        ? Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay)
        : baseDelay;

      await delay(delayMs);
    }
  }

  throw lastError;
};

/**
 * Run promises in chunks (batches)
 */
export const chunk = async <T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  chunkSize = 5,
): Promise<R[]> => {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunkItems = items.slice(i, i + chunkSize);
    const chunkPromises = chunkItems.map(fn);
    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
  }

  return results;
};

/**
 * Run promises with concurrency limit
 */
export const parallel = async <T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency = 3,
): Promise<R[]> => {
  if (concurrency >= items.length) {
    return Promise.all(items.map(fn));
  }

  const results: R[] = new Array(items.length);
  let index = 0;

  const worker = async (): Promise<void> => {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = await fn(items[currentIndex]);
    }
  };

  const workers = Array.from({ length: concurrency }, worker);
  await Promise.all(workers);

  return results;
};

/**
 * Race with all results (doesn't reject on first error)
 */
export const raceAll = async <T>(
  promises: Promise<T>[],
): Promise<{
  winner: T;
  results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: Error; }>;
}> => {
  let winner: T | undefined;
  let winnerFound = false;

  const racePromise = Promise.race(promises).then(value => {
    if (!winnerFound) {
      winner = value;
      winnerFound = true;
    }
    return value;
  });

  const allResults = await Promise.allSettled(promises);

  await racePromise;

  if (!winner) {
    throw new Error('No winner found');
  }

  return {
    winner,
    results: allResults.map(result => ({
      status: result.status,
      value: result.status === 'fulfilled' ? result.value : undefined,
      reason: result.status === 'rejected' ? result.reason : undefined,
    })),
  };
};

/**
 * Create a cancelable promise
 */
export const makeCancelable = <T>(
  promise: Promise<T>,
): {
  promise: Promise<T>;
  cancel: () => void;
  isCanceled: () => boolean;
} => {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then(value => {
        if (!isCanceled) {
          resolve(value);
        }
      })
      .catch(error => {
        if (!isCanceled) {
          reject(error);
        }
      });
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
    isCanceled: () => isCanceled,
  };
};

/**
 * Debounce a promise-returning function
 */
export const debounceAsync = <T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) => {
  let timeoutId: NodeJS.Timeout;
  let latestPromise: Promise<Awaited<ReturnType<T>>>;

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    clearTimeout(timeoutId);

    latestPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args) as Awaited<ReturnType<T>>;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });

    return latestPromise;
  };
};

/**
 * Create a promise that resolves when condition is met
 */
export const waitFor = (
  condition: () => boolean,
  options: {
    timeout?: number;
    interval?: number;
  } = {},
): Promise<void> => {
  const { timeout = 5000, interval = 100 } = options;

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      if (condition()) {
        resolve();
        return;
      }

      if (Date.now() - startTime >= timeout) {
        reject(new Error('Timeout waiting for condition'));
        return;
      }

      setTimeout(check, interval);
    };

    check();
  });
};

/**
 * Memoize async function results
 */
export const memoizeAsync = <T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string = (...args) => JSON.stringify(args),
): T & { clear: () => void; } => {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator(...args);
    const cachedValue = cache.get(key);

    if (cachedValue) {
      return cachedValue;
    }

    const promise = fn(...args) as ReturnType<T>;
    cache.set(key, promise);

    // Remove from cache if promise rejects
    promise.catch(() => {
      cache.delete(key);
    });

    return promise;
  }) as unknown as T;

  const result = Object.assign(memoized, {
    clear: () => {
      cache.clear();
    }
  });

  return result;
};