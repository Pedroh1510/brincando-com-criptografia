import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { UserRepository } from '@repositories/implementations/TypeOrm/UserRopository'

const userRepository = new UserRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
