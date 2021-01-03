import { validadeToken } from '@util/jwt'
import { IAuthDTORequest } from './AuthDTO'

export class AuthUseCase {
  async execute(data: IAuthDTORequest): Promise<void> {
    const token = data.authorization

    if (!token) throw new Error('No token provided')

    validadeToken(token)
  }
}
