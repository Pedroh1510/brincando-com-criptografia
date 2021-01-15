import { MissingParamError, UserError } from '@util/errors'
import { UsersDocuments } from '@entities/UsersDocuments'
import { IBuyRepository } from '@repositories/IBuyRepository'
import { IRegisterBuyDTORequest } from './RegisterBuyDTO'
import {
  badRequest,
  forbidden,
  HttpResponseDTO,
  noContent,
  serverError
} from '@util/httpErrors'

export class RegisterBuyUseCase {
  constructor(private buyRepository: IBuyRepository) {}
  async execute(data: IRegisterBuyDTORequest): Promise<HttpResponseDTO> {
    try {
      const { value, card, auth } = data.body

      if (!value) return badRequest(new MissingParamError('value'))
      if (!card) return badRequest(new MissingParamError('card'))

      const user = await this.buyRepository.findUserById(auth.userId)

      if (!user) return forbidden(new UserError("User doesn't exist"))

      const { userId } = auth
      const purchased = new UsersDocuments({
        value,
        userId,
        creditCardToken: card
      })

      await this.buyRepository.save(purchased)

      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
