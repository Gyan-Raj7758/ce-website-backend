// demoVideos.validation.js
const Joi = require("joi");

const demoVideosSchema = Joi.object({
  emailId: Joi.string()
    .email({ tlds: { allow: false } })
    .custom((value, helpers) => {
      const hostBlacklist = ["example.com"];
      const emailDomain = value.split("@")[1];
      if (hostBlacklist.includes(emailDomain)) {
        return helpers.message(`${value} contains a blacklisted domain`);
      }
      return value;
    })
    .required()
    .messages({
      "string.base": "`User Email` must be a string",
      "string.email": "`User Email` must be a valid email address",
      "any.required": "`User Email` is a required field",
    }),

  contactNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.base": "`Mobile Number` must be a string",
      "string.pattern.base": "`Mobile Number` is not valid",
      "any.required": "`Mobile Number` is a required field",
    }),
});

module.exports = demoVideosSchema;
