var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const withTimeout = (promise, timeoutMs, timeoutMessage = "Operation timed out") => {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    })
  ]);
};
const retry = (_0, ..._1) => __async(null, [_0, ..._1], function* (fn, options = {}) {
  const {
    maxAttempts = 3,
    baseDelay = 1e3,
    maxDelay = 1e4,
    exponential = true,
    shouldRetry = () => true
  } = options;
  let lastError = new Error("Operation failed");
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return yield fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === maxAttempts || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }
      const delayMs = exponential ? Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay) : baseDelay;
      yield delay(delayMs);
    }
  }
  throw lastError;
});
const chunk = (items, fn, chunkSize = 5) => __async(null, null, function* () {
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunkItems = items.slice(i, i + chunkSize);
    const chunkPromises = chunkItems.map(fn);
    const chunkResults = yield Promise.all(chunkPromises);
    results.push(...chunkResults);
  }
  return results;
});
const parallel = (items, fn, concurrency = 3) => __async(null, null, function* () {
  if (concurrency >= items.length) {
    return Promise.all(items.map(fn));
  }
  const results = new Array(items.length);
  let index = 0;
  const worker = () => __async(null, null, function* () {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = yield fn(items[currentIndex]);
    }
  });
  const workers = Array.from({ length: concurrency }, worker);
  yield Promise.all(workers);
  return results;
});
const raceAll = (promises) => __async(null, null, function* () {
  let winner;
  let winnerFound = false;
  const racePromise = Promise.race(promises).then((value) => {
    if (!winnerFound) {
      winner = value;
      winnerFound = true;
    }
    return value;
  });
  const allResults = yield Promise.allSettled(promises);
  yield racePromise;
  if (!winner) {
    throw new Error("No winner found");
  }
  return {
    winner,
    results: allResults.map((result) => ({
      status: result.status,
      value: result.status === "fulfilled" ? result.value : void 0,
      reason: result.status === "rejected" ? result.reason : void 0
    }))
  };
});
const makeCancelable = (promise) => {
  let isCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((value) => {
      if (!isCanceled) {
        resolve(value);
      }
    }).catch((error) => {
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
    isCanceled: () => isCanceled
  };
};
const debounceAsync = (fn, delay2) => {
  let timeoutId;
  let latestPromise;
  return (...args) => {
    clearTimeout(timeoutId);
    latestPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => __async(null, null, function* () {
        try {
          const result = yield fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }), delay2);
    });
    return latestPromise;
  };
};
const waitFor = (condition, options = {}) => {
  const { timeout = 5e3, interval = 100 } = options;
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const check = () => {
      if (condition()) {
        resolve();
        return;
      }
      if (Date.now() - startTime >= timeout) {
        reject(new Error("Timeout waiting for condition"));
        return;
      }
      setTimeout(check, interval);
    };
    check();
  });
};
const memoizeAsync = (fn, keyGenerator = (...args) => JSON.stringify(args)) => {
  const cache = /* @__PURE__ */ new Map();
  const memoized = (...args) => {
    const key = keyGenerator(...args);
    const cachedValue = cache.get(key);
    if (cachedValue) {
      return cachedValue;
    }
    const promise = fn(...args);
    cache.set(key, promise);
    promise.catch(() => {
      cache.delete(key);
    });
    return promise;
  };
  const result = Object.assign(memoized, {
    clear: () => {
      cache.clear();
    }
  });
  return result;
};
export {
  chunk,
  debounceAsync,
  delay,
  makeCancelable,
  memoizeAsync,
  parallel,
  raceAll,
  retry,
  waitFor,
  withTimeout
};
