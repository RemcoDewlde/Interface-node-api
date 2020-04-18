const Joi = require("joi");

const signUpSchema = Joi.object({
    // TODO: include password regex
    username: Joi.string().alphanum().min(6).max(60).required(),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password'),
    email: Joi.string().email({minDomainSegments: 2})
});

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(6).max(60).required(),
    password: Joi.string().min(8).required(),
});

module.exports = {
    signUpSchema,
    loginSchema
};