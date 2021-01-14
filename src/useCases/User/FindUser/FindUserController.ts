import { Request, Response } from 'express'
import { IControllerDTO } from '@util/IControllerDTO'
import { FindUserUseCase } from './FindUserUseCase'

export class FindUserController implements IControllerDTO {
  constructor(private findUserUseCase: FindUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, statusCode } = await this.findUserUseCase.execute(request)

    return response.status(statusCode).send(body)
  }
}
