const formatNumber = (value, options = {}, locale = "en-US") => {
  return new Intl.NumberFormat(locale, options).format(value);
};
const formatCurrency = (value, currency = "USD", locale = "en-US") => {
  return formatNumber(value, {
    style: "currency",
    currency
  }, locale);
};
const formatPercentage = (value, decimals = 1, locale = "en-US") => {
  return formatNumber(value / 100, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }, locale);
};
const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};
const formatDuration = (milliseconds, options = {}) => {
  const { format = "short", maxUnit = "days" } = options;
  const units = [
    { name: "day", short: "d", ms: 24 * 60 * 60 * 1e3 },
    { name: "hour", short: "h", ms: 60 * 60 * 1e3 },
    { name: "minute", short: "m", ms: 60 * 1e3 },
    { name: "second", short: "s", ms: 1e3 }
  ];
  const maxUnitIndex = units.findIndex((unit) => unit.name.startsWith(maxUnit));
  const filteredUnits = maxUnitIndex >= 0 ? units.slice(maxUnitIndex) : units;
  let remaining = milliseconds;
  const parts = [];
  for (const unit of filteredUnits) {
    const value = Math.floor(remaining / unit.ms);
    if (value > 0) {
      const label = format === "short" ? unit.short : value === 1 ? unit.name : `${unit.name}s`;
      parts.push(`${value}${format === "short" ? "" : " "}${label}`);
      remaining %= unit.ms;
    }
  }
  return parts.join(format === "short" ? " " : ", ") || "0s";
};
const formatRelativeTime = (date, locale = "en-US") => {
  const now = /* @__PURE__ */ new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "long"
  });
  const units = [
    { unit: "year", ms: 365 * 24 * 60 * 60 * 1e3 },
    { unit: "month", ms: 30 * 24 * 60 * 60 * 1e3 },
    { unit: "day", ms: 24 * 60 * 60 * 1e3 },
    { unit: "hour", ms: 60 * 60 * 1e3 },
    { unit: "minute", ms: 60 * 1e3 },
    { unit: "second", ms: 1e3 }
  ];
  for (const { unit, ms } of units) {
    const value = Math.round(diffMs / ms);
    if (Math.abs(value) >= 1) {
      return rtf.format(-value, unit);
    }
  }
  return rtf.format(0, "second");
};
const formatDate = (date, options = {}, locale = "en-US") => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};
const formatPhoneNumber = (phoneNumber, format = "national") => {
  const digits = phoneNumber.replace(/\D/g, "");
  if (digits.length === 10) {
    switch (format) {
      case "international":
        return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      case "e164":
        return `+1${digits}`;
      default:
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  }
  return phoneNumber;
};
const formatCreditCard = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};
const maskString = (value, options = {}) => {
  const { start = 0, end = 0, maskChar = "*" } = options;
  if (value.length <= start + end) {
    return maskChar.repeat(value.length);
  }
  const visibleStart = value.slice(0, start);
  const visibleEnd = end > 0 ? value.slice(-end) : "";
  const maskedLength = value.length - start - end;
  const masked = maskChar.repeat(maskedLength);
  return visibleStart + masked + visibleEnd;
};
const truncateText = (text, maxLength, ellipsis = "...") => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
};
const toTitleCase = (text) => {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};
const toKebabCase = (text) => {
  return text.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
const toCamelCase = (text) => {
  return text.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, "");
};
const toSnakeCase = (text) => {
  return text.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
};
export {
  formatCreditCard,
  formatCurrency,
  formatDate,
  formatDuration,
  formatFileSize,
  formatNumber,
  formatPercentage,
  formatPhoneNumber,
  formatRelativeTime,
  maskString,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  truncateText
};
