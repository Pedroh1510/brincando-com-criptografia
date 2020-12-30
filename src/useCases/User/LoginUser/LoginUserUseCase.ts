import { generateToken } from './../../../util/jwt'
import { validateHashedString } from './../../../util/cryptography'
import { IUserRepository } from './../../../repositories/IUserRepository'
import { ILoginUserRequestDTO, ILoginUserResponseDTO } from './LoginUserDTO'

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) throw new Error("User doesn't exist")

    if (!(await validateHashedString(data.password, user.password))) {
      throw new Error('Invalid password')
    }

    user.token = generateToken(user.id)

    await this.userRepository.save(user)

    return {
      token: user.token
    }
  }
}
