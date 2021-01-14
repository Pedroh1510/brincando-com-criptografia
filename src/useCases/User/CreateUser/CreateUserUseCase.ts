import { MissingParamError, UserError } from '@util/errors'
import { IUserRepository } from '@repositories/IUserRepository'
import { Users } from '@entities/Users'
import { ICreateUserDTORequest } from './CreateUserDTO'
import {
  badRequest,
  HttpResponseDTO,
  serverError,
  forbidden,
  noContent
} from '@util/httpErrors'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ICreateUserDTORequest): Promise<HttpResponseDTO> {
    try {
      const { userDocument, userEmail, userName, userPassword } = data.body
      if (!userEmail) {
        return badRequest(new MissingParamError('userEmail'))
      }
      if (!userPassword) {
        return badRequest(new MissingParamError('userPassword'))
      }
      if (!userName) {
        return badRequest(new MissingParamError('userName'))
      }
      if (!userDocument) {
        return badRequest(new MissingParamError('userDocument'))
      }

      const userExist = await this.userRepository.findByEmail(userEmail)
      if (userExist) return forbidden(new UserError('User already exists'))

      const user = new Users({
        name: userName,
        email: userEmail,
        document: userDocument,
        password: userPassword
      })

      await this.userRepository.save(user)
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
