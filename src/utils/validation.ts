/**
 * Validation utilities for forms and data
 */

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type ValidationRule<T = unknown> = {
  test: (value: T) => boolean;
  message: string;
};

/**
 * Email validation regex (RFC 5322 compliant)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

/**
 * Phone number validation (international format)
 */
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * Strong password regex (at least 8 chars, 1 upper, 1 lower, 1 digit, 1 special)
 */
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Basic validation functions
export const isEmail = (email: string): boolean => EMAIL_REGEX.test(email);
export const isUrl = (url: string): boolean => URL_REGEX.test(url);
export const isPhone = (phone: string): boolean => PHONE_REGEX.test(phone);
export const isStrongPassword = (password: string): boolean => STRONG_PASSWORD_REGEX.test(password);

// Common validation rules
export const validationRules = {
  required: <T>(message = 'This field is required'): ValidationRule<T> => ({
    test: (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== undefined;
    },
    message,
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule<string> => ({
    test: isEmail,
    message,
  }),

  url: (message = 'Please enter a valid URL'): ValidationRule<string> => ({
    test: isUrl,
    message,
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule<string> => ({
    test: isPhone,
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  min: (min: number, message?: string): ValidationRule<number> => ({
    test: (value) => value >= min,
    message: message || `Must be at least ${min}`,
  }),

  max: (max: number, message?: string): ValidationRule<number> => ({
    test: (value) => value <= max,
    message: message || `Must be no more than ${max}`,
  }),

  pattern: (pattern: RegExp, message = 'Invalid format'): ValidationRule<string> => ({
    test: (value) => pattern.test(value),
    message,
  }),

  strongPassword: (message = 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'): ValidationRule<string> => ({
    test: isStrongPassword,
    message,
  }),

  match: <T>(targetValue: T, message = 'Values do not match'): ValidationRule<T> => ({
    test: (value) => value === targetValue,
    message,
  }),

  oneOf: <T>(allowedValues: T[], message?: string): ValidationRule<T> => ({
    test: (value) => allowedValues.includes(value),
    message: message || `Must be one of: ${allowedValues.join(', ')}`,
  }),

  custom: <T>(fn: (value: T) => boolean, message: string): ValidationRule<T> => ({
    test: fn,
    message,
  }),
};

/**
 * Validate a value against multiple rules
 */
export const validate = <T>(value: T, rules: ValidationRule<T>[]): ValidationResult => {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.test(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate an object against a schema
 */
export const validateSchema = <T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, ValidationRule<T[keyof T]>[]>,
): Record<keyof T, ValidationResult> & { isValid: boolean; } => {
  const results = {} as Record<keyof T, ValidationResult>;
  let isValid = true;

  for (const [key, rules] of Object.entries(schema)) {
    const result = validate(data[key], rules as ValidationRule<unknown>[]);
    results[key as keyof T] = result;

    if (!result.isValid) {
      isValid = false;
    }
  }

  return {
    ...results,
    isValid,
  };
};

/**
 * Create a debounced validator
 */
export const createDebouncedValidator = <T>(
  validator: (value: T) => ValidationResult | Promise<ValidationResult>,
  delay = 300,
) => {
  let timeoutId: NodeJS.Timeout;

  return (value: T): Promise<ValidationResult> => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const result = await validator(value);
        resolve(result);
      }, delay);
    });
  };
};