const Validator = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  //replace undefined values with empty string to be able to check it with validator.isEmpty below
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle must be between 2 and 40";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills is required";
  }

  if (!isEmpty(data.website)) {
    if (Validator.isEmpty(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (Validator.isEmpty(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (Validator.isEmpty(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (Validator.isEmpty(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (Validator.isEmpty(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (Validator.isEmpty(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
