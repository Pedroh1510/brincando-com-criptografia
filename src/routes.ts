import express from 'express'
import { findUserController } from './useCases/User/FindUser'
import { createUserController } from './useCases/User/CreateUser'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json('ok')
})

routes.post('/users', (req, res) => {
  return createUserController.handle(req, res)
})

routes.get('/users', (req, res) => {
  return findUserController.handle(req, res)
})

export default routes
