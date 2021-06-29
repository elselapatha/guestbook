import Joi from 'joi';

export const body = Joi.object({
  name: Joi.string().min(3),
  username: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
