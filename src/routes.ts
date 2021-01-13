import { loginUserValidator } from './useCases/User/LoginUser/loginUserValidator'
import { findUserValidator } from './useCases/User/FindUser/findUserValidator'
import { createUserValidator } from './useCases/User/CreateUser/createUserValidator'
import express from 'express'
import { findUserController } from './useCases/User/FindUser'
import { createUserController } from './useCases/User/CreateUser'
import { loginUserController } from './useCases/User/LoginUser'
import { registerBuyController } from '@useCases/Buy/RegisterBuy'
import { authController } from '@useCases/Middlewares/Auth'

const routes = express.Router()

routes.post('/users', createUserValidator, (req, res) => {
  return createUserController.handle(req, res)
})

routes.get('/users', findUserValidator, (req, res) => {
  return findUserController.handle(req, res)
})

routes.post('/users/login', loginUserValidator, (req, res) => {
  return loginUserController.handle(req, res)
})

routes.use((req, res, next) => {
  return authController.handle(req, res, next)
})

routes.post('/purchase/register', (req, res) => {
  return registerBuyController.handle(req, res)
})

export default routes
