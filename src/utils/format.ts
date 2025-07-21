/**
 * Formatting utilities for numbers, dates, and strings
 */

/**
 * Format number with locale-specific formatting
 */
export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, options).format(value);
};

/**
 * Format currency with proper locale formatting
 */
export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US',
): string => {
  return formatNumber(value, {
    style: 'currency',
    currency,
  }, locale);
};

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  decimals = 1,
  locale = 'en-US',
): string => {
  return formatNumber(value / 100, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }, locale);
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {return '0 Bytes';}

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Format duration in human readable format
 */
export const formatDuration = (
  milliseconds: number,
  options: { 
    format?: 'short' | 'long';
    maxUnit?: 'days' | 'hours' | 'minutes' | 'seconds';
  } = {},
): string => {
  const { format = 'short', maxUnit = 'days' } = options;
  
  const units = [
    { name: 'day', short: 'd', ms: 24 * 60 * 60 * 1000 },
    { name: 'hour', short: 'h', ms: 60 * 60 * 1000 },
    { name: 'minute', short: 'm', ms: 60 * 1000 },
    { name: 'second', short: 's', ms: 1000 },
  ];

  const maxUnitIndex = units.findIndex(unit => unit.name.startsWith(maxUnit));
  const filteredUnits = maxUnitIndex >= 0 ? units.slice(maxUnitIndex) : units;

  let remaining = milliseconds;
  const parts: string[] = [];

  for (const unit of filteredUnits) {
    const value = Math.floor(remaining / unit.ms);
    if (value > 0) {
      const label = format === 'short' 
        ? unit.short
        : value === 1 ? unit.name : `${unit.name}s`;
      
      parts.push(`${value}${format === 'short' ? '' : ' '}${label}`);
      remaining %= unit.ms;
    }
  }

  return parts.join(format === 'short' ? ' ' : ', ') || '0s';
};

/**
 * Format date with relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale = 'en-US',
): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  
  const rtf = new Intl.RelativeTimeFormat(locale, { 
    numeric: 'auto',
    style: 'long' 
  });

  const units = [
    { unit: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
    { unit: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
    { unit: 'day', ms: 24 * 60 * 60 * 1000 },
    { unit: 'hour', ms: 60 * 60 * 1000 },
    { unit: 'minute', ms: 60 * 1000 },
    { unit: 'second', ms: 1000 },
  ] as const;

  for (const { unit, ms } of units) {
    const value = Math.round(diffMs / ms);
    if (Math.abs(value) >= 1) {
      return rtf.format(-value, unit);
    }
  }

  return rtf.format(0, 'second');
};

/**
 * Format date with options
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-US',
): string => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  format: 'international' | 'national' | 'e164' = 'national',
): string => {
  // Remove all non-digits
  const digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 10) {
    // US format
    switch (format) {
      case 'international':
        return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      case 'e164':
        return `+1${digits}`;
      default:
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  }
  
  // Return as-is if we can't format it
  return phoneNumber;
};

/**
 * Format credit card number
 */
export const formatCreditCard = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

/**
 * Mask sensitive information
 */
export const maskString = (
  value: string,
  options: {
    start?: number;
    end?: number;
    maskChar?: string;
  } = {},
): string => {
  const { start = 0, end = 0, maskChar = '*' } = options;
  
  if (value.length <= start + end) {
    return maskChar.repeat(value.length);
  }
  
  const visibleStart = value.slice(0, start);
  const visibleEnd = end > 0 ? value.slice(-end) : '';
  const maskedLength = value.length - start - end;
  const masked = maskChar.repeat(maskedLength);
  
  return visibleStart + masked + visibleEnd;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (
  text: string,
  maxLength: number,
  ellipsis = '...',
): string => {
  if (text.length <= maxLength) {return text;}
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Convert to title case
 */
export const toTitleCase = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

/**
 * Convert to kebab case
 */
export const toKebabCase = (text: string): string => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Convert to camel case
 */
export const toCamelCase = (text: string): string => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
};

/**
 * Convert to snake case
 */
export const toSnakeCase = (text: string): string => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};