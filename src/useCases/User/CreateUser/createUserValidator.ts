import { celebrate, Joi } from 'celebrate'

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    userName: Joi.string().required().min(2),
    userDocument: Joi.string().required().min(5),
    userEmail: Joi.string().required().email()
  })
})
