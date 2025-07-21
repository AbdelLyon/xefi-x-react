const defaultProgressFormatOptions = {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
};
const formatProgressValue = (value, maxValue = 100, formatOptions = defaultProgressFormatOptions, locale) => {
  try {
    const normalizedValue = value / maxValue;
    return new Intl.NumberFormat(locale, formatOptions).format(normalizedValue);
  } catch (error) {
    console.warn("Progress value formatting failed:", error);
    return `${Math.round(value / maxValue * 100)}%`;
  }
};
const calculatePercentage = (value, maxValue = 100) => {
  if (maxValue === 0) {
    return 0;
  }
  return Math.min(Math.max(value / maxValue * 100, 0), 100);
};
const validateProgressValue = (value, minValue = 0, maxValue = 100) => {
  return Math.min(Math.max(value, minValue), maxValue);
};
const getProgressStatus = (value, maxValue = 100) => {
  const percentage = calculatePercentage(value, maxValue);
  if (percentage === 0) {
    return "empty";
  }
  if (percentage < 25) {
    return "low";
  }
  if (percentage < 50) {
    return "medium";
  }
  if (percentage < 100) {
    return "high";
  }
  return "complete";
};
export {
  calculatePercentage,
  defaultProgressFormatOptions,
  formatProgressValue,
  getProgressStatus,
  validateProgressValue
};
