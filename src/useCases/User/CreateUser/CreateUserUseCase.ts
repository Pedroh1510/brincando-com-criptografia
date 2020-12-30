import { IUserRepository } from './../../../repositories/IUserRepository'
import { Users } from './../../../entities/Users'
import { ICreateUserDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ICreateUserDTO): Promise<void> {
    const userExist = await this.userRepository.findByEmail(data.userEmail)
    if (userExist) throw new Error('User already exists')

    const user = new Users({
      name: data.userName,
      email: data.userEmail,
      document: data.userDocument,
      password: data.userPassword
    })

    await this.userRepository.save(user)
  }
}
