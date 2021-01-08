import { UserRepository } from '@repositories/implementations/TypeOrm/UserRopository'
import { UserError } from '@util/errors'
import { IFindUserRequestDTO, IFindUserResponseDTO } from './FindUserDTO'

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(data: IFindUserRequestDTO): Promise<IFindUserResponseDTO> {
    const user = await this.userRepository.findByEmail(data.userEmail)

    if (!user) throw new UserError("User doesn't exist")

    return {
      userName: user.name,
      userEmail: user.email,
      userId: user.id
    }
  }
}
