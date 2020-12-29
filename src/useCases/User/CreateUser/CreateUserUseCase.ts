import { IUserRepository } from './../../../repositories/IUserRepository'
import { Users } from './../../../entities/Users'
import { ICreateUserDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ICreateUserDTO): Promise<void> {
    const userExist = await this.userRepository.findByName(data.userName)

    if (userExist) throw new Error('User already exists')

    const user = new Users({ name: data.userName })

    await this.userRepository.save(user)
  }
}
