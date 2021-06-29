import Joi from 'joi';

export const body = Joi.object({
  message: Joi.string().required(),
});
export const path = Joi.object({
  id: Joi.string().uuid().required(),
});
