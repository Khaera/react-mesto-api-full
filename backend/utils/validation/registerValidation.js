const { celebrate, Joi } = require('celebrate');

const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www.)?\S/i),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = registerValidation;
