const accordionVariantClasses = {
  light: {
    base: "",
    item: "bg-transparent"
  },
  shadow: {
    base: "shadow-md",
    item: "bg-white dark:bg-content1"
  },
  bordered: {
    base: "border-1 border-border",
    item: "border-b border-border last:border-b-0"
  },
  splitted: {
    base: "gap-2",
    item: "bg-white dark:bg-content1 border-1 border-border rounded-md mb-2 last:mb-0"
  }
};
const accordionSizeClasses = {
  sm: {
    itemTitle: "text-sm",
    itemContent: "text-xs"
  },
  md: {
    itemTitle: "text-base",
    itemContent: "text-sm"
  },
  lg: {
    itemTitle: "text-lg",
    itemContent: "text-base"
  }
};
const getAccordionVariantClasses = (variant = "light") => {
  return accordionVariantClasses[variant] || accordionVariantClasses.light;
};
const getAccordionSizeClasses = (size = "md") => {
  return accordionSizeClasses[size] || accordionSizeClasses.md;
};
const validateAccordionItem = (item) => {
  const errors = [];
  if (!item.key || typeof item.key !== "string") {
    errors.push("Item key is required and must be a string");
  }
  if (!item.title) {
    errors.push("Item title is required");
  }
  if (!item.content) {
    errors.push("Item content is required");
  }
  return {
    valid: errors.length === 0,
    errors
  };
};
export {
  accordionSizeClasses,
  accordionVariantClasses,
  getAccordionSizeClasses,
  getAccordionVariantClasses,
  validateAccordionItem
};
