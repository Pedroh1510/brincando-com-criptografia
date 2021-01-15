import { MissingParamError, UserError } from '@util/errors'
import { generateToken } from '@util/jwt'
import { validateHashedString } from '@util/cryptography'
import { IUserRepository } from '@repositories/IUserRepository'
import { ILoginUserRequestDTO } from './LoginUserDTO'
import {
  badRequest,
  forbidden,
  HttpResponseDTO,
  ok,
  serverError,
  unauthorizedError
} from '@util/httpErrors'

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ILoginUserRequestDTO): Promise<HttpResponseDTO> {
    try {
      const { email, password } = data.body

      if (!email) {
        return badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return badRequest(new MissingParamError('password'))
      }

      const user = await this.userRepository.findByEmail(email)
      if (!user) return forbidden(new UserError("User doesn't exist"))

      if (!(await validateHashedString(password, user.password))) {
        return unauthorizedError()
      }

      user.token = generateToken({ userId: user.id })

      await this.userRepository.save(user)

      return ok({
        token: user.token
      })
    } catch (error) {
      return serverError()
    }
  }
}
