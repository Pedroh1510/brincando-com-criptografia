import { loginUserValidator } from './useCases/User/LoginUser/loginUserValidator'
import { findUserValidator } from './useCases/User/FindUser/findUserValidator'
import { createUserValidator } from './useCases/User/CreateUser/createUserValidator'
import express from 'express'
import { findUserController } from './useCases/User/FindUser'
import { createUserController } from './useCases/User/CreateUser'
import { loginUserController } from './useCases/User/LoginUser'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json('ok')
})

routes.post('/users', createUserValidator, (req, res) => {
  return createUserController.handle(req, res)
})

routes.get('/users', findUserValidator, (req, res) => {
  return findUserController.handle(req, res)
})

routes.post('/users/login', loginUserValidator, (req, res) => {
  return loginUserController.handle(req, res)
})

export default routes
