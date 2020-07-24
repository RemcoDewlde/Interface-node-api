const Joi = require("joi");

const signUpSchema = Joi.object({
    username: Joi.string().alphanum().min(6).max(60).required(),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password'),
    email: Joi.string().email({minDomainSegments: 2})
});

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(6).max(60).required(),
    password: Joi.string().min(8).required(),
});

const resetPasswordSchema = Joi.object({
    userID: Joi.string(),
    old_password: Joi.string().min(8).required(),
    new_password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('new_password'),
});

module.exports = {
    signUpSchema,
    loginSchema,
    resetPasswordSchema,
};
