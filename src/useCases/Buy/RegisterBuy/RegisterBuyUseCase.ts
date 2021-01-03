import { UsersDocuments } from './../../../entities/UsersDocuments'
import { IBuyRepository } from '@repositories/IBuyRepository'
import { IRegisterBuyDTORequest } from './RegisterBuyDTO'

export class RegisterBuyUseCase {
  constructor(private buyRepository: IBuyRepository) {}
  async execute(data: IRegisterBuyDTORequest): Promise<void> {
    const user = await this.buyRepository.findUserById(data.userId)

    if (!user) throw new Error("User doesn't exist")

    const { value, userId, card } = data

    const purchased = new UsersDocuments({
      value,
      userId,
      creditCardToken: card
    })

    await this.buyRepository.save(purchased)
  }
}
