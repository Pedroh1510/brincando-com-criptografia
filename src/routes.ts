import express from 'express'
import { createUserController } from './useCases/User/CreateUser'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json('ok')
})

routes.post('/users', (req, res) => {
  return createUserController.handle(req, res)
})

export default routes
