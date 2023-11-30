const Joi = require("joi");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const emailValidation = Joi.string().pattern(emailRegex);
const passwordValidation = Joi.string().min(6).required();
const onlyLettersValidation = Joi.string()
  .allow("")
  .pattern(new RegExp("^[A-Za-z]+$"));

const userSchema = Joi.object({
  first_name: onlyLettersValidation.required(),
  last_name: onlyLettersValidation,
  email: emailValidation.required(),
  phone: Joi.string().pattern(new RegExp("^\\d{10}$")),
  password: passwordValidation,
});

const updateSchema = Joi.object({
  id: Joi.string().required(),
  first_name: onlyLettersValidation.required(),
  last_name: onlyLettersValidation,
  email: emailValidation.required(),
  phone: Joi.string().pattern(new RegExp("^\\d{10}$")),
  password: passwordValidation,
});

const loginSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

module.exports = {
  userSchema,
  loginSchema,
  updateSchema,
};
