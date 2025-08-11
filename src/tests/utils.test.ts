import { describe, it, expect, vi } from "vitest";
import {
  mergeTailwindClasses,
  capitalizeString,
  joinStringsWithSpace,
  hasPrefix,
  hasSuffix,
  convertToLowerCase,
  convertToUpperCase,
  trimWhitespace,
  reverseString,
  clampNumber,
  isNumeric,
  isArray,
  isObject,
  isFunction,
  isEmptyArray,
  isEmptyObject,
  isEmpty,
  filterUnique,
  findIntersection,
  arrayToObject,
  getNestedValue,
  cleanObject,
  serializeObject,
  chainCallbacks,
  createDebouncedFunction,
  dataAttr,
  generateUniqueId,
} from "@/utils";

describe("Utility Functions", (): void => {
  describe("String Utilities", (): void => {
    it("mergeTailwindClasses should merge classes", (): void => {
      expect(mergeTailwindClasses("text-red", "bg-blue")).toContain("text-red");
      expect(mergeTailwindClasses("text-red", "bg-blue")).toContain("bg-blue");
    });

    it("capitalizeString should capitalize first letter", (): void => {
      expect(capitalizeString("hello")).toBe("Hello");
      expect(capitalizeString("")).toBe("");
    });

    it("joinStringsWithSpace should join strings", (): void => {
      expect(joinStringsWithSpace("Hello", "World")).toBe("Hello World");
      expect(joinStringsWithSpace("Hello", undefined)).toBe("Hello");
      expect(joinStringsWithSpace()).toBe("");
    });

    it("hasPrefix should check string prefixes", (): void => {
      expect(hasPrefix("Hello World", "Hello")).toBeTruthy();
      expect(hasPrefix("", "")).toBeTruthy();
      expect(hasPrefix("Hello", "World")).toBeFalsy();
    });

    it("hasSuffix should check string suffixes", (): void => {
      expect(hasSuffix("Hello World", "World")).toBeTruthy();
      expect(hasSuffix("", "")).toBeTruthy();
      expect(hasSuffix("Hello", "World")).toBeFalsy();
    });

    it("convertToLowerCase should convert to lowercase", (): void => {
      expect(convertToLowerCase("HELLO")).toBe("hello");
    });

    it("convertToUpperCase should convert to uppercase", (): void => {
      expect(convertToUpperCase("hello")).toBe("HELLO");
    });

    it("trimWhitespace should remove whitespace", (): void => {
      expect(trimWhitespace(" hello ")).toBe("hello");
      expect(trimWhitespace("")).toBe("");
    });

    it("reverseString should reverse string", (): void => {
      expect(reverseString("hello")).toBe("olleh");
      expect(reverseString("")).toBe("");
    });
  });

  describe("Number Utilities", (): void => {
    it("clampNumber should handle number bounds", (): void => {
      expect(clampNumber(5, undefined, undefined)).toBe(5);
      expect(clampNumber(5, 10, undefined)).toBe(10);
      expect(clampNumber(15, 10, undefined)).toBe(15);
      expect(clampNumber(15, undefined, 10)).toBe(10);
      expect(clampNumber(5, 0, 10)).toBe(5);
      expect(clampNumber(15, 0, 10)).toBe(10);
      expect(clampNumber(-5, 0, 10)).toBe(0);
    });

    it("isNumeric should identify numeric values", (): void => {
      expect(isNumeric("123")).toBeTruthy();
      expect(isNumeric(123)).toBeTruthy();
      expect(isNumeric("abc")).toBeFalsy();
      expect(isNumeric("-1")).toBeFalsy();
      expect(isNumeric("0")).toBeFalsy();
    });
  });

  describe("Type Checking Utilities", (): void => {
    it("isArray should identify arrays", (): void => {
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(null)).toBeFalsy();
    });

    it("isObject should identify objects", (): void => {
      expect(isObject({})).toBeTruthy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
    });

    it("isFunction should identify functions", (): void => {
      expect(isFunction((): void => {})).toBeTruthy();
      expect(isFunction({})).toBeFalsy();
    });
  });

  describe("State Checking Utilities", (): void => {
    it("isEmptyArray should check array emptiness", (): void => {
      expect(isEmptyArray([])).toBeTruthy();
      expect(isEmptyArray([1])).toBeFalsy();
    });

    it("isEmptyObject should check object emptiness", (): void => {
      expect(isEmptyObject({})).toBeTruthy();
      expect(isEmptyObject({ a: 1 })).toBeFalsy();
    });

    it("isEmpty should check various emptiness", (): void => {
      expect(isEmpty({})).toBeTruthy();
      expect(isEmpty([])).toBeTruthy();
      expect(isEmpty("")).toBeTruthy();
      expect(isEmpty(null)).toBeTruthy();
      expect(isEmpty({ a: 1 })).toBeFalsy();
    });
  });

  describe("Array Utilities", (): void => {
    const testArray = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 1, name: "C" },
    ];

    it("filterUnique should filter unique items", (): void => {
      const result = filterUnique(testArray, "id");
      expect(result).toHaveLength(2);
    });

    it("findIntersection should find common elements", (): void => {
      const arrays = [
        [{ id: 1 }, { id: 2 }],
        [{ id: 2 }, { id: 3 }],
      ];
      const result = findIntersection(arrays, "id");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    it("arrayToObject should convert array to object", (): void => {
      const arr = [{ a: 1 }, { b: 2 }];
      const result = arrayToObject(arr);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });

  describe("Object Utilities", (): void => {
    const testObj = { a: { b: { c: "value" } } };

    it("getNestedValue should retrieve nested values", (): void => {
      expect(getNestedValue(testObj, "a.b.c")).toBe("value");
      expect(getNestedValue(testObj, ["a", "b", "c"])).toBe("value");
      expect(getNestedValue(testObj, "x.y.z", "default")).toBe("default");
    });

    it("cleanObject should remove specified properties", (): void => {
      const obj = { a: 1, b: null, c: undefined, d: "test" };
      expect(cleanObject(obj)).toEqual({ a: 1, d: "test" });
      expect(cleanObject(obj, { removeNull: false })).toEqual({
        a: 1,
        b: null,
        d: "test",
      });
    });

    it("serializeObject should serialize objects", (): void => {
      const obj = { a: 1, b: "test" };
      expect(serializeObject(obj)).toBe('{"a":1,"b":"test"}');
    });
  });

  describe("Function Utilities", (): void => {
    it("chainCallbacks should chain function calls", (): void => {
      const fn1 = vi.fn();
      const fn2 = vi.fn();
      const chained = chainCallbacks(fn1, fn2);

      const mockEvent = new Event("test");
      chained(mockEvent);

      expect(fn1).toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
    });

    it("createDebouncedFunction should debounce calls", (): void => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debounced = createDebouncedFunction(fn, 100);

      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });
  });

  describe("UI Utilities", (): void => {
    it("dataAttr should generate data attributes", (): void => {
      expect(dataAttr(true)).toBe("true");
      expect(dataAttr(false)).toBeUndefined();
    });

    it("generateUniqueId should create unique ids", (): void => {
      const id1 = generateUniqueId("test");
      const id2 = generateUniqueId("test");

      expect(id1).toMatch(/^test-\d+-[a-z0-9]{6}$/);
      expect(id1).not.toBe(id2);
    });
  });
});
