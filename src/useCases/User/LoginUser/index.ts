import { UserRepository } from './../../../repositories/implementations/TypeOrm/UserRopository'
import { LoginUserController } from './LoginUserController'
import { LoginUserUseCase } from './LoginUserUseCase'

const userRepository = new UserRepository()

const loginUserUseCase = new LoginUserUseCase(userRepository)

const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserController }
