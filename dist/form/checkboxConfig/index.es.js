const validateCheckboxGroup = (selectedValues, config) => {
  const errors = [];
  if (config.minSelections && selectedValues.length < config.minSelections) {
    errors.push(`Please select at least ${config.minSelections} option${config.minSelections > 1 ? "s" : ""}`);
  }
  if (config.maxSelections && selectedValues.length > config.maxSelections) {
    errors.push(`Please select no more than ${config.maxSelections} option${config.maxSelections > 1 ? "s" : ""}`);
  }
  if (config.required && selectedValues.length === 0) {
    errors.push("Please select at least one option");
  }
  return {
    valid: errors.length === 0,
    errors
  };
};
export {
  validateCheckboxGroup
};
