var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isEmail = (email) => EMAIL_REGEX.test(email);
const isUrl = (url) => URL_REGEX.test(url);
const isPhone = (phone) => PHONE_REGEX.test(phone);
const isStrongPassword = (password) => STRONG_PASSWORD_REGEX.test(password);
const validationRules = {
  required: (message = "This field is required") => ({
    test: (value) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== void 0;
    },
    message
  }),
  email: (message = "Please enter a valid email address") => ({
    test: isEmail,
    message
  }),
  url: (message = "Please enter a valid URL") => ({
    test: isUrl,
    message
  }),
  phone: (message = "Please enter a valid phone number") => ({
    test: isPhone,
    message
  }),
  minLength: (min, message) => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`
  }),
  maxLength: (max, message) => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters`
  }),
  min: (min, message) => ({
    test: (value) => value >= min,
    message: message || `Must be at least ${min}`
  }),
  max: (max, message) => ({
    test: (value) => value <= max,
    message: message || `Must be no more than ${max}`
  }),
  pattern: (pattern, message = "Invalid format") => ({
    test: (value) => pattern.test(value),
    message
  }),
  strongPassword: (message = "Password must contain at least 8 characters, including uppercase, lowercase, number and special character") => ({
    test: isStrongPassword,
    message
  }),
  match: (targetValue, message = "Values do not match") => ({
    test: (value) => value === targetValue,
    message
  }),
  oneOf: (allowedValues, message) => ({
    test: (value) => allowedValues.includes(value),
    message: message || `Must be one of: ${allowedValues.join(", ")}`
  }),
  custom: (fn, message) => ({
    test: fn,
    message
  })
};
const validate = (value, rules) => {
  const errors = [];
  for (const rule of rules) {
    if (!rule.test(value)) {
      errors.push(rule.message);
    }
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};
const validateSchema = (data, schema) => {
  const results = {};
  let isValid = true;
  for (const [key, rules] of Object.entries(schema)) {
    const result = validate(data[key], rules);
    results[key] = result;
    if (!result.isValid) {
      isValid = false;
    }
  }
  return __spreadProps(__spreadValues({}, results), {
    isValid
  });
};
const createDebouncedValidator = (validator, delay = 300) => {
  let timeoutId;
  return (value) => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => __async(null, null, function* () {
        const result = yield validator(value);
        resolve(result);
      }), delay);
    });
  };
};
export {
  createDebouncedValidator,
  isEmail,
  isPhone,
  isStrongPassword,
  isUrl,
  validate,
  validateSchema,
  validationRules
};
