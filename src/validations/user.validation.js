const Joi = require("joi");

exports.registerValidation = Joi.object({
  userName: Joi.string().min(3).max(15).required(),
  firstName: Joi.string().min(3).max(15).alphanum().required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
  phoneNumber: Joi.string().regex(/^\+?\d{1,4}?\d{10}$/).required(),
  gender: Joi.string().allow("male", "female").optional(),
  birthDate: Joi.date().max("now").required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required()
});