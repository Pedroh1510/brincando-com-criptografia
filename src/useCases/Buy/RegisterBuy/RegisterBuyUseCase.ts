import { UsersDocuments } from '@entities/UsersDocuments'
import { IBuyRepository } from '@repositories/IBuyRepository'
import { IRegisterBuyDTORequest } from './RegisterBuyDTO'

export class RegisterBuyUseCase {
  constructor(private buyRepository: IBuyRepository) {}
  async execute(data: IRegisterBuyDTORequest): Promise<void> {
    const user = await this.buyRepository.findUserById(data.auth.userId)

    if (!user) throw new Error("User doesn't exist")

    const { value, card, auth } = data
    const { userId } = auth
    const purchased = new UsersDocuments({
      value,
      userId,
      creditCardToken: card
    })

    await this.buyRepository.save(purchased)
  }
}
