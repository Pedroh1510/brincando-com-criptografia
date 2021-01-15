import { IControllerDTO } from '@util/IControllerDTO'
import { Request, Response } from 'express'
import { RegisterBuyUseCase } from './RegisterBuyUseCase'

export class RegisterBuyController implements IControllerDTO {
  constructor(private registerBuyUseCase: RegisterBuyUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, statusCode } = await this.registerBuyUseCase.execute(request)

    return response.status(statusCode).send(body)
  }
}
