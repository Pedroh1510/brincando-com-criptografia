import { IControllerDTO } from '@util/IControllerDTO'
import { Request, Response } from 'express'
import { RegisterBuyUseCase } from './RegisterBuyUseCase'

export class RegisterBuyController implements IControllerDTO {
  constructor(private registerBuyUseCase: RegisterBuyUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.registerBuyUseCase.execute(request.body)

      return response.status(204).send()
    } catch (error) {
      return response.status(404).send()
    }
  }
}
