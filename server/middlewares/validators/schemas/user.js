import Joi from "@hapi/joi";

export const signUpSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-Z ,.'-]+$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z ,.'-]+$/)
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim(),
  password: Joi.string()
    .min(8)
    .required()
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .required(),
  password: Joi.string()
    .min(8)
    .required()
});
