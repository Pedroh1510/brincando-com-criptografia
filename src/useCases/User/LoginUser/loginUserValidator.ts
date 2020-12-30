import { celebrate, Joi, Segments } from 'celebrate'

export const loginUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})
