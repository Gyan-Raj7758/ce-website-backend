// contactUs.validation.js
const Joi = require("joi");

const contactUsSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "`Your Name` must be a string",
    "any.required": "`Your Name` is a required field",
  }),

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
      "string.email": "`Your Email` must be a valid email address",
      "any.required": "`Your Email` is a required field",
    }),

  interest: Joi.string().required().messages({
    "string.base": "`Interest` must be a string",
    "any.required": "`Interest` is a required field",
  }),

  subject: Joi.string().optional().allow("").messages({
    "string.base": "`Subject` must be a string",
  }),

  comment: Joi.string().required().messages({
    "string.base": "`Comment` must be a string",
    "any.required": "`Comment` is a required field",
  }),
});

module.exports = contactUsSchema;
