import { jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { Tooltip } from "../../tooltip/Tooltip/index.es.js";
function TruncatedText({
  children,
  className = "",
  tooltipClassName,
  placement = "top"
}) {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        const isTruncatedNow = element.scrollWidth > element.clientWidth;
        setIsTruncated(isTruncatedNow);
      }
    };
    checkTruncation();
    const resizeObserver = new ResizeObserver(checkTruncation);
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);
  const textElement = /* @__PURE__ */ jsx("div", { ref: textRef, className, children });
  if (isTruncated) {
    return /* @__PURE__ */ jsx(
      Tooltip,
      {
        trigger: textElement,
        content: children,
        placement,
        delay: 500,
        closeDelay: 100,
        className: tooltipClassName
      }
    );
  }
  return textElement;
}
export {
  TruncatedText
};
