import { AuthController } from './AuthController'
import { AuthUseCase } from './AuthUseCase'

const authUseCase = new AuthUseCase()

const authController = new AuthController(authUseCase)

export { authController }
