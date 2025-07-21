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
import { useState, useCallback } from "react";
const isClipboardSupported = () => {
  return typeof window !== "undefined" && "navigator" in window && "clipboard" in navigator && "writeText" in navigator.clipboard;
};
const fallbackCopy = (text) => {
  if (typeof document === "undefined") {
    return false;
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  textArea.setAttribute("readonly", "");
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (e) {
    document.body.removeChild(textArea);
    return false;
  }
};
const useClipboard = (options = {}) => {
  const { timeout = 2e3, onCopy, onError } = options;
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const isSupported = isClipboardSupported();
  const copy = useCallback((text) => __async(null, null, function* () {
    if (typeof text !== "string") {
      const error = new Error("Text must be a string");
      onError == null ? void 0 : onError(error);
      return false;
    }
    setValue(text);
    try {
      if (isSupported) {
        yield navigator.clipboard.writeText(text);
      } else {
        const success = fallbackCopy(text);
        if (!success) {
          throw new Error("Fallback copy method failed");
        }
      }
      setCopied(true);
      onCopy == null ? void 0 : onCopy(text);
      setTimeout(() => {
        setCopied(false);
      }, timeout);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Copy failed");
      onError == null ? void 0 : onError(error);
      return false;
    }
  }), [isSupported, onCopy, onError, timeout]);
  const reset = useCallback(() => {
    setValue("");
    setCopied(false);
  }, []);
  return {
    value,
    copied,
    copy,
    reset,
    isSupported
  };
};
export {
  useClipboard
};
