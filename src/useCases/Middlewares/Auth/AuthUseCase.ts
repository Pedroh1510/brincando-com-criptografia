import { validadeToken } from '@util/jwt'
import { IAuthDTORequest, IAuthDTOResponse } from './AuthDTO'

export class AuthUseCase {
  async execute(data: IAuthDTORequest): Promise<IAuthDTOResponse> {
    const token = data.authorization

    if (!token) throw new Error('No token provided')

    const { userId } = validadeToken(token)

    return {
      userId
    }
  }
}
