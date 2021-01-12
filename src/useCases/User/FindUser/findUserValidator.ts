import { celebrate, Joi, Segments } from 'celebrate'

export const findUserValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    userEmail: Joi.string().email().required()
  })
})
