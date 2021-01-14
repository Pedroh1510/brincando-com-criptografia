import {
  badRequest,
  forbidden,
  HttpResponseDTO,
  ok,
  serverError
} from '@util/httpErrors'
import { UserRepository } from '@repositories/implementations/TypeOrm/UserRopository'
import { MissingParamError, UserError } from '@util/errors'
import { IFindUserRequestDTO } from './FindUserDTO'

export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(data: IFindUserRequestDTO): Promise<HttpResponseDTO> {
    try {
      const { userEmail } = data.body

      if (!userEmail) {
        return badRequest(new MissingParamError('userEmail'))
      }
      const user = await this.userRepository.findByEmail(userEmail)

      if (!user) return forbidden(new UserError("User doesn't exist"))

      return ok({
        userName: user.name,
        userEmail: user.email,
        userId: user.id
      })
    } catch (error) {
      return serverError()
    }
  }
}
