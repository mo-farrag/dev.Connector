const Validator = require("validator");
const isEmpty = require("../validation/is-empty");
const { default: validator } = require("validator");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  //replace undefined values with empty string to be able to check it with validator.isEmpty below
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "job title is invalid";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "company is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from date is required";
  }
  if (!validator.isEmpty(data.to)) {
    if (data.from > data.to)
      errors.to = "to date should be greater than from date";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
