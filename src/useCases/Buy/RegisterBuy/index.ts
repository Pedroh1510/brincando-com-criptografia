import { BuyRepository } from '@repositories/implementations/TypeOrm/BuyRepository'
import { RegisterBuyController } from './RegisterBuyController'
import { RegisterBuyUseCase } from './RegisterBuyUseCase'

const buyRepository = new BuyRepository()

const registerBuyUseCase = new RegisterBuyUseCase(buyRepository)

const registerBuyController = new RegisterBuyController(registerBuyUseCase)

export { registerBuyController }
